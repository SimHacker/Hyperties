import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { parseArticle, parseIndex, parseLegacyIndex, checkPackedRanges, scanMarkup } from './records.mjs';

function article(sections) {
  const parts = sections.map(s => Buffer.from(`${s}\n|\n`, 'latin1'));
  const header = Buffer.alloc(24);
  let offset = 24;
  parts.forEach((p, i) => { header.writeUInt32LE(offset, i * 4); offset += p.length; });
  return Buffer.concat([header, ...parts]);
}
test('article sections and offsets are byte-based, preserve high bytes and delimiters', () => {
  const b = article(['Title', 'Description', '\xda~Target~', 'TARGET', '', '2.35g']);
  const a = parseArticle(b);
  assert.equal(a.heading, 'Title');
  assert.equal(a.body, '\xda~Target~');
  assert.deepEqual(a.referenceNames, ['TARGET']);
  assert.equal(a.trailer, '2.35g');
  assert(a.sections.every(s => s.hasSeparator));
  assert.equal(b[a.offsets[2]], 0xda);
});
test('malformed article headers produce explicit failures', () => {
  assert.throws(() => parseArticle(Buffer.alloc(21)), { code: 'SHORT_HEADER' });
  assert.throws(() => parseArticle(Buffer.alloc(24)), { code: 'HEADER_START' });
  const b = article(['a', 'b', 'c', '', '', '']);
  b.writeUInt32LE(0xffffffff, 20);
  assert.throws(() => parseArticle(b), { code: 'OFFSET_RANGE' });
});
test('index preserves control flags, aliases and numeric ranges', () => {
  const r = parseIndex(Buffer.from('+1.0 Index\nTitle|TITLE|\x03\x02\x01\x01|0|24|Alias|\n', 'latin1'));
  assert.equal(r[0].flagsHex, '03020101');
  assert.deepEqual(r[0].aliases, ['Alias']);
  assert(checkPackedRanges(r, 24).exactPartition);
  assert(!checkPackedRanges(r, 25).exactPartition);
  assert.throws(() => parseIndex(Buffer.from('+1.0 Index\nA|A|x|oops|4|\n')), { code: 'INDEX_RECORD' });
});
test('range checks distinguish gaps, overlaps and bounds violations', () => {
  const r = [{ basename: 'A', offset: 0, length: 10 }, { basename: 'B', offset: 8, length: 5 }];
  const p = checkPackedRanges(r, 12);
  assert.equal(p.overlaps.length, 1);
  assert.deepEqual(p.outOfBounds, ['B']);
  assert(!p.exactPartition);
});
test('markup records links, directive spellings and positions without executing actions', () => {
  const m = scanMarkup('@s1~Target~ <L>label<\\L=#42> @g=cover.pcx @z="run,tool,arg"', 24);
  assert.equal(m.links.find(l => l.syntax === 'tilde').offset, 27);
  assert.equal(m.links.find(l => l.syntax === 'angle').target, '#42');
  assert.equal(m.directives.find(d => d.name === 'z').value, 'run,tool,arg');
  assert.equal(scanMarkup('~broken').diagnostics[0].code, 'UNPAIRED_TILDE');
});
test('real museum record and book partition agree with surveyed evidence', () => {
  const museum = parseArticle(fs.readFileSync(new URL('../corpus/museum/oldmjh/1880S.FIL', import.meta.url)));
  assert.equal(museum.heading, "1880's");
  assert(museum.referenceNames.includes('ANTISEMI'));
  const links = scanMarkup(museum.body).links;
  assert.equal(links.length, museum.referenceNames.length);
  assert.equal(links[0].target, 'Antisemitic');
  assert.equal(museum.referenceNames[0], 'ANTISEMI');
  const legacy = parseLegacyIndex(fs.readFileSync(new URL('../corpus/museum/oldmjh/INDEX.TIE', import.meta.url)));
  assert(legacy.some(r => r.basename === 'ADLERCYR' && r.aliases.includes('CYRUS ADLER')));
  const index = parseIndex(fs.readFileSync(new URL('../corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/index.new', import.meta.url)));
  const packed = fs.readFileSync(new URL('../corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/bigfile.tie', import.meta.url));
  assert.equal(index.length, 248);
  assert(checkPackedRanges(index, packed.length).exactPartition);
  assert.equal(index.filter(r => r.title.startsWith('HOT DOG JOKE')).length, 4);
});
test('legacy index differs from packed-range index and preserves aliases', () => {
  const r = parseLegacyIndex(Buffer.from('Entry|\x01File|Status|Synonym|\nHeading|HEAD|\x02\x01|Alias|\n\x19', 'latin1'));
  assert.deepEqual(r[0].aliases, ['Alias']);
  assert.equal(r[0].flagsHex, '0201');
  assert.throws(() => parseLegacyIndex(Buffer.from('bad')), { code: 'LEGACY_INDEX_HEADER' });
  assert.throws(() => parseLegacyIndex(Buffer.from('Entry|File|\ninvalid\n')), { code: 'LEGACY_INDEX_RECORD' });
  assert.throws(() => parseLegacyIndex(Buffer.from('Entry|File|\n\x19\nA|A|x|\n')), { code: 'LEGACY_INDEX_TRAILING' });
});
test('semantic catalog covers museum and book evidence while excluding private genealogy', () => {
  const result = spawnSync(process.execPath, [new URL('./catalog.mjs', import.meta.url).pathname], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const catalog = JSON.parse(fs.readFileSync(new URL('./semantic-catalog.json', import.meta.url)));
  assert.equal(catalog.articles.length, 1583);
  assert.equal(catalog.indexes.length, 40);
  assert.equal(catalog.issues.length, 5);
  assert(!catalog.articles.some(a => a.path.startsWith('corpus/personal-history/family/')));
  assert(!catalog.indexes.some(a => a.path.startsWith('corpus/personal-history/family/')));
  const museum = catalog.collections.find(c => c.collection === 'oldmjh');
  assert.equal(museum.articles, 402);
  assert.equal(museum.links, 3548);
  assert.equal(museum.linkStatuses['stored-reference-candidate'], 2814);
  const book = catalog.indexes.find(i => i.path.startsWith('corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/') && i.dialect === 'plus-1.0');
  assert.equal(book.records.length, 248);
  assert(book.packedRanges.exactPartition);
});
