#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { originalPath } from './layout.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const files = JSON.parse(fs.readFileSync(path.join(here, 'inventory.json'), 'utf8'));
function recommendation(file) {
  const p = originalPath(file.path);
  if (p.startsWith('family/') && file.extension === '.log') return ['omit-raw-log', 'Family browsing logs remain excluded'];
  if (p.startsWith('family/')) return ['review-personal-source', 'Included for Ben review at owner request; provenance and privacy remain open'];
  if (p.startsWith('HypertiesDatabases-minusFamily/')) return ['remove-redundant-wrapper', 'Substantive payload also present in richer top-level collections; ZIP-only exceptions are Mac metadata'];
  if (p.endsWith('.DS_Store') || p.endsWith('/.DS_Store')) return ['remove-junk', 'Finder directory metadata'];
  if (['.$$$', '.lnk', '.pif'].includes(file.extension)) return ['omit-operational', 'Search scratch or obsolete/unrelated Windows launch metadata'];
  if (file.extension === '.log') return ['omit-raw-log', 'Keep useful diagnostic summary, not raw session/home-path transcript'];
  if (p === 'ecs/ecs.bat') return ['document-launcher', 'Preserved dependency evidence; source and tools consolidated in ht30glos'];
  if (p.startsWith('ecs/')) return ['consolidate-ecs-ogawa', 'Repeated data or tool variant; recheck against current inventory before further cleanup'];
  if (p === 'htuism/htuism.arc') return ['omit-probable-package', '33 member names/sizes match loose inputs; compressed contents not verified'];
  if (['.exe', '.com'].includes(file.extension)) return ['optional-runtime', 'One copy per required runtime/hash, optional download; no compatibility blanket deletion'];
  if (p.startsWith('chim/sub/') || ['chim/extra.fil', 'chim/extr2.fil', 'chim/chronolo.fil'].includes(p)) return ['select-fixture', 'Scratch/malformed record: retain useful unique test cases rather than repeated packaging'];
  if (p.startsWith('htuism/') || p.startsWith('tour30/')) return ['compare-variant', 'Related edition has substantive changed/unique files; retain meaningful overlay after semantic comparison'];
  return ['retain-candidate', 'Potential curated corpus/document/format asset; selection and third-party-content review not yet final'];
}
const rows = files.map(f => {
  const [action, reason] = recommendation(f);
  return { path: f.path, bytes: f.bytes, sha256: f.sha256, action, reason };
});
const totals = {};
for (const row of rows) {
  totals[row.action] ||= { files: 0, bytes: 0 };
  totals[row.action].files++;
  totals[row.action].bytes += row.bytes;
}
const baselineExcluded = new Set(['exclude-private', 'remove-redundant-wrapper', 'remove-junk', 'omit-operational']);
const baseline = rows.filter(row => !baselineExcluded.has(row.action));
const result = {
  dryRun: true, note: 'Recommendations only: no delete, move, stage, or publication operation. Retain-candidate does not mean approved public content.',
  totals, firstPassRemaining: { files: baseline.length, bytes: baseline.reduce((sum, r) => sum + r.bytes, 0) }, files: rows,
};
fs.writeFileSync(path.join(here, 'curation.json'), `${JSON.stringify(result, null, 2)}\n`);
const escape = value => String(value).replaceAll('\\', '\\\\').replaceAll('\t', '\\t').replaceAll('\r', '\\r').replaceAll('\n', '\\n');
fs.writeFileSync(path.join(here, 'curation.tsv'), [
  ['path', 'bytes', 'sha256', 'proposed_action', 'reason'],
  ...rows.map(r => [r.path, r.bytes, r.sha256, r.action, r.reason]),
].map(row => row.map(escape).join('\t')).join('\n') + '\n');
console.log(JSON.stringify({ dryRun: true, totals, firstPassRemaining: result.firstPassRemaining }, null, 2));
