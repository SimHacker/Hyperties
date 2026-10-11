#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { relocatedPath } from './layout.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const files = JSON.parse(fs.readFileSync(path.join(here, 'inventory.json'), 'utf8'));
const read = f => fs.readFileSync(path.join(root, f.path));
const byHash = new Map();
for (const f of files) {
  if (!byHash.has(f.sha256)) byHash.set(f.sha256, []);
  byHash.get(f.sha256).push(f);
}
const checks = {
  privateKey: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  githubToken: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/,
  awsAccessKey: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,
  credentialAssignment: /\b(?:password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token)\s*[:=]\s*["']?[^\s"']{6,}/i,
  email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  phone: /(?:\b\d{3}[-.]\d{3}[-.]\d{4}\b|\(\d{3}\)\s*\d{3}[-.]\d{4}\b)/,
  personalLifeEvents: /\b(?:was born|born on|date of birth|married|christened|first cousin|younger brother|older sister)\b/i,
};
const privacyFlags = [];
for (const [sha256, copies] of byHash) {
  const text = read(copies[0]).toString('latin1');
  const categories = Object.entries(checks).filter(([, regex]) => regex.test(text)).map(([name]) => name);
  if (categories.length) privacyFlags.push({ sha256, categories, paths: copies.map(f => f.path) });
}
const executableFamilies = [...byHash.entries()].filter(([, copies]) => ['.exe', '.com'].includes(copies[0].extension)).map(([sha256, copies]) => {
  const result = spawnSync('strings', ['-a', path.join(root, copies[0].path)], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw result.error || new Error(result.stderr);
  const interesting = result.stdout.split('\n').filter(line =>
    /hyperties|cognetics|copyright|version|lanthanum|rubidium|[12][09]\d{2}/i.test(line) && line.length < 250);
  return { sha256, bytes: copies[0].bytes, paths: copies.map(f => f.path), evidenceStrings: [...new Set(interesting)].slice(0, 20) };
});
const articles = files.filter(f => f.extension === '.fil');
const versions = new Map();
let validOffsetHeaders = 0;
let monotonicOffsetHeaders = 0;
const anomalousArticles = [];
for (const f of articles) {
  const b = read(f);
  const offsets = b.length >= 24 ? Array.from({ length: 6 }, (_, i) => b.readUInt32LE(i * 4)) : [];
  const valid = offsets.length === 6 && offsets[0] === 24 && offsets.every(n => n >= 24 && n <= b.length);
  if (valid) validOffsetHeaders++;
  else anomalousArticles.push({ path: f.path, bytes: f.bytes, offsets });
  if (valid && offsets.every((n, i) => !i || n >= offsets[i - 1])) monotonicOffsetHeaders++;
  const match = b.subarray(Math.max(24, b.length - 100)).toString('latin1').match(/\b(?:2|3)\.\d{1,2}[a-z]?(?: alpha [a-z])?\b/);
  if (match) versions.set(match[0], (versions.get(match[0]) || 0) + 1);
}
function compareTrees(left, right) {
  left = relocatedPath(left);
  right = relocatedPath(right);
  const select = base => new Map(files.filter(f => f.path.startsWith(`${base}/`))
    .map(f => [f.path.slice(base.length + 1), f]));
  const a = select(left), b = select(right);
  const identical = [], changed = [], leftOnly = [], rightOnly = [];
  for (const [p, f] of a) {
    if (!b.has(p)) leftOnly.push(f.path);
    else if (b.get(p).sha256 === f.sha256) identical.push(f.path);
    else changed.push({ left: f.path, right: b.get(p).path });
  }
  for (const [p, f] of b) if (!a.has(p)) rightOnly.push(f.path);
  return { left, right, identicalFiles: identical.length, changed, leftOnly, rightOnly };
}
function arcDate(date, time) {
  return `${1980 + (date >>> 9)}-${String((date >>> 5) & 15).padStart(2, '0')}-${String(date & 31).padStart(2, '0')}T${String(time >>> 11).padStart(2, '0')}:${String((time >>> 5) & 63).padStart(2, '0')}:${String((time & 31) * 2).padStart(2, '0')}`;
}
const arcArchives = files.filter(f => f.extension === '.arc').map(f => {
  const b = read(f), members = [];
  let offset = 0;
  while (offset + 2 <= b.length) {
    if (b[offset] !== 0x1a) throw new Error(`Invalid ARC record at ${offset}: ${f.path}`);
    const method = b[offset + 1];
    if (method === 0) { offset += 2; break; }
    if (method < 1 || method > 9) throw new Error(`Unsupported ARC method ${method}: ${f.path}`);
    const headerBytes = method === 1 ? 25 : 29;
    if (offset + headerBytes > b.length) throw new Error(`Truncated ARC header: ${f.path}`);
    const compressedBytes = b.readUInt32LE(offset + 15);
    const rawName = b.subarray(offset + 2, offset + 15);
    const end = rawName.indexOf(0);
    const name = rawName.subarray(0, end < 0 ? rawName.length : end).toString('ascii');
    const bytes = method === 1 ? compressedBytes : b.readUInt32LE(offset + 25);
    members.push({ name, method, bytes, compressedBytes, crc16: b.readUInt16LE(offset + 23),
      dosTimestamp: arcDate(b.readUInt16LE(offset + 19), b.readUInt16LE(offset + 21)),
      sameNameSizeCandidates: files.filter(g => path.basename(g.path).toUpperCase() === name.toUpperCase() && g.bytes === bytes).map(g => g.path) });
    offset += headerBytes + compressedBytes;
    if (offset > b.length) throw new Error(`Truncated ARC data: ${f.path}`);
  }
  if (offset !== b.length) throw new Error(`Unexpected ARC trailing bytes: ${f.path}`);
  return { path: f.path, sha256: f.sha256, bytes: f.bytes, members,
    note: 'Headers parsed only; compressed members NOT decoded or SHA-256 checked. Name/size agreement does not establish redundancy.' };
});
const evidence = {
  generatedAt: new Date().toISOString(),
  privacyScan: {
    scope: 'Raw regular-file bytes decoded as Latin-1; no ZIP/ARC decompression, OCR, PDF text or DOCX XML in this heuristic scan. Family reviewed separately.',
    warning: 'Flags are review leads, not proof of private data. No flags is not clearance. Do not publish this raw path manifest before curation.',
    flags: privacyFlags,
    categoryCounts: Object.fromEntries(Object.keys(checks).map(category => [category, privacyFlags.filter(f => f.categories.includes(category)).length])),
  },
  executableFamilies,
  paddedRuntimeVariants: ['author', 'browser', 'update']
    .filter(name => fs.existsSync(path.join(root, relocatedPath(`ecs/${name}.exe`))) && fs.existsSync(path.join(root, relocatedPath(`ht30glos/${name}.exe`))))
    .map(name => {
    const left = relocatedPath(`ecs/${name}.exe`), right = relocatedPath(`ht30glos/${name}.exe`);
    const a = fs.readFileSync(path.join(root, left)), b = fs.readFileSync(path.join(root, right));
    const differences = [];
    for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) differences.push(i);
    return { left, right, leftBytes: a.length, rightBytes: b.length,
      differingCommonOffsets: differences,
      extraBytesHex: a.subarray(b.length).toString('hex'),
      equivalentExceptMzLengthAndZeroPadding: a.length >= b.length && differences.every(i => i === 2 || i === 3) &&
        a.subarray(b.length).every(byte => byte === 0) && a.subarray(0, 2).toString('ascii') === 'MZ' };
  }),
  articleHeaders: { files: articles.length, validOffsetHeaders, monotonicOffsetHeaders, anomalousArticles, trailerVersionCounts: Object.fromEntries(versions) },
  relatedTrees: [
    compareTrees('ecs', 'ht30glos/ogawa'),
    compareTrees('htuis', 'htuism'),
    compareTrees('tour30', 'tour7_91'),
  ],
  arcArchives,
};
fs.writeFileSync(path.join(here, 'research.json'), `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify({
  privacyCategories: evidence.privacyScan.categoryCounts,
  executableFamilies: executableFamilies.length,
  articleHeaderCounts: { files: articles.length, validOffsetHeaders, monotonicOffsetHeaders },
  trailerVersions: evidence.articleHeaders.trailerVersionCounts,
  relatedTrees: evidence.relatedTrees.map(t => ({ left: t.left, right: t.right, identical: t.identicalFiles, changed: t.changed.length, leftOnly: t.leftOnly.length, rightOnly: t.rightOnly.length })),
  arcArchives: arcArchives.map(a => ({ path: a.path, members: a.members.length, withoutNameSizeMatch: a.members.filter(m => !m.sameNameSizeCandidates.length).map(m => m.name) })),
}, null, 2));
