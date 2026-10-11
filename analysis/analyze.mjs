#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const hash = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const order = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const files = [];
const directories = [];
const skipped = [];
function walk(relative = '') {
  directories.push(relative || '.');
  for (const name of fs.readdirSync(path.join(root, relative)).sort(order)) {
    if (!relative && !['corpus', 'reference'].includes(name)) continue;
    if (relative && ['README.md', 'INDEX.md', 'GLANCE.yml'].includes(name)) continue;
    const rel = relative ? `${relative}/${name}` : name;
    const stat = fs.lstatSync(path.join(root, rel));
    if (stat.isSymbolicLink()) {
      skipped.push({ path: rel, reason: 'symlink (not followed)', target: fs.readlinkSync(path.join(root, rel)) });
    } else if (stat.isDirectory()) walk(rel);
    else if (stat.isFile()) {
      const bytes = fs.readFileSync(path.join(root, rel));
      const after = fs.statSync(path.join(root, rel));
      if (stat.size !== after.size || stat.mtimeMs !== after.mtimeMs) throw new Error(`File changed during scan: ${rel}`);
      files.push({
        path: rel, bytes: bytes.length, sha256: hash(bytes),
        extension: path.extname(name).toLowerCase() || '(none)',
        mtime: stat.mtime.toISOString(), mode: (stat.mode & 0o777).toString(8),
        first32Hex: bytes.subarray(0, 32).toString('hex'),
      });
    } else skipped.push({ path: rel, reason: 'non-regular filesystem entry' });
  }
}
walk();
files.sort((a, b) => order(a.path, b.path));
for (let i = 0; i < files.length; i += 100) {
  const batch = files.slice(i, i + 100);
  const result = spawnSync('file', ['-b', '--', ...batch.map(f => path.join(root, f.path))], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw result.error || new Error(result.stderr);
  const descriptions = result.stdout.trimEnd().split('\n');
  if (descriptions.length !== batch.length) throw new Error('Unexpected file(1) output shape');
  batch.forEach((f, n) => { f.identification = descriptions[n]; });
}
const groups = new Map();
for (const file of files) {
  if (!groups.has(file.sha256)) groups.set(file.sha256, []);
  groups.get(file.sha256).push(file);
}
const duplicates = [...groups.entries()].filter(([, group]) => group.length > 1)
  .map(([sha256, group]) => ({
    sha256, bytesEach: group[0].bytes, copies: group.length,
    reclaimableBytes: group[0].bytes * (group.length - 1), paths: group.map(f => f.path),
  })).sort((a, b) => b.reclaimableBytes - a.reclaimableBytes || order(a.sha256, b.sha256));
const extensionSummary = [...new Set(files.map(f => f.extension))].sort(order).map(extension => {
  const selected = files.filter(f => f.extension === extension);
  return { extension, files: selected.length, bytes: selected.reduce((sum, f) => sum + f.bytes, 0),
    uniqueContents: new Set(selected.map(f => f.sha256)).size,
    identifications: [...new Set(selected.map(f => f.identification))].sort(order),
    examples: selected.slice(0, 4).map(f => f.path) };
});
const directorySummary = directories.map(directory => {
  const selected = files.filter(f => directory === '.' || f.path.startsWith(`${directory}/`));
  const direct = selected.filter(f => path.posix.dirname(f.path) === directory);
  return { path: directory, files: selected.length, bytes: selected.reduce((sum, f) => sum + f.bytes, 0),
    directFiles: direct.length, extensions: [...new Set(selected.map(f => f.extension))].sort(order) };
});
const nested = 'HypertiesDatabases-minusFamily';
const aliases = { cacm: 'CACM-Hypertext Conference issue July 1988', hho: 'HHO-Hypertext on Hypertext book-1988' };
const treeComparisons = directorySummary.filter(d => d.path.startsWith(`${nested}/`) && d.path.split('/').length === 2).map(d => {
  const name = d.path.split('/')[1];
  const counterpart = aliases[name] || name;
  const left = files.filter(f => f.path.startsWith(`${d.path}/`));
  const right = files.filter(f => f.path.startsWith(`${counterpart}/`));
  const rightByPath = new Map(right.map(f => [f.path.slice(counterpart.length + 1), f]));
  const leftByPath = new Map(left.map(f => [f.path.slice(d.path.length + 1), f]));
  const identical = [], changed = [], onlyNested = [], onlyTop = [];
  for (const [rel, f] of leftByPath) {
    const other = rightByPath.get(rel);
    if (!other) onlyNested.push(f.path);
    else if (other.sha256 === f.sha256) identical.push(f.path);
    else changed.push({ nested: f.path, top: other.path });
  }
  for (const [rel, f] of rightByPath) if (!leftByPath.has(rel)) onlyTop.push(f.path);
  const elsewhere = new Set(files.filter(f => !f.path.startsWith(`${d.path}/`)).map(f => f.sha256));
  const uniqueToTree = left.filter(f => !elsewhere.has(f.sha256)).map(f => f.path);
  return { nested: d.path, counterpart, nestedFiles: left.length, topFiles: right.length,
    identicalFiles: identical.length, changed, onlyNested, onlyTop, uniqueToTree,
    exactTree: left.length > 0 && right.length > 0 && !changed.length && !onlyNested.length && !onlyTop.length,
    bytes: d.bytes };
});

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function dosDate(date, time) {
  return `${1980 + (date >>> 9)}-${String((date >>> 5) & 15).padStart(2, '0')}-${String(date & 31).padStart(2, '0')}T${String(time >>> 11).padStart(2, '0')}:${String((time >>> 5) & 63).padStart(2, '0')}:${String((time & 31) * 2).padStart(2, '0')}`;
}
function inspectZip(file) {
  const buffer = fs.readFileSync(path.join(root, file.path));
  let end = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 65557); i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50 && i + 22 + buffer.readUInt16LE(i + 20) === buffer.length) { end = i; break; }
  }
  if (end < 0) throw new Error(`ZIP end record missing: ${file.path}`);
  if (buffer.readUInt16LE(end + 4) || buffer.readUInt16LE(end + 6)) throw new Error(`Multipart ZIP unsupported: ${file.path}`);
  const count = buffer.readUInt16LE(end + 10);
  let offset = buffer.readUInt32LE(end + 16);
  if (count === 65535 || offset === 0xffffffff) throw new Error(`ZIP64 unsupported: ${file.path}`);
  const members = [];
  for (let i = 0; i < count; i++) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error(`Invalid ZIP central directory: ${file.path}`);
    const flags = buffer.readUInt16LE(offset + 8);
    const method = buffer.readUInt16LE(offset + 10);
    const compressedBytes = buffer.readUInt32LE(offset + 20);
    const bytes = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const local = buffer.readUInt32LE(offset + 42);
    const nameBytes = buffer.subarray(offset + 46, offset + 46 + nameLength);
    // Legacy non-ASCII ZIP names need a CP437-capable tool; do not invent a decoding.
    if (!(flags & 0x800) && nameBytes.some(b => b > 127)) throw new Error(`Non-ASCII legacy ZIP name unsupported: ${file.path}`);
    const name = nameBytes.toString('utf8');
    const member = { name, bytes, compressedBytes, method, dosTimestamp: dosDate(buffer.readUInt16LE(offset + 14), buffer.readUInt16LE(offset + 12)) };
    if (!name.endsWith('/')) {
      if (flags & 1) throw new Error(`Encrypted ZIP member: ${file.path}: ${name}`);
      if (![0, 8].includes(method)) throw new Error(`ZIP method ${method} unsupported: ${file.path}: ${name}`);
      if (bytes > 128 * 1024 * 1024) throw new Error(`ZIP member exceeds analysis safety limit: ${file.path}: ${name}`);
      if (buffer.readUInt32LE(local) !== 0x04034b50) throw new Error(`Invalid ZIP local record: ${file.path}: ${name}`);
      const start = local + 30 + buffer.readUInt16LE(local + 26) + buffer.readUInt16LE(local + 28);
      const packed = buffer.subarray(start, start + compressedBytes);
      const content = method === 8 ? zlib.inflateRawSync(packed, { maxOutputLength: Math.max(bytes, 1) }) : packed;
      if (content.length !== bytes || crc32(content) !== buffer.readUInt32LE(offset + 16)) throw new Error(`ZIP integrity mismatch: ${file.path}: ${name}`);
      member.sha256 = hash(content);
      member.extractedMatches = (groups.get(member.sha256) || []).map(f => f.path);
    }
    members.push(member);
    offset += 46 + nameLength + extraLength + commentLength;
  }
  const regular = members.filter(m => m.sha256);
  return { path: file.path, bytes: file.bytes, members,
    fileMembers: regular.length, uncompressedBytes: regular.reduce((sum, m) => sum + m.bytes, 0),
    matchingMembers: regular.filter(m => m.extractedMatches.length).length,
    unmatchedMembers: regular.filter(m => !m.extractedMatches.length).map(m => m.name) };
}
const archives = files.filter(f => f.extension === '.zip').map(inspectZip);
const archiveOnly = new Map();
for (const archive of archives) for (const member of archive.members) {
  if (member.sha256 && !groups.has(member.sha256)) {
    if (!archiveOnly.has(member.sha256)) archiveOnly.set(member.sha256, { sha256: member.sha256, bytes: member.bytes, members: [] });
    archiveOnly.get(member.sha256).members.push(`${archive.path}::${member.name}`);
  }
}
const summary = {
  generatedAt: new Date().toISOString(), root: '.', exclusions: ['.git/', 'analysis/', 'tools/', 'docs/', 'manifests/', 'Git controls and generated collection navigation'],
  files: files.length, directories: directories.length, bytes: files.reduce((sum, f) => sum + f.bytes, 0),
  uniqueContents: groups.size, uniqueBytes: [...groups.values()].reduce((sum, g) => sum + g[0].bytes, 0),
  duplicateGroups: duplicates.length, duplicateCopies: duplicates.reduce((sum, g) => sum + g.copies - 1, 0),
  exactDuplicateBytes: duplicates.reduce((sum, g) => sum + g.reclaimableBytes, 0),
  archiveOnlyUniqueContents: archiveOnly.size, archiveOnlyUniqueBytes: [...archiveOnly.values()].reduce((sum, m) => sum + m.bytes, 0),
  skipped, extensionSummary, directorySummary, treeComparisons,
};
function json(name, value) { fs.writeFileSync(path.join(here, name), `${JSON.stringify(value, null, 2)}\n`); }
function tsv(name, headers, rows) {
  const cell = value => String(value).replaceAll('\\', '\\\\').replaceAll('\t', '\\t').replaceAll('\r', '\\r').replaceAll('\n', '\\n');
  fs.writeFileSync(path.join(here, name), [headers, ...rows].map(row => row.map(cell).join('\t')).join('\n') + '\n');
}
json('inventory.json', files);
json('summary.json', summary);
json('duplicates.json', duplicates);
json('zip-members.json', archives);
json('archive-only.json', [...archiveOnly.values()]);
tsv('inventory.tsv', ['path', 'bytes', 'sha256', 'extension', 'mtime_utc', 'mode', 'file_identification'],
  files.map(f => [f.path, f.bytes, f.sha256, f.extension, f.mtime, f.mode, f.identification]));
tsv('duplicates.tsv', ['sha256', 'bytes_each', 'copies', 'reclaimable_bytes', 'path'],
  duplicates.flatMap(g => g.paths.map(p => [g.sha256, g.bytesEach, g.copies, g.reclaimableBytes, p])));
if (files.some(f => /[\r\n\\]/.test(f.path))) throw new Error('Paths require escaped checksum syntax; use inventory.json');
fs.writeFileSync(path.join(here, 'SHA256SUMS'), files.map(f => `${f.sha256}  ${f.path}\n`).join(''));
const link = p => `[${p}](../${p.split('/').map(part => encodeURIComponent(part).replaceAll('(', '%28').replaceAll(')', '%29')).join('/')})`;
const lines = ['# Generated directory map', '', 'Regenerate with `node analysis/analyze.mjs`. Original regular files only; Git and analysis excluded. Every file is listed in [inventory.tsv](inventory.tsv); this map lists every directory, including empty ones. Counts and bytes include descendants.', '',
  '| Directory | Files | Bytes | Extensions |', '|---|---:|---:|---|'];
for (const d of directorySummary) lines.push(`| ${d.path === '.' ? '(root)' : link(d.path)} | ${d.files} | ${d.bytes} | ${d.extensions.join(', ')} |`);
lines.push('', '## Nested / top-level comparisons', '', 'Case-sensitive relative names and SHA-256 contents; renamed CACM and HHO collections explicitly paired.', '',
  '| Nested collection | Top-level counterpart | Identical paths | Changed | Nested-only paths | Top-only paths | Contents unique to nested tree* | Exact tree? |',
  '|---|---|---:|---:|---:|---:|---:|---|');
for (const t of treeComparisons) lines.push(`| ${link(t.nested)} | ${link(t.counterpart)} | ${t.identicalFiles} | ${t.changed.length} | ${t.onlyNested.length} | ${t.onlyTop.length} | ${t.uniqueToTree.length} | ${t.exactTree ? 'yes' : 'no'} |`);
lines.push('', '*Loose-file content comparison only: ZIP-member coverage is recorded separately. Zero unique contents does not prove that directory names, timestamps, or launch layout are disposable. Detailed exceptions: [summary.json](summary.json).',
  '', '## File format census', '', '| Extension | Files | Bytes | Unique contents | Examples |', '|---|---:|---:|---:|---|');
for (const e of extensionSummary) lines.push(`| ${e.extension} | ${e.files} | ${e.bytes} | ${e.uniqueContents} | ${e.examples.map(link).join(', ')} |`);
fs.writeFileSync(path.join(here, 'directory-map.md'), lines.join('\n') + '\n');
console.log(JSON.stringify({ files: summary.files, bytes: summary.bytes, uniqueBytes: summary.uniqueBytes,
  duplicateCopies: summary.duplicateCopies, exactDuplicateBytes: summary.exactDuplicateBytes,
  zipArchives: archives.length, archiveOnlyUniqueContents: summary.archiveOnlyUniqueContents,
  skipped: skipped.length }, null, 2));
