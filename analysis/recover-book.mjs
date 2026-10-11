#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { FormatError, parseIndex, checkPackedRanges, scanMarkup } from './records.mjs';
import { decodePackedArticle, decodeArithmeticArticle } from './packed.mjs';
import { relocatedPath } from './layout.mjs';

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.dirname(here);
const allowPartial = process.argv.includes('--allow-partial');
if (process.argv.slice(2).some(arg => arg !== '--allow-partial')) throw new Error('Only --allow-partial is supported');
const directory = relocatedPath('HHO-Hypertext on Hypertext book-1988');
const records = parseIndex(fs.readFileSync(path.join(root, directory, 'index.new')));
const packed = fs.readFileSync(path.join(root, directory, 'bigfile.tie'));
if (!checkPackedRanges(records, packed.length).exactPartition) throw new Error('Book index does not partition packed store');
const normalize = text => text.trim().replace(/\s+/g, ' ').toUpperCase();
const names = new Map();
for (const r of records) for (const name of [r.title, r.basename, ...r.aliases]) {
  const key = normalize(name);
  if (!names.has(key)) names.set(key, new Set());
  names.get(key).add(r.basename);
}
const articles = [], issues = [];
for (const r of records) {
  try {
    const codec = r.flagsHex.startsWith('03') ? 'lzw' : r.flagsHex.startsWith('02') ? 'arithmetic' : null;
    if (!codec) throw new FormatError('PACKED_FLAGS', `Unsupported packed-record flags: ${r.flagsHex}`);
    const result = (codec === 'lzw' ? decodePackedArticle : decodeArithmeticArticle)(packed.subarray(r.offset, r.offset + r.length));
    const { decoded, article: a, consumedBits, trailingBits } = result;
    const markup = scanMarkup(a.body, a.offsets[2]);
    const aligned = markup.links.length > 0 && markup.links.every(l => l.syntax === 'tilde') && markup.links.length === a.referenceNames.length;
    const links = markup.links.map((l, i) => {
      const candidates = aligned && records.some(r => r.basename === a.referenceNames[i]) ?
        [a.referenceNames[i]] : [...(names.get(normalize(l.target)) ?? [])];
      return { ...l, storedReference: aligned ? a.referenceNames[i] : null, candidates,
        status: candidates.length === 1 ? 'candidate' : candidates.length ? 'ambiguous' : 'unresolved' };
    });
    articles.push({ ...r, heading: a.heading, description: a.description, body: a.body,
      referenceNames: a.referenceNames, fifthSection: a.fifthSection, trailer: a.trailer,
      decodedBytes: decoded.length, decodedSha256: crypto.createHash('sha256').update(decoded).digest('hex'),
      bodyStart: a.offsets[2], separators: a.sections.map(s => s.hasSeparator), codec,
      paddingBits: 'paddingBits' in result ? result.paddingBits : 0, consumedBits, trailingBits, ...markup, links });
  } catch (error) {
    if (!(error instanceof FormatError)) throw error;
    issues.push({ basename: r.basename, code: error.code, message: error.message });
  }
}
const result = { source: `${directory}/bigfile.tie`, decoder: '12-byte prefix + flag-dispatched LSB-first LZW (03) or adaptive arithmetic (02)',
  articles, issues, note: 'Local access export. Historical text is not corrected; Latin-1 byte view is not final display encoding. Link candidates are not runtime-verified.' };
fs.writeFileSync(path.join(here, 'recovered-book.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ indexed: records.length, recovered: articles.length, issues,
  allSectionsDelimited: articles.filter(a => a.separators.every(Boolean)).length,
  trailingBitCounts: [...new Set(articles.map(a => a.trailingBits))].sort((a, b) => a - b),
  jokeGraph: articles.filter(a => /JOKE/.test(a.title)).map(a => ({ basename: a.basename, links: a.links })) }, null, 2));
if (issues.length) {
  console.error(`${issues.length} indexed records remain unrecovered${allowPartial ? ' (partial export explicitly allowed)' : '; use --allow-partial only for the labeled access prototype'}.`);
  if (!allowPartial) process.exitCode = 1;
}
