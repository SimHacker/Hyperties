import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { parseIndex } from './records.mjs';
import { decodePackedArticle, decodeArithmeticArticle } from './packed.mjs';

const directory = new URL('../corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/', import.meta.url);
const records = parseIndex(fs.readFileSync(new URL('index.new', directory)));
const packed = fs.readFileSync(new URL('bigfile.tie', directory));
const record = name => {
  const r = records.find(r => r.basename === name);
  return packed.subarray(r.offset, r.offset + r.length);
};
test('hyper-joke recovers all six records and explicit branching basenames', () => {
  for (const name of ['EXAMPLFP', 'HOTDOGJO', 'HOTDOGJP', 'HOTDOGKP', 'HOTDOHKP', 'JOKES']) {
    const result = decodePackedArticle(record(name));
    assert(result.article.sections.every(s => s.hasSeparator));
    assert(result.trailingBits >= 0 && result.trailingBits <= 7);
  }
  const setup = decodePackedArticle(record('EXAMPLFP')).article;
  assert.deepEqual(setup.referenceNames, ['HOTDOGJO', 'HOTDOHKP', 'HOTDOGKP', 'HOTDOGJP']);
  assert(setup.body.includes('What did one hot dog say to the other?'));
});
test('LZW-only decoder rejects arithmetic and malformed or over-limit streams', () => {
  assert.throws(() => decodePackedArticle(record('ASCII')), { code: 'PACKED_CLEAR' });
  assert.throws(() => decodePackedArticle(Buffer.alloc(12)), { code: 'PACKED_SHORT' });
  assert.throws(() => decodePackedArticle(record('JOKES'), { maxOutputBytes: 30 }), { code: 'PACKED_LIMIT' });
  assert.throws(() => decodePackedArticle(record('JOKES').subarray(0, 30)), { code: 'PACKED_END' });
});
test('LZW-only API accepts 218 book records and rejects 30 arithmetic records', () => {
  const counts = { decoded: 0, other: 0 };
  for (const r of records) {
    const b = packed.subarray(r.offset, r.offset + r.length);
    if (r.flagsHex.startsWith('03')) {
      const result = decodePackedArticle(b);
      assert(result.article.sections.every(s => s.hasSeparator));
      counts.decoded++;
    } else {
      assert.throws(() => decodePackedArticle(b), { code: 'PACKED_CLEAR' });
      counts.other++;
    }
  }
  assert.deepEqual(counts, { decoded: 218, other: 30 });
});
test('49 ACM packed records decode byte-for-byte to authored loose records', () => {
  const directory = new URL('../corpus/books-and-literature/ACM/', import.meta.url);
  const index = parseIndex(fs.readFileSync(new URL('INDEX.NEW', directory)));
  const big = fs.readFileSync(new URL('BIGFILE.TIE', directory));
  let comparisons = 0;
  for (const r of index) {
    const source = new URL(r.basename + '.FIL', directory);
    if (!fs.existsSync(source)) continue;
    const result = decodePackedArticle(big.subarray(r.offset, r.offset + r.length));
    assert.deepEqual(result.decoded, new Uint8Array(fs.readFileSync(source)));
    comparisons++;
  }
  assert.equal(comparisons, 49);
});
test('browser bundle decodes real records without Buffer and shares CP437 profile', () => {
  const context = vm.createContext({ Uint8Array, DataView });
  vm.runInContext(fs.readFileSync(new URL('../tools/dist/browser.js', import.meta.url), 'utf8'), context);
  assert.equal(vm.runInContext('typeof Buffer', context), 'undefined');
  context.fixture = new Uint8Array(record('HOTDOGJO'));
  const result = vm.runInContext('HypertiesFormats.decodePackedArticle(fixture)', context);
  assert.equal(result.decoded.length, 280);
  assert.equal(result.article.heading, 'Hyper Humor, level 2');
  assert.equal(vm.runInContext("HypertiesFormats.displayCP437('\\xda\\xc4\\xbf')", context), '┌─┐');
  const allHigh = vm.runInContext('HypertiesFormats.displayCP437(String.fromCharCode(...Array.from({length:128},(_,i)=>i+128)))', context);
  assert.equal([...allHigh].length, 128);
  assert(!allHigh.includes('undefined'));
});
test('arithmetic codec recovers all 30 formerly unsupported book records', () => {
  let count = 0;
  for (const r of records.filter(r => r.flagsHex.startsWith('02'))) {
    const b = packed.subarray(r.offset, r.offset + r.length);
    const result = decodeArithmeticArticle(b);
    assert(result.article.sections.every(s => s.hasSeparator));
    assert(result.paddingBits >= 0 && result.paddingBits <= 14);
    assert.equal(result.trailingBits, 0);
    count++;
  }
  assert.equal(count, 30);
  assert.equal(decodeArithmeticArticle(record('ICONS')).article.heading, 'ICONS');
  assert.equal(decodeArithmeticArticle(record('HYPERHUMO')).article.heading, 'HYPER HUMOR?');
  assert.throws(() => decodeArithmeticArticle(record('ICONS'), { maxOutputBytes: 30 }), { code: 'ARITHMETIC_LIMIT' });
  assert.throws(() => decodeArithmeticArticle(record('ICONS').subarray(0, 30)));
  assert.throws(() => decodeArithmeticArticle(new Uint8Array(12)), { code: 'ARITHMETIC_SHORT' });
});
test('113 CACM arithmetic records match their loose originals byte-for-byte', () => {
  const directory = new URL('../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/', import.meta.url);
  const index = parseIndex(fs.readFileSync(new URL('index.new', directory)));
  const big = fs.readFileSync(new URL('bigfile.tie', directory));
  let count = 0;
  for (const r of index.filter(r => r.flagsHex.startsWith('02'))) {
    const result = decodeArithmeticArticle(big.subarray(r.offset, r.offset + r.length));
    const original = fs.readFileSync(new URL(r.basename.toLowerCase() + '.fil', directory));
    assert.deepEqual(result.decoded, new Uint8Array(original), r.basename);
    count++;
  }
  assert.equal(count, 113);
});
test('browser arithmetic decoder has no Buffer dependency', () => {
  const context = vm.createContext({ Uint8Array, DataView });
  vm.runInContext(fs.readFileSync(new URL('../tools/dist/browser.js', import.meta.url), 'utf8'), context);
  context.fixture = new Uint8Array(record('ICONS'));
  assert.equal(vm.runInContext('typeof Buffer', context), 'undefined');
  const result = vm.runInContext('HypertiesFormats.decodeArithmeticArticle(fixture)', context);
  assert.equal(result.article.heading, 'ICONS');
  assert.deepEqual(new Uint8Array(result.decoded), decodeArithmeticArticle(record('ICONS')).decoded);
});
