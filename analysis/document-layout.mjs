#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { collectionGroups, pathMap } from './layout.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const uri = p => p.split('/').map(s => encodeURIComponent(s).replaceAll('(', '%28').replaceAll(')', '%29')).join('/');
const git = spawnSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root, encoding: 'utf8' });
if (git.status !== 0) throw new Error(git.stderr);
const candidates = new Set(git.stdout.split('\0').filter(Boolean));
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'analysis/inventory.json'), 'utf8'));
const sources = inventory.filter(f => candidates.has(f.path));
const write = (p, content) => {
  fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
  fs.writeFileSync(path.join(root, p), content);
};
const groupLinks = Object.entries(collectionGroups).map(([group, names]) =>
  `- [${group}](${group}/README.md): ${names.length} intact collections.`).join('\n');
write('corpus/README.md', `# Historical corpus\n\n[Repository](../README.md) · [Collection catalog](../docs/collections.md) · [Version view](../docs/by-version.md) · [Storage/format view](../docs/by-storage.md)\n\n${groupLinks}\n\nSubject groups are entry points, not exclusive classifications. A computing-literature collection can also be a classic packed database and a codec fixture. Those overlapping meanings live in catalog views, not duplicated folders.\n\nOriginal collection names, internal paths and source bytes are preserved. Modern README/GLANCE/INDEX files are navigation overlays. Historical executables stay with the collection that supplied the retained copy; their presence is evidence, not a runnable-distribution promise.\n`);
for (const [group, names] of Object.entries(collectionGroups)) {
  const links = names.map(name => `- [${name}](${uri(name)}/README.md)`).join('\n');
  write(`corpus/${group}/README.md`, `# ${group}\n\n[Corpus](../README.md) · [All collections](../../docs/collections.md)\n\n${links}\n\nCollections remain intact; format, version, subject and recovery status can overlap. Group placement does not assert an exact historical release or ownership classification.\n`);
  write(`corpus/${group}/INDEX.md`, `# ${group}: collection index\n\n[Overview](README.md)\n\n${names.map(name => `- [${name}: file index](${uri(name)}/INDEX.md)`).join('\n')}\n`);
  write(`corpus/${group}/GLANCE.yml`, `what: ${JSON.stringify(`Historical HyperTIES collections: ${group}`)}\nstatus: recovering\ninterfaces:\n  overview: README.md\n  index: INDEX.md\n  version_view: ../../docs/by-version.md\n  format_view: ../../docs/by-storage.md\ncollections: ${JSON.stringify(names)}\n`);
}
write('corpus/INDEX.md', `# Corpus index\n\n${groupLinks}\n\n[Overlapping version view](../docs/by-version.md) · [Storage view](../docs/by-storage.md) · [Every collection](../docs/collections.md)\n`);
write('corpus/GLANCE.yml', 'what: Intact historical databases grouped by broad subject, with overlapping format/version views.\nstatus: recovering\ninterfaces:\n  overview: README.md\n  index: INDEX.md\n  catalog: ../docs/collections.md\n  versions: ../docs/by-version.md\n  formats: ../docs/by-storage.md\n');
write('reference/README.md', `# Reference documents\n\n[Repository](../README.md)\n\n- [Hyperties user manual](manuals/Hyperties%20User%20Manual.pdf)\n- [Museum text/provenance document](museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx)\n- [Museum image document](museum/oldmjh-images.pdf)\n\nThese documents are separate from the database payload. Later access documents and OCR are not substituted for original article records. See the [timeline](../analysis/timeline.md) for provenance/date caveats.\n`);
const versions = {
  frame: 'Browser 3.0.3.29; HDT family',
  hpguide: 'Browser 3.0.3.80; HDT family',
  newmjh: 'Browser 3.0.5.100; HDT family',
  tour30: 'Browser 3.0.3.19; HDT family',
  tour7_91: 'Browser 3.0.3.20c; July-1991 directory label is not an independently verified release date',
  ht30tour: '3.0 Rubidium preview, from source/readme evidence',
  ht30glos: '3.0 Lanthanum tool set, from executable/readme evidence',
  horror: 'Retained browser2; exact release unconfirmed',
  ecs: 'Launcher-only; retained data/tools in ht30glos, not an independent runtime',
};
const versionRows = [];
const storageRows = [];
const mappingRows = [];
for (const [group, names] of Object.entries(collectionGroups)) for (const name of names) {
  const directory = pathMap[name];
  const files = sources.filter(f => f.path.startsWith(directory + '/'));
  const extensions = new Set(files.map(f => f.extension));
  const storage = [];
  if (extensions.has('.fil')) storage.push('loose articles');
  if (files.some(f => path.basename(f.path).toLowerCase() === 'bigfile.tie')) storage.push('classic packed TIE');
  if (extensions.has('.hdt')) storage.push('later HDT');
  if (extensions.has('.elb')) storage.push('ELB indexes');
  if (extensions.has('.stl') || extensions.has('.grb')) storage.push('styles/graphic objects');
  if (extensions.has('.pbb') || extensions.has('.tgf')) storage.push('font/graphics companions');
  if (extensions.has('.fli')) storage.push('animation');
  if (!storage.length) storage.push('launcher/support or unresolved storage');
  const collection = `[${name}](../${uri(directory)}/README.md)`;
  versionRows.push(`| ${collection} | ${versions[name] ?? 'Exact release unconfirmed; storage dialect alone is not a version number'} | ${storage.join(', ')} |`);
  storageRows.push(`| ${collection} | ${storage.join(', ')} | ${[...extensions].sort().map(ext => {
    const slug = ext === '(none)' ? 'extensionless' : ext.slice(1);
    return `[\`${ext}\`](file-types/${slug}.md)`;
  }).join(', ')} |`);
  mappingRows.push(`| \`${name}/\` | [\`${directory}/\`](../${uri(directory)}/README.md) | ${group} |`);
}
write('docs/by-version.md', `# Collections by runtime/version evidence\n\n[Collection catalog](collections.md) · [Storage view](by-storage.md)\n\nVersion labels below distinguish executable/readme evidence from inference. Article trailers, storage dialect and runtime version are different facts. No compatibility tests of historical executables have been performed; related corpora may contain multiple dialects. Missing duplicated browsers do not establish which surviving version will work.\n\n| Collection | Runtime/version evidence | Overlapping storage facets |\n|---|---|---|\n${versionRows.join('\n')}\n\nSee [detailed runtime evidence](../analysis/formats.md) and the [inspection script](../analysis/inspect.mjs) for reproducible static research. Uncertain editions remain uncertain rather than being forced into a version directory.\n`);
write('docs/by-storage.md', `# Collections by storage and format\n\n[Collection catalog](collections.md) · [Version view](by-version.md) · [All file types](file-types/README.md)\n\nThese are non-exclusive presence facets, not promises that every record is decoded. Each original file stays in its collection; links expose alternative navigation without duplicate trees.\n\n| Collection | Storage facets | Present publication suffixes / definitions |\n|---|---|---|\n${storageRows.join('\n')}\n`);
write('docs/layout.md', `# Layout and original-path map\n\n[Repository](../README.md) · [Collections](collections.md)\n\n## Layers\n\n- [corpus/](../corpus/README.md): intact historical collections, grouped by broad subject.\n- [reference/](../reference/README.md): manuals and later museum documents.\n- [docs/](README.md): human-facing interpretation, catalogs and overlapping views.\n- [analysis/](../analysis/README.md): inventory, provenance, research and access generators.\n- [tools/](../tools/README.md): shared browser/Node TypeScript byte readers.\n- [manifests/](../manifests/README.md): publication-source SHA-256 and path provenance.\n\nA subject tree is only one route through the collection. [Versions](by-version.md), [storage families](by-storage.md), [file types](file-types/README.md), related editions and recovery notes supply other routes. Do not fragment a database into suffix folders or promote an uncertain version to authoritative taxonomy.\n\n## Moved intact\n\n| Original root path | Current path | Primary group |\n|---|---|---|\n${mappingRows.join('\n')}\n\nReference PDFs/DOCX moved under reference/manuals and reference/museum. The manual's browser-download suffix " (1)" was dropped from its filename; its bytes are unchanged. The [machine-readable mapping](../analysis/layout.mjs) is shared by migration, catalog and verification code. The local relocation journal records every original/retained path, size and SHA-256; it is excluded because it includes operational/private state. The public checksum manifest covers only selected sources.\n\nAll 2,528 retained historical files, including locally excluded state, were hash-verified after relocation. No original article, program, media or settings bytes were rewritten. Modern navigation was regenerated. Historical launchers retain their internal names/assumptions; some cross-collection references require a future adapter, not mutation of source evidence.\n`);
write('manifests/README.md', '# Publication-source manifests\n\n[Layout and provenance map](../docs/layout.md)\n\n[SHA256SUMS](SHA256SUMS) covers retained publication-candidate historical sources and reference documents, not new navigation or tools. Paths are relative to the repository root. Regenerate with `node analysis/document-layout.mjs` after regenerating `analysis/inventory.json`. The generator reads and verifies each source against inventory before writing checksums.\n');
for (const f of sources) {
  const digest = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, f.path))).digest('hex');
  if (digest !== f.sha256) throw new Error(`Inventory is stale: ${f.path}`);
}
write('manifests/SHA256SUMS', sources.map(f => `${f.sha256}  ${f.path}\n`).join(''));
write('INDEX.md', '# Repository index\n\n- [Welcome and guided tour](docs/README.md)\n- [Historical corpus](corpus/README.md)\n- [Reference documents](reference/README.md)\n- [All collections](docs/collections.md)\n- [Version/runtime view](docs/by-version.md)\n- [Storage/format view](docs/by-storage.md)\n- [File types and population histogram](docs/file-types/README.md)\n- [Layout and original-path map](docs/layout.md)\n- [Research and analysis](analysis/README.md)\n- [Shared TypeScript tools](tools/README.md)\n- [Code architecture: Node and browser](docs/architecture.md)\n- [Future NeWS/webtop integration](docs/future-integration.md)\n- [Source checksums](manifests/README.md)\n');
write('GLANCE.yml', 'what: HyperTIES historical corpus and modern restoration toolkit.\nstatus: recovering\ninterfaces:\n  overview: README.md\n  index: INDEX.md\n  corpus: corpus/README.md\n  versions: docs/by-version.md\n  formats: docs/file-types/README.md\n  tools: tools/README.md\n  architecture: docs/architecture.md\n  provenance: docs/layout.md\nconstraints:\n  - Shared tools are platform-independent TypeScript runnable in Node and browsers; Node-only I/O stays in build adapters.\n  - Preserve historical bytes and internal names.\n  - Versions and format facets overlap; unknowns remain explicit.\n  - Family source is included for review, not privacy-certified.\n');
console.log(`Generated layered layout and overlapping version/storage views; verified ${sources.length} published-source hashes.`);
