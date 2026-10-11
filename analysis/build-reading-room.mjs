#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { relocatedPath, originalPath } from './layout.mjs';
import { parseArticle } from './records.mjs';

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.dirname(here);
const book = JSON.parse(fs.readFileSync(path.join(here, 'recovered-book.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(here, 'semantic-catalog.json'), 'utf8'));
const articles = book.articles.map(a => ({ collection: 'book', id: a.basename, title: a.title, aliases: a.aliases,
  body: a.body, bodyOffset: 0, description: a.description,
  source: `${book.source} bytes ${a.offset}..${a.offset + a.length}`,
  evidence: `Decoded SHA-256 ${a.decodedSha256}`,
  links: a.links.map(l => ({ ...l, offset: l.offset - a.bodyStart })) }));
const index = catalog.indexes.find(i => originalPath(i.path).startsWith('HHO-') && i.dialect === 'plus-1.0');
for (const issue of book.issues) {
  const r = index.records.find(r => r.basename === issue.basename);
  articles.push({ collection: 'book', id: r.basename, title: r.title, aliases: r.aliases, body: null,
    bodyOffset: 0, description: '', links: [], source: `${book.source} bytes ${r.offset}..${r.offset + r.length}`,
    evidence: 'Explicit unsupported-codec record', issue: `${issue.code}: ${issue.message}` });
}
for (const entry of catalog.articles.filter(a => a.collection === 'oldmjh')) {
  const a = parseArticle(fs.readFileSync(path.join(root, entry.path)));
  const basename = path.basename(entry.path, path.extname(entry.path));
  const aliases = [...new Set(catalog.indexes.filter(i => i.path === relocatedPath('oldmjh/INDEX.TIE'))
    .flatMap(i => i.records.filter(r => r.basename.toUpperCase() === basename.toUpperCase())
      .flatMap(r => [r.title, ...r.aliases])))];
  articles.push({ collection: 'museum', id: path.basename(entry.path, path.extname(entry.path)),
    title: a.heading.trim(), aliases, body: a.body, bodyOffset: a.offsets[2], description: a.description,
    source: entry.path, evidence: `Original SHA-256 ${entry.sha256}`,
    links: entry.links.map(l => ({ ...l, candidates: l.candidates.filter(p => originalPath(p).startsWith('oldmjh/') && !p.includes('::'))
      .map(p => path.basename(p, path.extname(p))) })) });
}
const ids = new Set();
for (const article of articles) {
  const key = `${article.collection}:${article.id}`;
  if (ids.has(key)) throw new Error(`Duplicate reading-room ID: ${key}`);
  ids.add(key);
  if (article.body === null) continue;
  for (const link of article.links) {
    const start = link.offset - article.bodyOffset;
    const spelling = link.syntax === 'tilde' ? `~${link.label}~` : `<L>${link.label}<\\L=${link.target}>`;
    if (!Number.isSafeInteger(start) || start < 0 || article.body.slice(start, start + spelling.length).toUpperCase() !== spelling.toUpperCase()) {
      throw new Error(`Invalid link source span in ${key}: ${link.offset}`);
    }
  }
}
const data = JSON.stringify({ articles }).replaceAll('<', '\\u003c').replaceAll('&', '\\u0026');
const template = fs.readFileSync(path.join(here, 'viewer.html'), 'utf8');
if (template.split('%%DATA%%').length !== 2) throw new Error('Expected exactly one dataset insertion point');
if (template.split('%%CORE%%').length !== 2) throw new Error('Expected exactly one shared-code insertion point');
const core = fs.readFileSync(path.join(root, 'tools/dist/browser.js'), 'utf8');
fs.writeFileSync(path.join(here, 'reading-room.html'), template.replace('%%DATA%%', () => data).replace('%%CORE%%', () => core));
console.log(`Built local reading room: ${articles.length} records, ${book.articles.length} decoded book articles, ${book.issues.length} explicit unrecovered book records, 402 museum articles. No network dependencies.`);
