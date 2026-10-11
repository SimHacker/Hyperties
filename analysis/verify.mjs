#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { relocatedPath, originalPath } from './layout.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const json = name => JSON.parse(fs.readFileSync(path.join(here, name), 'utf8'));
const files = json('inventory.json'), summary = json('summary.json');
const duplicates = json('duplicates.json'), archives = json('zip-members.json');
const research = json('research.json'), curation = json('curation.json');
const cleanup = fs.existsSync(path.join(here, 'deduplication-log.json')) ? json('deduplication-log.json') : null;
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const byPath = new Map(files.map(f => [f.path, f]));
assert.equal(byPath.size, files.length, 'Unique inventory paths');
assert.equal(files.length, summary.files, 'File count');
assert.equal(files.reduce((sum, f) => sum + f.bytes, 0), summary.bytes, 'Total bytes');
const contents = new Map();
const repositoryStubChanges = [];
for (const f of files) {
  const bytes = fs.readFileSync(path.join(root, f.path));
  if (f.path === 'README.md' && hash(bytes) !== f.sha256) {
    repositoryStubChanges.push({ path: f.path, snapshotBytes: f.bytes, currentBytes: bytes.length, currentSha256: hash(bytes) });
  } else {
    assert.equal(bytes.length, f.bytes, `Original size preserved: ${f.path}`);
    assert.equal(hash(bytes), f.sha256, `Original content preserved: ${f.path}`);
  }
  contents.set(f.sha256, f.bytes);
}
assert.equal(contents.size, summary.uniqueContents);
assert.equal([...contents.values()].reduce((sum, n) => sum + n, 0), summary.uniqueBytes);
assert.equal(summary.bytes - summary.uniqueBytes, summary.exactDuplicateBytes);
const dupeHashes = new Set();
for (const d of duplicates) {
  assert(!dupeHashes.has(d.sha256), 'Duplicate group listed once');
  dupeHashes.add(d.sha256);
  assert.equal(d.paths.length, d.copies);
  assert.equal(d.reclaimableBytes, d.bytesEach * (d.copies - 1));
  for (const p of d.paths) {
    assert.equal(byPath.get(p)?.sha256, d.sha256);
    assert.equal(byPath.get(p)?.bytes, d.bytesEach);
  }
}
assert.equal(duplicates.reduce((sum, d) => sum + d.reclaimableBytes, 0), summary.exactDuplicateBytes);
assert.equal(duplicates.reduce((sum, d) => sum + d.copies - 1, 0), summary.duplicateCopies);
const expectedChecksums = files.map(f => `${f.sha256}  ${f.path}\n`).join('');
assert.equal(fs.readFileSync(path.join(here, 'SHA256SUMS'), 'utf8'), expectedChecksums);
for (const a of archives) {
  assert.equal(a.members.filter(m => m.sha256).length, a.fileMembers);
  for (const m of a.members.filter(m => m.sha256)) for (const p of m.extractedMatches) {
    assert.equal(byPath.get(p)?.sha256, m.sha256);
    assert.equal(byPath.get(p)?.bytes, m.bytes);
  }
}
assert.equal(curation.files.length, files.length);
assert.equal(new Set(curation.files.map(f => f.path)).size, files.length);
for (const row of curation.files) {
  assert.equal(byPath.get(row.path)?.sha256, row.sha256);
  if (originalPath(row.path).startsWith('family/')) assert(['review-personal-source', 'omit-raw-log'].includes(row.action));
}
assert(research.paddedRuntimeVariants.every(v => v.equivalentExceptMzLengthAndZeroPadding));
assert.equal(research.articleHeaders.files, files.filter(f => f.extension === '.fil').length);
assert.equal(summary.treeComparisons.reduce((sum, t) => sum + t.changed.length, 0), 0);
assert(summary.treeComparisons.every(t => t.uniqueToTree.length === 0));

if (cleanup) {
  assert.equal(cleanup.status, 'completed', 'Cleanup must have completed');
  const before = json('before-dedup/inventory.json');
  const removals = new Map(cleanup.removals.map(r => [r.path, r]));
  assert.equal(removals.size, cleanup.filesRemoved);
  assert.equal(cleanup.filesRemoved, 2919);
  assert.equal(cleanup.bytesRemoved, 35922491);
  assert.equal(cleanup.removals.reduce((sum, r) => sum + r.bytes, 0), cleanup.bytesRemoved);
  for (const original of before) {
    const removed = removals.get(original.path);
    if (removed) {
      assert.equal(removed.sha256, original.sha256);
      assert(!fs.existsSync(path.join(root, original.path)), `Removal not applied: ${original.path}`);
      if (removed.retained) assert.equal(byPath.get(relocatedPath(removed.retained))?.sha256, removed.retainedSha256);
    } else {
      if (original.path === 'README.md') continue;
      assert(byPath.has(relocatedPath(original.path)), `Unplanned removal: ${original.path}`);
      assert.equal(byPath.get(relocatedPath(original.path)).sha256, original.sha256);
    }
  }
  assert.equal(files.length, before.length - removals.size - 1, 'No unplanned new files in archive; authored root README excluded');
  assert.equal(summary.files, 2528);
  assert.equal(summary.bytes, 32742340);
  assert.equal(research.executableFamilies.length, 16);
  assert.equal(files.filter(f => ['.exe', '.com'].includes(f.extension)).length, 16);
  assert(!files.some(f => path.basename(f.path) === '.DS_Store'));
  for (const d of cleanup.directoriesRemoved) assert(!fs.existsSync(path.join(root, d)));
} else {
  // Fresh public clones have no private pre-cleanup inventory or removal journal.
  // Validate current inventory relations, not the excluded original backup.
  assert.equal(summary.executableFamilies, undefined);
  assert.equal(research.articleHeaders.files, files.filter(f => f.extension === '.fil').length);
  assert.equal(research.articleHeaders.validOffsetHeaders + research.articleHeaders.anomalousArticles.length,
    research.articleHeaders.files);
  assert.equal(research.executableFamilies.length, new Set(files.filter(f =>
    ['.exe', '.com'].includes(f.extension)).map(f => f.sha256)).size);
}

// Check documentation destinations; generated reports intentionally link private
// local originals, but public prose must not include personal contents.
for (const name of fs.readdirSync(here).filter(n => n.endsWith('.md'))) {
  const text = fs.readFileSync(path.join(here, name), 'utf8');
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(?:https?:|mailto:)/.test(target)) continue;
    const destination = path.resolve(here, decodeURIComponent(target));
    assert(fs.existsSync(destination), `Broken link in ${name}: ${target}`);
  }
  const importText = fs.readFileSync(path.join(here, 'import-process.md'), 'utf8');
  assert(!/dropbox\.com\/scl\/|rlkey=/.test(importText), 'Private Dropbox sharing URL must not be published');
}
console.log(`Verified ${files.length - repositoryStubChanges.length} files unchanged, ${duplicates.length} duplicate groups, ZIP match references, curation coverage, documented snapshot totals, runtime padding evidence, and Markdown file links.`);
if (cleanup) console.log(`Reconciled ${cleanup.filesRemoved} approved removals with original inventory and verified all retained historical content unchanged.`);
if (repositoryStubChanges.length) console.log('Post-snapshot repository stub edits preserved (not historical archive mutations):', JSON.stringify(repositoryStubChanges));
