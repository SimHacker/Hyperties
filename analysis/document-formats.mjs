#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const marker = '<!-- Generated format registry: analysis/document-formats.mjs -->';
const definitions = {
  '.fil': ['bespoke', 'Article records', 'Six little-endian uint32 section offsets, starting at 24, followed by title, preview, body, reference and trailer sections. Five CHIM paths do not satisfy this layout; the suffix alone is not sufficient.', 'Tested subset', 'High', 'P0: extend the existing reader with dialect and encoding fixtures; retain all section bytes.', 'format-definitions.md', 'tools/src/records.ts'],
  '.new': ['bespoke', 'Plus-1.0 packed-range indexes', 'INDEX.NEW begins with +1.0 Index. Pipe-delimited rows hold title, basename, flags, decimal offset/length and aliases. HHO ranges exactly partition BIGFILE.TIE.', 'Tested subset', 'High', 'P0: expand corpus/range validation and preserve control-byte flags.', 'format-definitions.md', 'tools/src/records.ts'],
  '.tie': ['bespoke', 'Classic database family: multiple schemas', 'INDEX.TIE, BIGFILE.TIE, BIGRAPH.TIE, GINDEX.TIE, REFER.TIE and COMMON.TIE have different roles. Never dispatch every .TIE file to one parser.', 'Mixed: tested indexes/LZW and unresolved stores', 'Role-dependent', 'P0: filename/signature dispatch, second book codec, graphics extraction and reference schemas.', 'packed-format.md', 'tools/src/packed.ts'],
  '.p': ['bespoke', 'UPDATE search companion SIG.P', 'The manual identifies SIG.P/SIG.S as UPDATE search outputs. SIG.P samples contain article basenames and repeated numeric fields. This is not Pascal source.', 'Definition placeholder', 'High role; unresolved schema', 'P1: derive record boundaries and cross-check every basename/range against articles and SIG.S.', 'formats.md'],
  '.s': ['bespoke', 'UPDATE search companion SIG.S', 'Paired with SIG.P; binary/bit-packed-looking search data. No verified posting, signature or bit-vector schema yet.', 'Definition placeholder', 'High role; unresolved schema', 'P1: identify bit ordering, search representation and paired lookup behavior.', 'formats.md'],
  '.sys': ['bespoke', 'Hyperties configuration', 'TIES.SYS text samples use key = value for colors and paths. BACK.SYS/BUP.SYS and binary members need separate inspection. Not automatically DOS kernel drivers.', 'Observed text subset', 'High for TIES.SYS text; mixed otherwise', 'P1: lossless settings parser with unknown-key retention and binary dispatch guards.', 'formats.md'],
  '.asc': ['bespoke', 'Author/import text', 'Readable @heading/@Description directives and body markup, sometimes DOS end markers. Single-byte source encoding must be determined per asset.', 'Observed syntax', 'Medium-high', 'P1: import grammar, round-trip fixture and article conversion with byte provenance.', 'formats.md'],
  '.ori': ['bespoke', 'Original/scratch article copy', 'chim/sub/hello.ori has the same six-offset article-shaped header. ORI is a naming convention, not proof of a separate serialization.', 'Observed article-shaped sample', 'Medium', 'P2: validate with the article reader and compare to its related scratch record.', 'formats.md'],
  '.stl': ['bespoke', 'Stylesheet definitions', 'Text examples use BACKGROUND, TEXTWINDOW, SHORTDESCRIPTION, SIZE, FONT and ACTION blocks. Other files are binary. Not STL 3D meshes.', 'Text observed; binary unresolved', 'High text role', 'P0: parse an AST, validate resources and interpret layout without host-command execution.', 'formats.md'],
  '.grb': ['bespoke', 'Graphic objects and link regions', 'Text examples use FILE/TYPE/SIZE/MODE, named LINK rectangles and ACTION blocks including JUMP TO ARTICLE. Binary variants need their own definition.', 'Text observed; binary unresolved', 'High text role', 'P0: parse regions/actions and connect coordinates to decoded images; preserve unknown operations.', 'formats.md'],
  '.gra': ['bespoke', 'Article/graphic association lists', 'microtou.gra contains * ARTICLE.FIL headings followed by indented names. Exact direction and meaning of associations need corroboration.', 'Definition placeholder', 'Medium', 'P1: parse blocks, resolve names and test against articles/graphics before assigning semantics.', 'formats.md'],
  '.elb': ['bespoke', 'Paged library/index family', 'Binary headers, named keys such as artname and article/link/search filenames suggest indexed libraries. Page layout and key semantics remain incomplete.', 'Definition placeholder', 'Medium role; unresolved schema', 'P0: map headers/pages/keys and validate traversal bounds using multiple corpus samples.', 'formats.md'],
  '.hdt': ['bespoke', 'Later packed knowledge-base data', 'Shared database stems are opened by later launchers. Stores contain readable article/style regions and opaque payload. Record IDs, boundaries and packing are unresolved.', 'Definition placeholder', 'High main-store role', 'P0: recover the later museum database; establish boundaries, codecs and numeric-ID lookup.', 'formats.md'],
  '.hin': ['bespoke', 'Later index companion HIN', 'Paged index/catalog-looking data shares structural clues with ELB. No authoritative expansion of the suffix or complete schema is known.', 'Definition placeholder', 'Medium', 'P0: compare page/key structures with ELB and paired HDT records.', 'formats.md'],
  '.hnc': ['bespoke', 'Later index companion HNC', 'Headers and key-family strings suggest a related catalog/index. Exact fields and lookup relationship remain unresolved.', 'Definition placeholder', 'Medium', 'P0: map keys and records to the common database stem; do not guess the acronym.', 'formats.md'],
  '.huc': ['bespoke', 'Later index companion HUC', 'Related paged index-looking store. Shared structure does not prove identical key semantics.', 'Definition placeholder', 'Medium', 'P0: validate page traversal and resolve key relationships against HDT/HIN/HNC.', 'formats.md'],
  '.hln': ['bespoke', 'Database title/logical-name companion', 'Small files contain readable database titles, with NUL termination in samples, including the AT&T guide title.', 'Observed sample layout', 'Medium-high', 'P1: define termination, encoding and trailing-byte rules across all samples.', 'formats.md'],
  '.hff': ['unknown', 'Binary companion HFF', 'Repeated small-integer structures are observed. Exact table role and field widths are unknown.', 'Definition placeholder', 'Unresolved', 'P1: compare tables to article/font/resource counts in each paired database.', 'formats.md'],
  '.hsd': ['unknown', 'Binary companion HSD', 'Repeated integer-like structures; exact schema and purpose unconfirmed. Keep with its common stem.', 'Definition placeholder', 'Unresolved', 'P1: differential inspection across related tour editions and paired stores.', 'formats.md'],
  '.hol': ['unknown', 'Outline-like companion HOL', 'Contains headings/outline-like strings and, in samples, DOS directory-like names. Outline role and possible storage residue are not proven. Not a confirmed Windows INF.', 'Definition placeholder', 'Unresolved', 'P1: separate active records from unused bytes before interpreting or exporting.', 'formats.md'],
  '.pbb': ['bespoke', 'Bitmap fonts', 'Stylesheet FONT references and names such as BIT7X14.PBB establish font use. Compact headers and glyph-shaped payload are not fully decoded.', 'Definition placeholder', 'High role; unresolved encoding', 'P1: parse metrics/glyphs, render an atlas and compare known character shapes.', 'formats.md'],
  '.tgf': ['unknown', 'Font/graphics-related binary companion', 'Occurs in stylesheet-rich databases; sample bytes include repeated screen-cell-looking values. Filename/context alone do not establish a font schema.', 'Definition placeholder', 'Unresolved', 'P1: identify whether cells, glyphs or graphics are stored; test dimensions and encoding.', 'formats.md'],
  '.pal': ['bespoke', 'Palette companion', 'Small binary tour companions are inferred to contain palettes. Channel layout and numeric scaling have not been verified.', 'Definition placeholder', 'Medium-low', 'P1: pair with cover images; verify channel order and VGA scaling against displayed colors.', 'formats.md'],
  '.pic': ['unknown', 'Legacy picture data', 'CHIM and microtour binary images have no established standard subtype. PIC is ambiguous and must not be treated as PCX automatically.', 'Definition placeholder', 'Unresolved', 'P1: investigate dimensions, planes, compression and graphics-mode references.', 'formats.md'],
  '.prf': ['unknown', 'Pascal-demo binary companion', 'pascal/p.prf is 313 bytes with repeated 07..00 sequences and a small header. Preferences-like role is only a hypothesis.', 'Definition placeholder', 'Unresolved', 'P2: correlate bytes with colors/display/options; retain until role is established.', 'formats.md'],
  '.set': ['bespoke', 'Runtime/editor settings', 'Text settings include editor, edits filename, username, date format and options. Currently Git-ignored as per-user state, not deleted.', 'Observed text', 'High', 'P2: document key grammar and create synthetic fixtures without copying personal state.', 'publication-review.md'],
  '.msg': ['bespoke', 'Runtime message catalogs', 'Text examples contain three-digit message numbers followed by a colon and diagnostic text. These are not Outlook email files.', 'Observed text', 'High', 'P1: parse message IDs and compare catalogs to runtime versions/error behavior.', 'formats.md'],
  '.rfs': ['bespoke', 'HP-named printer stream', 'Contains PCL typography/rules and readable support text. RFS is an application-specific filename convention here, not an identified general document standard.', 'Observed PCL payload', 'Medium-high', 'P2: interpret using a PCL reader; preserve commands and compare rendered print output.', 'formats.md'],
  '.pcx': ['standard', 'PC Paintbrush images', 'PCX signatures and headers identify multiple CGA/EGA/VGA modes, bit depths and planes. Header validation still matters.', 'Recognized standard', 'High', 'P0: decode planes/RLE/palettes to pixels; compare lossless PNG access derivatives.', 'formats.md'],
  '.pcc': ['standard', 'PCX images under PCC suffix', 'Observed signatures identify PCX despite the unusual extension. Use the PCX schema, not a new invented PCC codec.', 'Recognized standard payload', 'High', 'P0: route through validated PCX decoding and test all mode variants.', 'formats.md'],
  '.hph': ['standard', 'PCX image under HPH suffix', 'hpguide/guide.hph is identified as PCX. Despite its common stem this companion is not an unidentified index.', 'Recognized standard payload', 'High', 'P0: use the PCX decoder and validate image dimensions/planes.', 'formats.md'],
  '.tif': ['standard', 'TIFF image', 'ACM/COVER.TIF is a TIFF alternative rendition. Pixel equivalence to a PCX cover is not yet established.', 'Recognized standard', 'High', 'P2: decode with established tooling and compare pixels before deduplicating renditions.', 'formats.md'],
  '.gif': ['standard', 'GIF images', 'Museum still-image samples identify as GIF87a. Similar basenames do not prove equivalence to FLI animation.', 'Recognized standard', 'High', 'P1: decode indexed pixels/palettes and preserve still-versus-animation roles.', 'formats.md'],
  '.fli': ['standard', 'Autodesk Animator FLI', 'Museum samples are 320x200, 8-bit, 20-frame animations. Frame changes, palettes and timing matter.', 'Recognized standard', 'High', 'P1: decode frame deltas and timing; compare access animations frame-by-frame.', 'formats.md'],
  '.pcl': ['standard', 'HP Printer Command Language', 'ESC-based raster commands in hpguide/hplogo.pcl identify a printer stream.', 'Recognized command family', 'High', 'P2: use a bounded PCL interpreter for access previews rather than sending to a printer.', 'formats.md'],
  '.arc': ['standard', 'Classic ARC archive, method 8', 'Header inspection finds 33 members, dynamic-LZW method 8 and CRC16 fields. Names/sizes match loose candidates; decompression/hash equivalence remains unverified.', 'Header inspection only', 'High container; unverified contents', 'P1: implement/adapt a real method-8 decoder; validate length and CRC16 before deduplication.', 'formats.md', 'analysis/inspect.mjs'],
  '.zip': ['standard', 'ZIP distribution archives', 'Three surveyed ZIPs were removed after stored/deflated member length, CRC32 and hash comparisons showed no unique substantive payload; exceptions were AppleDouble metadata.', 'Verified historical survey; packaging removed', 'High', 'Complete survey reader exists; use for future imports with path and decompression limits.', 'formats.md', 'analysis/analyze.mjs'],
  '.exe': ['standard', 'DOS MZ executables', 'Retained executables are DOS MZ, not Windows PE. Some carry executable-compression notices. Distinct programs are algorithm/format evidence, not modern build dependencies.', 'Recognized standard', 'High', 'P2: static headers/strings/disassembly with version hashes; do not execute on the host.', 'formats.md'],
  '.com': ['standard', 'DOS COM program', 'The retained setup.com is a DOS program identified by context; COM has no universal magic header.', 'Recognized by context', 'Medium-high', 'P2: static inspection for configuration/algorithm evidence, not host execution.', 'formats.md'],
  '.bat': ['standard', 'DOS batch launchers', 'CRLF command text preserves working directories, display switches, database stems and media actions. Deduplication means some launchers no longer have a local browser.', 'Recognized command language', 'High', 'P1: parse dependencies without execution and document corpus/runtime mappings.', 'collections.md'],
  '.pdf': ['standard', 'PDF reference documents', 'Manual and museum image PDFs are later access/reference documents. Extracted/OCR text is lossy evidence; source PDF remains authoritative.', 'Recognized standard', 'High', 'Use established metadata/text/image tools; retain page provenance and OCR uncertainty.', 'formats.md'],
  '.docx': ['standard', 'Office Open XML document', 'ZIP-based Wordprocessing XML with body and core creator/date properties. Later museum text/provenance document.', 'Recognized standard', 'High', 'Use existing OOXML readers; preserve attribution and distinguish document dates from corpus dates.', 'timeline.md'],
  '.doc': ['standard', 'Plain text under DOC suffix', 'The retained ht30glos/readme.doc is ASCII text, not binary Microsoft Word. Original survey copies were consolidated.', 'Recognized text payload', 'High', 'Display as text with original encoding/line breaks; no Word decoder needed.', 'formats.md'],
  '.txt': ['standard', 'Text, help and control-bearing scripts', 'Mixed prose, fixed-width help/screens, imported content and playback-related text. Some members are not clean Unicode or plain prose.', 'Mixed text conventions', 'Medium', 'P1: explicit byte/encoding profiles and screen-text handling; do not strip control bytes blindly.', 'formats.md'],
  '.md': ['standard', 'Markdown documentation', 'Original root stub plus modern authored guides. New generated navigation is excluded from historical-source counts.', 'Recognized standard', 'High', 'Validate relative links and preserve original-versus-modern provenance.', 'import-process.md'],
  '.lnk': ['standard', 'Windows shell shortcut', 'Unrelated music shortcut with host/local-path metadata. Retained locally, excluded from publication.', 'Recognized standard', 'High', 'No restoration tool priority; static metadata inspection only if provenance is needed.', 'publication-review.md'],
  '.pif': ['standard', 'Windows DOS launch settings', 'Historical Windows Program Information File launch settings, not article content. Excluded from publication.', 'Recognized standard', 'High', 'Low priority: static launch-setting extraction only if emulator configuration is needed.', 'formats.md'],
  '.log': ['bespoke', 'Browsing and authoring logs', 'Interaction and import diagnostics, including family browsing logs and repeated tour logs. Text does not imply a standardized log schema.', 'Observed; excluded operational state', 'High role', 'No access export priority; summarize diagnostic behavior without publishing private logs.', 'publication-review.md'],
  '.$$$': ['unknown', 'Search scratch files', 'Search-temporary files are zero or 128 bytes in samples. Serialization/behavior has not been defined; currently excluded.', 'Definition placeholder; operational scratch', 'Medium role; unresolved schema', 'P3: inspect only if reconstructing search requires it; use synthetic fixtures.', 'formats.md'],
  '(none)': ['unknown', 'Extensionless files and dotfiles', 'A heterogeneous bucket: launch/media scripts, readme, contents, preface, extensionless logs and historical Finder metadata. Not one file format.', 'Per-file dispatch required', 'Mixed', 'P1: classify by content and referencing launcher; never delete all extensionless files.', 'formats.md'],
};
const dialects = {
  'index-tie': ['INDEX.TIE legacy index', 'Entry/File tagged-column headers; pipe-delimited title, basename, status and aliases; terminal 0x19/0x1a allowed only at end. No assumed packed offset/length columns.', 'Tested subset', 'format-definitions.md', 'tools/src/records.ts', 'P0: document status bits and unsupported binary index variants.'],
  'bigfile-tie': ['BIGFILE.TIE packed articles', 'For the verified classic codec, each indexed record has 12 raw header bytes followed by LSB-first LZW, clear=256/end=257, widths 9..12 and dictionary start=258. 218 HHO records decode; 30 use an unresolved second codec. 49 ACM comparisons match loose originals.', 'Tested subset; second codec unresolved', 'packed-format.md', 'tools/src/packed.ts', 'P0: identify the second codec without assuming unsupported records are raw or corrupt.'],
  'bigraph-tie': ['BIGRAPH.TIE packed graphics', 'Name and companion context suggest packed graphics. Boundaries, codec and image correspondence remain unresolved.', 'Definition placeholder', 'formats.md', '', 'P0: pair with GINDEX.TIE and recover images with length/pixel validation.'],
  'gindex-tie': ['GINDEX.TIE graphics index', 'Graphics-related index role is suggested by names and companion stores. Exact field layout is not yet defined.', 'Definition placeholder', 'formats.md', '', 'P0: identify keys/ranges and validate against BIGRAPH.TIE and loose images.'],
  'refer-tie': ['REFER.TIE authoring references', 'The manual identifies reference/editing data as unnecessary once editing is finished. Serialization and relation to article reference sections still need definition.', 'Definition placeholder', 'formats.md', '', 'P1: compare references with article link order and authoring behavior.'],
  'common-tie': ['COMMON.TIE shared/runtime data', 'Shared/runtime role is tentative. Other named TIE stores also occur; neither basename nor suffix establishes a schema.', 'Definition placeholder', 'formats.md', '', 'P1: compare cross-corpus shared bytes and identify consumers before interpreting fields.'],
};
const ignoredRoots = new Set(['.git', 'analysis', 'tools', 'docs', 'manifests']);
const navigation = new Set(['README.md', 'INDEX.md', 'GLANCE.yml', '.gitignore', '.gitattributes']);
const sourceFiles = [];
function walk(relative = '') {
  for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
    if ((!relative && !['corpus', 'reference'].includes(entry.name)) || navigation.has(entry.name)) continue;
    const p = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile()) sourceFiles.push(p);
  }
}
walk();
const git = spawnSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root, encoding: 'utf8' });
if (git.status !== 0) throw new Error(git.stderr);
const published = new Set(git.stdout.split('\0').filter(Boolean));
const groups = new Map(Object.keys(definitions).map(ext => [ext, []]));
for (const p of sourceFiles) {
  const ext = path.posix.extname(p).toLowerCase() || '(none)';
  if (!groups.has(ext)) throw new Error(`New source suffix needs a registry definition: ${ext}`);
  groups.get(ext).push(p);
}
const uri = p => p.split('/').map(s => encodeURIComponent(s).replaceAll('(', '%28').replaceAll(')', '%29')).join('/');
const slug = ext => ext === '(none)' ? 'extensionless' : ext === '.$$$' ? 'search-scratch' : ext.slice(1);
const outputs = new Map();
function page(title, kind, observation, status, confidence, action, analysis, code, examples, extra = '') {
  return `${marker}\n# ${title}\n\n[All file types](README.md) · [Format overview](../formats.md)\n\n| Property | Current assessment |\n|---|---|\n| Classification | ${kind} |\n| Definition status | ${status} |\n| Confidence | ${confidence} |\n\n## Identification and observed structure\n\n${observation}\n\nThis is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.\n\n## Analysis and implementation\n\n- [Detailed analysis](../../analysis/${analysis})\n${code ? `- [Existing implementation](../../${code})\n` : '- No dedicated verified decoder is registered yet.\n'}${extra}\n## Retained publication examples\n\n${examples.length ? examples.slice(0, 6).map(p => `- [${p}](../../${uri(p)})`).join('\n') : 'No retained publication example. This type was found during the survey but its files are removed packaging or currently excluded operational state.'}\n\n## Tool work item\n\n${action}\n\n## Definition work still required\n\n- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.\n- Record text encoding, control bytes and units separately from storage structure.\n- Separate observed fields from inferred meaning; retain unknown bytes/commands.\n- Add a minimal synthetic fixture and real-corpus checks before claiming support.\n- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.\n- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.\n\nFuture format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.\n`;
}
const rows = [];
const populations = [];
for (const [ext, [kind, title, observation, status, confidence, action, analysis, code]] of Object.entries(definitions)) {
  const files = groups.get(ext).sort();
  const included = files.filter(p => published.has(p));
  const bytes = included.reduce((n, p) => n + fs.statSync(path.join(root, p)).size, 0);
  const extra = ext === '.tie' ? '\n### Named schemas\n\n' + Object.entries(dialects).map(([id, d]) => `- [${d[0]}](${id}.md)`).join('\n') + '\n' : '';
  outputs.set(`docs/file-types/${slug(ext)}.md`, page(`${ext}: ${title}`, kind, observation, status, confidence, action, analysis, code, included, extra));
  rows.push(`| [\`${ext}\`](${slug(ext)}.md) | ${kind} | ${files.length} | ${included.length} | ${bytes} | ${status} |`);
  populations.push({ ext, kind, onDisk: files.length, count: included.length, bytes });
}
for (const [id, [title, observation, status, analysis, code, action]] of Object.entries(dialects)) {
  const basename = id.replace('-tie', '.tie');
  const examples = sourceFiles.filter(p => published.has(p) && path.posix.basename(p).toLowerCase() === basename).sort();
  outputs.set(`docs/file-types/${id}.md`, page(title, 'bespoke', observation, status, status.startsWith('Tested') ? 'High for supported subset' : 'Unresolved schema', action, analysis, code, examples));
}
outputs.set('docs/file-types/README.md', `${marker}
# File-type registry: standards, bespoke formats and unknowns

[Welcome](../README.md) · [Format overview](../formats.md) · [Collections](../collections.md)

**[File-type population histogram](population.md)**: all types ranked by count,
with a linear-scale chart, exact populations, percentages and byte totals.

This index covers **all 50 suffix categories found in the original survey**,
including removed ZIP packaging and excluded operational files. Each category
has a linked working definition/research page; unresolved formats have explicit
tool work items rather than invented specifications. Named TIE schemas have
separate pages because extensions are not schemas.

**Standard** means a recognized standard payload or language (including PCX
under PCC/HPH and plain text under DOC). **Bespoke** means Hyperties/application
conventions or serialization. **Unknown** means identification or role remains
unresolved, not corrupt or useless. Definition status is separate from format
classification: a recognized ARC archive can still lack a working decoder here.

Counts below are **current retained historical-source paths**, not unique
contents or original pre-dedup totals. "On disk" includes Git-ignored state;
"Publication" follows Git's candidate list and ignore rules. New navigation,
analysis, documentation and tool trees are excluded. Removed categories have
zero current paths; no links expose ignored logs, settings or removed files.

| Suffix | Classification | On disk | Publication | Publication bytes | Definition status |
|---|---|---:|---:|---:|---|
${rows.sort().join('\n')}

## Named schemas and non-suffix layers

${Object.entries(dialects).map(([id, d]) => `- [${d[0]}](${id}.md): ${d[2]}.`).join('\n')}
- [INDEX.NEW](new.md) has its own range-bearing dialect.
- [Article markup and link semantics](../../analysis/format-definitions.md) are embedded languages, not separate suffixes.
- [Encoding evidence](../../analysis/format-definitions.md): Latin-1 inspection is reversible byte viewing, not proof of source encoding; CP437/Japanese profiles need per-asset validation.
- [Extensionless files](extensionless.md) include museum playback scripts and prose, not one uniform format.
- AppleDouble records and Finder .DS_Store metadata were found and removed. AppleDouble was also present inside ZIPs; these are standard host metadata, not Hyperties formats.
- Modern authored files use Markdown, YAML, TypeScript, JavaScript ES modules, JSON, HTML and Git control files. They are infrastructure, not newly discovered historical codecs.

## Tool priorities

1. **P0:** extend tested articles/indexes, recover the second book codec, later HDT/index family and packed graphics; implement PCX and stylesheet/graphic-region access.
2. **P1:** search structures, fonts, palettes, animations, ARC verification, imports and encoding-aware access.
3. **P2/P3:** print reconstruction, static runtime evidence and scratch/settings investigation only when needed.

Priority is a proposed restoration work order, not an implementation claim.
The [tools guide](../../tools/README.md) lists currently working readers/tests.
Every definition page links its supporting analysis and any existing implementation.

Regenerate with \`node analysis/document-formats.mjs\`; verify exact generated
content and local links with \`node analysis/document-formats.mjs --check\`.
The generator needs neither private pre-cleanup manifests nor a TypeScript build.
It fails on new source suffixes so additions cannot silently disappear from the index.
`);
populations.sort((a, b) => b.count - a.count || a.ext.localeCompare(b.ext));
const total = populations.reduce((n, p) => n + p.count, 0);
const totalBytes = populations.reduce((n, p) => n + p.bytes, 0);
const diskTotal = populations.reduce((n, p) => n + p.onDisk, 0);
const maximum = Math.max(1, ...populations.map(p => p.count));
const histogramRows = populations.map(p => `| [\`${p.ext}\`](${slug(p.ext)}.md) | ${p.count} | ${total ? (100 * p.count / total).toFixed(2) : '0.00'}% | ${p.onDisk} | ${p.bytes} |`).join('\n');
outputs.set('docs/file-types/population.md', `${marker}
# File-type population histogram

[Complete registry](README.md) · [Collection catalog](../collections.md)

**${total.toLocaleString('en-US')} publication-candidate source files** across
${populations.filter(p => p.count > 0).length} populated suffix categories;
**${totalBytes.toLocaleString('en-US')} logical bytes**. The on-disk source
population is ${diskTotal.toLocaleString('en-US')} files, including excluded state.
All ${populations.length} surveyed categories appear below, even those with zero
current publication candidates.

![Horizontal file-type population histogram, with exact counts; the complete accessible data table follows.](population.svg)

Bars use a **linear count scale**, ranked largest first. Small populations really
are small compared with article records; exact labels and the table remain
readable. No logarithmic scaling, minimum-width inflation or "other" bucket is
used. This is a suffix-frequency distribution, not a histogram of file sizes.

| Type / definition | Publication files | Share of files | On disk | Publication bytes |
|---|---:|---:|---:|---:|
${histogramRows}
| **Total** | **${total}** | **${total ? '100.00' : '0.00'}%** | **${diskTotal}** | **${totalBytes}** |

## Scope and interpretation

- Counts are paths, not unique content hashes; remaining exact copies count individually.
- Extension matching is case-insensitive. Extensionless files are one census
  bucket, not one format; named TIE schemas share the TIE bar.
- Publication follows current Git candidate/ignore rules, not a claim that all
  candidates have already been committed or pushed.
- New navigation, docs, analysis, tools and build outputs are outside this
  historical-source chart. The changing root README is also excluded.
- Ignored logs/settings/scratch are counted on disk only. Removed ZIPs and
  metadata are not resurrected merely to populate a bar.
- File counts and logical byte sizes measure different things: numerous short
  article records need not dominate storage size.
- Rounded per-type percentages may not sum to exactly 100%.

Regenerate both chart and table with \`node analysis/document-formats.mjs\`.
Verify them with \`node analysis/document-formats.mjs --check\`.
`);
const chartHeight = 100 + populations.length * 27;
const bars = populations.map((p, i) => {
  const y = 79 + i * 27;
  const width = (500 * p.count / maximum).toFixed(3);
  return `<text x="85" y="${y + 13}" text-anchor="end">${p.ext}</text><rect x="100" y="${y}" width="${width}" height="18" fill="#286b9c"/><text x="620" y="${y + 13}">${p.count}</text>`;
}).join('\n');
outputs.set('docs/file-types/population.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="710" height="${chartHeight}" viewBox="0 0 710 ${chartHeight}" role="img" aria-labelledby="title description">
<!-- Generated format registry: analysis/document-formats.mjs -->
<title id="title">Historical file-type populations: ${total} publication candidates</title>
<desc id="description">All ${populations.length} surveyed suffix categories, descending by file count on a linear scale. Exact labels accompany every bar. Full data and scope are in population.md.</desc>
<rect width="710" height="${chartHeight}" fill="#ffffff"/>
<g fill="#182b3a" font-family="monospace" font-size="13">
<text x="20" y="25" font-size="17">File-type population: publication candidates</text>
<text x="20" y="48">${total} files | linear scale | maximum ${maximum}</text>
<text x="100" y="68">0</text><text x="600" y="68" text-anchor="end">${maximum}</text>
${bars}
</g></svg>
`);
const check = process.argv.includes('--check');
for (const [relative, content] of outputs) {
  const absolute = path.join(root, relative);
  if (check) {
    if (!fs.existsSync(absolute) || fs.readFileSync(absolute, 'utf8') !== content) throw new Error(`Stale or missing registry page: ${relative}`);
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      const target = path.resolve(path.dirname(absolute), decodeURIComponent(match[1].split('#')[0]));
      if (!fs.existsSync(target)) throw new Error(`Missing link in ${relative}: ${match[1]}`);
    }
  } else {
    if (fs.existsSync(absolute) && !fs.readFileSync(absolute, 'utf8').includes(marker.replace('<!-- ', '').replace(' -->', ''))) throw new Error(`Refusing to overwrite authored page: ${relative}`);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, content);
  }
}
console.log(`${check ? 'Verified' : 'Generated'} ${Object.keys(definitions).length} suffix definitions, ${Object.keys(dialects).length} named schemas, registry and histogram (${outputs.size} files).`);
