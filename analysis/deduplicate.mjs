#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const apply = process.argv.includes('--apply');
assert(process.argv.slice(2).every(arg => arg === '--apply'), 'Only --apply is supported; default is dry run');
const journalPath = path.join(here, 'deduplication-log.json');
assert(!fs.existsSync(journalPath), 'Cleanup already started or completed; inspect journal instead of repeating it');
const json = name => JSON.parse(fs.readFileSync(path.join(here, name), 'utf8'));
const files = json('inventory.json');
const research = json('research.json');
const archives = json('zip-members.json');
const byPath = new Map(files.map(f => [f.path, f]));
const digest = b => crypto.createHash('sha256').update(b).digest('hex');
const wrapper = 'HypertiesDatabases-minusFamily';
const removed = new Map();
function add(file, reason, retained = null, equivalence = 'exact') {
  assert(file && file.path !== 'README.md');
  assert(!removed.has(file.path), `Repeated removal: ${file.path}`);
  removed.set(file.path, { path: file.path, bytes: file.bytes, sha256: file.sha256, reason, retained, equivalence });
}
const aliases = { cacm: 'CACM-Hypertext Conference issue July 1988', hho: 'HHO-Hypertext on Hypertext book-1988' };
for (const f of files.filter(f => f.path.startsWith(`${wrapper}/`))) {
  if (path.basename(f.path) === '.DS_Store') add(f, 'Discarded Mac metadata', null, 'metadata');
  else if (f.extension === '.zip') {
    const archive = archives.find(a => a.path === f.path);
    assert(archive, 'ZIP evidence required');
    for (const m of archive.members.filter(m => m.sha256)) {
      assert(m.extractedMatches.some(p => !p.startsWith(`${wrapper}/`)) ||
        m.name.startsWith('__MACOSX/') || path.posix.basename(m.name) === '.DS_Store', `Unique substantive ZIP member: ${m.name}`);
    }
    add(f, 'Verified redundant ZIP packaging; only unmatched content is Mac metadata', null, 'zip-members');
  } else {
    const parts = f.path.split('/').slice(1);
    parts[0] = aliases[parts[0]] || parts[0];
    const retained = parts.join('/');
    assert.equal(byPath.get(retained)?.sha256, f.sha256, `Nested payload needs exact top-level counterpart: ${f.path}`);
    add(f, 'Redundant nested distribution', retained);
  }
}
for (const f of files.filter(f => !removed.has(f.path) && path.basename(f.path) === '.DS_Store')) {
  add(f, 'Discarded Mac metadata', null, 'metadata');
}
for (const f of files.filter(f => f.path.startsWith('ecs/') && !removed.has(f.path))) {
  const name = f.path.slice(4);
  if (name === 'ecs.bat' || ['author.exe', 'browser.exe', 'update.exe'].includes(name)) continue;
  const retained = name === 'readme.doc' ? 'ht30glos/readme.doc' : `ht30glos/ogawa/${name}`;
  assert.equal(byPath.get(retained)?.sha256, f.sha256, `ECS payload counterpart: ${f.path}`);
  add(f, 'Repeated ECS/Ogawa source, media or README', retained);
}
for (const v of research.paddedRuntimeVariants) {
  assert(v.equivalentExceptMzLengthAndZeroPadding);
  const a = fs.readFileSync(path.join(root, v.left)), b = fs.readFileSync(path.join(root, v.right));
  assert.equal(a.subarray(0, 2).toString('ascii'), 'MZ');
  assert(a.length >= b.length);
  for (let i = 0; i < b.length; i++) if (a[i] !== b[i]) assert(i === 2 || i === 3, 'Only MZ length bytes may differ');
  assert(a.subarray(b.length).every(n => n === 0), 'Only zero padding may be discarded');
  add(byPath.get(v.left), 'Same executable except MZ byte-length field and trailing zero padding', v.right, 'mz-padding');
}
const families = new Map();
for (const f of files.filter(f => !removed.has(f.path) && ['.exe', '.com'].includes(f.extension))) {
  if (!families.has(f.sha256)) families.set(f.sha256, []);
  families.get(f.sha256).push(f);
}
for (const copies of families.values()) {
  copies.sort((a, b) => {
    const score = f => (f.path.startsWith('family/') ? 100 : 0) + (f.path.startsWith('ACM/') ? -10 : 0);
    return score(a) - score(b) || (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  });
  for (const f of copies.slice(1)) add(f, 'Byte-identical executable; retained once for optional research', copies[0].path);
}
function finalRetained(p) {
  const visited = new Set();
  while (removed.has(p)) {
    assert(!visited.has(p), 'Retention cycle');
    visited.add(p);
    p = removed.get(p).retained;
    assert(p, 'A retained counterpart must not resolve to junk');
  }
  return p;
}
for (const entry of removed.values()) if (entry.retained) {
  entry.retained = finalRetained(entry.retained);
  entry.retainedSha256 = byPath.get(entry.retained).sha256;
  // A nested padded executable may ultimately resolve to the canonical variant.
  if (entry.sha256 !== entry.retainedSha256) {
    assert(['.exe'].includes(byPath.get(entry.path).extension));
    const a = fs.readFileSync(path.join(root, entry.path)), b = fs.readFileSync(path.join(root, entry.retained));
    assert(a.length >= b.length && a.subarray(b.length).every(n => n === 0));
    for (let i = 0; i < b.length; i++) if (a[i] !== b[i]) assert(i === 2 || i === 3);
    entry.equivalence = 'mz-padding';
  }
}
function safeFile(relative) {
  assert(!path.isAbsolute(relative) && !relative.split('/').includes('..'));
  let current = root;
  for (const component of relative.split('/')) {
    current = path.join(current, component);
    assert(!fs.lstatSync(current).isSymbolicLink(), `No symlink traversal: ${relative}`);
  }
  assert(fs.lstatSync(current).isFile(), `Expected regular file: ${relative}`);
  return current;
}
// Preflight the entire surveyed archive, not just deletion candidates.
for (const f of files) {
  const bytes = fs.readFileSync(safeFile(f.path));
  if (f.path !== 'README.md') assert.equal(digest(bytes), f.sha256, `Changed since survey: ${f.path}`);
}
const directories = [];
function inspectTree(relative) {
  directories.push(relative);
  for (const name of fs.readdirSync(path.join(root, relative))) {
    const rel = `${relative}/${name}`, stat = fs.lstatSync(path.join(root, rel));
    assert(!stat.isSymbolicLink(), `Unexpected symlink: ${rel}`);
    if (stat.isDirectory()) inspectTree(rel);
    else assert(removed.has(rel), `Unsurveyed or retained file prevents tree removal: ${rel}`);
  }
}
inspectTree(wrapper);
const entries = [...removed.values()].sort((a, b) => a.path < b.path ? -1 : 1);
const result = {
  startedAt: new Date().toISOString(), status: apply ? 'in-progress' : 'dry-run',
  filesRemoved: entries.length, bytesRemoved: entries.reduce((sum, e) => sum + e.bytes, 0),
  remainingFiles: files.length - entries.length,
  remainingHistoricalAndSnapshotBytes: files.reduce((sum, f) => sum + f.bytes, 0) - entries.reduce((sum, e) => sum + e.bytes, 0),
  directoriesRemoved: directories.sort((a, b) => b.split('/').length - a.split('/').length),
  retainedExecutablePaths: files.filter(f => !removed.has(f.path) && ['.exe', '.com'].includes(f.extension)).map(f => f.path),
  removals: entries,
};
if (!apply) {
  fs.writeFileSync(path.join(here, 'deduplication-plan.json'), JSON.stringify(result, null, 2) + '\n');
} else {
  const snapshots = path.join(here, 'before-dedup');
  fs.mkdirSync(snapshots);
  for (const name of ['inventory.json', 'summary.json', 'duplicates.json', 'zip-members.json', 'archive-only.json', 'research.json', 'curation.json', 'directory-map.md', 'SHA256SUMS']) {
    fs.copyFileSync(path.join(here, name), path.join(snapshots, name), fs.constants.COPYFILE_EXCL);
  }
  fs.writeFileSync(journalPath, JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  for (const entry of entries) {
    const absolute = safeFile(entry.path);
    assert.equal(digest(fs.readFileSync(absolute)), entry.sha256, `Changed before deletion: ${entry.path}`);
    fs.unlinkSync(absolute);
  }
  // Remove only the explicitly inspected empty directories, never recursively.
  for (const directory of result.directoriesRemoved) fs.rmdirSync(path.join(root, directory));
  for (const entry of entries) if (entry.retained) {
    assert.equal(digest(fs.readFileSync(safeFile(entry.retained))), entry.retainedSha256);
  }
  result.status = 'completed';
  result.completedAt = new Date().toISOString();
  fs.writeFileSync(journalPath, JSON.stringify(result, null, 2) + '\n');
}
console.log(JSON.stringify({ status: result.status, filesRemoved: result.filesRemoved, bytesRemoved: result.bytesRemoved,
  remainingFiles: result.remainingFiles, remainingBytesAtSurvey: result.remainingHistoricalAndSnapshotBytes,
  retainedExecutablePaths: result.retainedExecutablePaths }, null, 2));
