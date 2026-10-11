#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FormatError, parseArticle, parseIndex, parseLegacyIndex, scanMarkup, checkPackedRanges } from './records.mjs';
import { originalPath } from './layout.mjs';

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.dirname(here);
const inventory = JSON.parse(fs.readFileSync(path.join(here, 'inventory.json'), 'utf8'));
// Do not export private genealogy, session logs, or opaque binary strings.
const publicFiles = inventory.filter(f => !originalPath(f.path).startsWith('family/'));
const articles = [], indexes = [], issues = [];
for (const f of publicFiles) {
  const legacyIndex = path.posix.basename(f.path).toLowerCase() === 'index.tie';
  if (!['.fil', '.new'].includes(f.extension) && !legacyIndex) continue;
  const bytes = fs.readFileSync(path.join(root, f.path));
  try {
    if (f.extension === '.fil') {
      const a = parseArticle(bytes);
      const markup = scanMarkup(a.body, a.offsets[2]);
      articles.push({ path: f.path, collection: originalPath(f.path).split('/')[0], sha256: f.sha256,
        title: a.heading.trim(), descriptionBytes: a.sections[1].end - a.sections[1].start,
        bodyBytes: a.sections[2].end - a.sections[2].start,
        offsets: a.offsets, separators: a.sections.map(s => s.hasSeparator),
        referenceNames: a.referenceNames, trailer: a.trailer.trim(),
        fifthSectionBytes: a.sections[4].end - a.sections[4].start,
        ...markup });
    } else {
      const records = legacyIndex ? parseLegacyIndex(bytes) : parseIndex(bytes);
      const directory = path.posix.dirname(f.path);
      const packed = publicFiles.find(p => path.posix.dirname(p.path) === directory && path.posix.basename(p.path).toLowerCase() === 'bigfile.tie');
      indexes.push({ path: f.path, dialect: legacyIndex ? 'entry-file' : 'plus-1.0', records, packedPath: packed?.path ?? null,
        packedRanges: packed && !legacyIndex ? checkPackedRanges(records, packed.bytes) : null });
    }
  } catch (error) {
    if (!(error instanceof FormatError)) throw error;
    issues.push({ path: f.path, code: error.code, message: error.message });
  }
}
const normalize = s => s.trim().replace(/\s+/g, ' ').toUpperCase();
const articleByPath = new Map(articles.map(a => [a.path.toUpperCase(), a]));
for (const a of articles) {
  const directory = path.posix.dirname(a.path);
  const candidates = new Map();
  function add(label, target) {
    const key = normalize(label);
    if (!candidates.has(key)) candidates.set(key, new Set());
    candidates.get(key).add(target);
  }
  for (const other of articles.filter(other => path.posix.dirname(other.path) === directory)) {
    add(other.title, other.path);
    add(path.posix.basename(other.path, path.posix.extname(other.path)), other.path);
  }
  for (const index of indexes.filter(i => path.posix.dirname(i.path) === directory)) {
    for (const r of index.records) {
      const target = articleByPath.get(`${directory}/${r.basename}.FIL`.toUpperCase())?.path ??
        `${index.path}::${r.basename}`;
      for (const label of [r.title, r.basename, ...r.aliases]) add(label, target);
    }
  }
  a.links = a.links.map(link => {
    const targets = [...(candidates.get(normalize(link.target)) ?? [])];
    return { ...link, status: /^#/.test(link.target) ? 'numeric-id-unresolved' :
      targets.length === 1 ? 'resolved-candidate' : targets.length > 1 ? 'ambiguous' : 'unresolved',
    candidates: targets };
  });
  const orderedReferenceEvidence = a.links.every(l => l.syntax === 'tilde') && a.links.length === a.referenceNames.length && a.links.length > 0;
  a.orderedReferenceEvidence = orderedReferenceEvidence;
  if (orderedReferenceEvidence) {
    a.links = a.links.map((link, i) => {
      const basename = a.referenceNames[i].trim();
      const target = articleByPath.get(`${directory}/${basename}.FIL`.toUpperCase());
      return { ...link, storedReference: basename,
        status: target ? 'stored-reference-candidate' : 'stored-reference-missing',
        candidates: target ? [target.path] : [], aliasCandidates: link.candidates };
    });
  }
  a.mediaReferences = a.directives.filter(d => ['g', 'b', 'stylesheet', 'font'].includes(d.name) && d.value)
    .map(d => {
      const candidates = publicFiles.filter(f => path.posix.dirname(f.path) === directory &&
        path.posix.basename(f.path).toUpperCase() === d.value.toUpperCase()).map(f => f.path);
      return { directive: d.name, target: d.value, candidates,
        status: candidates.length === 1 ? 'local-file' : 'unresolved-or-symbolic' };
    });
}
const collections = [...new Set(articles.map(a => a.collection))].sort().map(collection => {
  const selected = articles.filter(a => a.collection === collection);
  const links = selected.flatMap(a => a.links), counts = {};
  for (const link of links) counts[link.status] = (counts[link.status] ?? 0) + 1;
  return { collection, articles: selected.length, links: links.length, linkStatuses: counts,
    directiveNames: [...new Set(selected.flatMap(a => a.directives.map(d => d.name)))].sort() };
});
const result = { generatedAt: new Date().toISOString(),
  scope: 'Non-family .FIL and .NEW only; byte-preserving Latin-1 inspection, not confirmed Unicode decoding. Titles/structural metadata, no full article text exports.',
  articles, indexes, collections, issues };
fs.writeFileSync(path.join(here, 'semantic-catalog.json'), JSON.stringify(result, null, 2) + '\n');
const md = ['# Semantic catalog: current recovery', '',
  'Generated by `node analysis/catalog.mjs`. Personal genealogy excluded. This is a partial syntax/relationship catalog, not a complete emulator or text export.',
  '', '| Collection | Parsed articles | Body links | Candidate-resolved | Unresolved | Numeric IDs unresolved | Ambiguous |',
  '|---|---:|---:|---:|---:|---:|---:|'];
for (const c of collections) md.push(`| ${c.collection} | ${c.articles} | ${c.links} | ${(c.linkStatuses['resolved-candidate'] ?? 0) + (c.linkStatuses['stored-reference-candidate'] ?? 0)} | ${(c.linkStatuses.unresolved ?? 0) + (c.linkStatuses['stored-reference-missing'] ?? 0)} | ${c.linkStatuses['numeric-id-unresolved'] ?? 0} | ${c.linkStatuses.ambiguous ?? 0} |`);
md.push('', '## Classic indexes', '', '| Index | Records | Packed file forms an exact offset/length partition? |', '|---|---:|---|');
for (const i of indexes) md.push(`| ${i.path} | ${i.records.length} | ${i.packedRanges ? String(i.packedRanges.exactPartition) : 'No local packed file'} |`);
md.push('', '## Explicit parse issues', '');
for (const issue of issues) md.push(`- ${issue.path}: ${issue.code}: ${issue.message}`);
md.push('', '## Interpretation limits', '',
  '- Candidate resolution uses local titles, basenames and index aliases; it is not tested runtime navigation.',
  '- Where every body link is tilde syntax and count equals stored reference names, ordered basename correspondence is reported explicitly as evidence, not assumed for other records.',
  '- Numeric IDs need the later index schema; missing candidates are not proven broken links.',
  '- Media names may be symbolic graphic objects, external resources, or packed assets.',
  '- Directive tokenization is partial; raw spellings and byte positions are retained.',
  '- Full details: local `semantic-catalog.json`. Review before publishing generated catalogs.');
fs.writeFileSync(path.join(here, 'semantic-map.md'), md.join('\n') + '\n');
console.log(JSON.stringify({ parsedArticles: articles.length, indexFiles: indexes.length,
  indexedRecords: indexes.reduce((n, i) => n + i.records.length, 0), issues,
  crownJewels: collections.filter(c => c.collection === 'oldmjh'),
  book: indexes.find(i => originalPath(i.path).startsWith('HHO-'))?.packedRanges }, null, 2));
