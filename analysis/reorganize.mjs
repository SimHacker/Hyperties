#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { pathMap, relocatedPath } from './layout.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const digest = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const journalPath = path.join(root, 'analysis/relocation-log.json');
if (fs.existsSync(journalPath)) throw new Error('Relocation journal already exists; do not rerun this one-time migration.');
const originals = [];
function scan(p) {
  const stat = fs.lstatSync(path.join(root, p));
  if (stat.isDirectory()) {
    for (const n of fs.readdirSync(path.join(root, p))) scan(`${p}/${n}`);
  } else if (stat.isFile() && !['README.md', 'INDEX.md', 'GLANCE.yml'].includes(path.basename(p))) {
    originals.push({ from: p, to: relocatedPath(p), bytes: stat.size, sha256: digest(p) });
  } else if (!stat.isFile()) throw new Error(`Unsupported migration entry: ${p}`);
}
for (const [from, to] of Object.entries(pathMap)) {
  assert(fs.existsSync(path.join(root, from)), `Missing source: ${from}`);
  assert(!fs.existsSync(path.join(root, to)), `Destination exists: ${to}`);
  scan(from);
}
const journal = { status: 'in-progress', mappings: pathMap, files: originals };
fs.writeFileSync(journalPath, JSON.stringify(journal, null, 2) + '\n');
for (const [from, to] of Object.entries(pathMap)) {
  fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true });
  fs.renameSync(path.join(root, from), path.join(root, to));
}
for (const f of originals) {
  assert.equal(digest(f.to), f.sha256, `Changed original: ${f.to}`);
  assert.equal(fs.statSync(path.join(root, f.to)).size, f.bytes);
}

// Bulk path refactoring of authored Markdown, never historical source text.
function markdown(directory) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    if (entry.name === 'before-dedup' || entry.name === 'node_modules' || entry.name === 'dist') continue;
    const p = path.posix.join(directory, entry.name);
    if (entry.isDirectory()) markdown(p);
    else if (entry.name.endsWith('.md')) {
      const absolute = path.join(root, p);
      const prior = fs.readFileSync(absolute, 'utf8');
      const next = prior.replace(/(\]\()([^)]+)(\))/g, (all, left, target, right) => {
        if (/^(?:https?:|mailto:|#)/.test(target)) return all;
        const [file, ...fragment] = target.split('#');
        const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(p), decodeURIComponent(file)));
        const destination = relocatedPath(resolved);
        if (resolved === destination) return all;
        const relative = path.posix.relative(path.posix.dirname(p), destination);
        const encoded = relative.split('/').map(s => encodeURIComponent(s).replaceAll('(', '%28').replaceAll(')', '%29')).join('/');
        return left + encoded + (fragment.length ? '#' + fragment.join('#') : '') + right;
      });
      if (next !== prior) fs.writeFileSync(absolute, next);
    }
  }
}
for (const directory of ['analysis', 'docs', 'tools']) markdown(directory);
const readme = path.join(root, 'README.md');
let text = fs.readFileSync(readme, 'utf8');
for (const [old, dest] of Object.entries(pathMap)) text = text.replaceAll(`](${old}/`, `](${dest}/`);
fs.writeFileSync(readme, text);
journal.status = 'completed';
fs.writeFileSync(journalPath, JSON.stringify(journal, null, 2) + '\n');
console.log(`Moved and SHA-256 verified ${originals.length} historical files; originals were not rewritten.`);
