#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { relocatedPath } from './layout.mjs';

const here = path.dirname(fileURLToPath(import.meta.url)), root = path.dirname(here);
const descriptions = {
  ACM: ['Computing literature and abstracts', 'Author-indexed computing literature with classification terms and 8604-series identifiers. Separate from the July 1988 CACM hypertext issue.', '49 packed records decode byte-for-byte to their loose originals; an important codec reference corpus.'],
  AIDS: ['Historical health-information library', 'A subject-navigation library covering HIV/AIDS, epidemiology, prevention, laboratory and related information. Historical material, not current medical guidance.', 'No conclusion that this is patient data; packed/image review remains incomplete.'],
  'AIDS/LIBRARY': ['Health-library database payload', 'Articles, subject navigation, images and indexes opened by the parent AIDS launcher.', 'Historical health-information context; do not present as contemporary clinical advice.'],
  'CACM-Hypertext Conference issue July 1988': ['CACM hypertext special section, July 1988', 'Electronic edition of the July 1988 Communications of the ACM special hypertext section, including authored articles, bibliography, portraits and figures.', 'A landmark early hypertext corpus; loose articles preserve original links and markup.'],
  'HHO-Hypertext on Hypertext book-1988': ['Hypertext on Hypertext: 1988 book corpus', 'Packed book database with chapter navigation, concepts, personalities, design examples and the hypertext joke.', 'Crown jewel: all 248 indexed records decoded: 218 LZW and 30 adaptive arithmetic. Exact edition/title to confirm with Ben.'],
  chim: ['Chim and photographic history', 'David Seymour (Chim), Werner Bischof and related photographic history, with imported source text, graphics and scratch examples.', 'Five unsupported/malformed loose-article paths are explicit parser fixtures, not silently repaired.'],
  'chim/sub': ['CHIM scratch and format fixtures', 'Small scratch/import records and duplicates useful for understanding early article formats.', 'Includes a truncated chronology. Preserve useful parser cases; not a polished content edition.'],
  cmsc: ['Computer-science department directory', 'Packed historical faculty/department directory identified by its article index.', 'Historical professional directory; title/index recovery is ahead of full packed export.'],
  cr: ['Computing Reviews classification corpus', 'Packed computing-review and computer-graphics/image-processing classification material.', 'Publisher/author attribution and classification structure should remain with access exports.'],
  ecs: ['ECS dependency evidence', 'Only the historical ECS launcher remains. Its repeated database payload and padding-only tools were consolidated into ht30glos.', 'Do not expect this launcher-only directory to run independently.'],
  family: ['O’Connell–Interdonato family-history hypertext', 'Personal oral-history and genealogy database centered on Denis Andrea O’Connell and Paul Edmond O’Connell, with Irish/Italian ancestry, family narratives and geographic background.', 'Included at the repository owner’s request for Ben’s review before wider sharing. Introduction describes contemporaries in 1990. Creator and relationship to Ben or Don are unconfirmed; a Maryland CLIS connection is only a provenance lead. See ../analysis/family-review.md.'],
  frame: ['AT&T Guide to Frame Relay', 'Later commercial knowledge base using the HDT companion-file family and a distinct 3.0.3.29 browser.', 'Packed structure, outlines and graphics remain format-recovery targets. Per-user settings are excluded.'],
  hat: ['Hypertext access-methods example', 'Launcher and hat-db subdirectory for a database about hypertext access methods and organizers.', 'Exact expansion of HAT is unconfirmed; preserve observed identity rather than invent a name.'],
  'hat/hat-db': ['Access-methods database', 'Packed articles about organizers, conceptual maps, glossaries, indexes and other access methods.', 'Classic index evidence; full decoding/interpretation remains in progress.'],
  hfind: ['Hornbake library finder', 'Library floor directories, maps and institutional navigation material.', 'Graphical wayfinding is part of the content, not merely decoration.'],
  horror: ['Cthulhu in Hypertext', 'Mythos/story bibliography compiled by D. Timothy Burall, with authored articles and a retained browser2 reference program.', 'Historical bibliography and references; source attribution is preserved.'],
  hpguide: ['HP LaserJet 4 Travel Guide', 'HP Explorer/Travel Guide material, packed knowledge base, print streams and browser 3.0.3.80. Not a Hyperties developer guide.', 'PCL/RFS printer-stream examples are distinctive. Per-user settings are excluded.'],
  ht30glos: ['ECS/Ogawa encyclopedia and 3.0 tools', 'Single retained ECS/Ogawa content layout, outer index stores and Lanthanum-era author/browser/UPDATE tools.', 'Readme records a 1990 video-demo variant and bilingual experiments. Tools are research evidence, not a build dependency.'],
  'ht30glos/ogawa': ['Ogawa encyclopedia payload', 'Computer-science/engineering articles, graphical links, styles, fonts and bilingual/Japanese examples.', 'All 264 payload files previously repeated in ECS are retained here once. Numeric article-ID and encoding work remains.'],
  ht30tour: ['Hyperties 3.0 Rubidium preview', 'Readable articles, styles, graphical definitions, fonts and multimedia-preview content.', 'Strong source corpus for the future style/layout interpreter.'],
  htuis: ['User-interface research and hypertext', 'Research/application corpus with short descriptions, links and external-action experiments, including a pointer to the hyper-joke.', 'Has meaningful differences from HTUISM; neither is treated as an exact duplicate.'],
  htuism: ['User-interface multimedia variant', 'Related user-interface corpus with additional/different actions and articles, plus a historical ARC package.', 'Remaining ARC matches loose member names/sizes but has not been decompressed/hash-verified; retained as unresolved evidence.'],
  landscap: ['Landscaping hypertext', 'Amateur landscaping/plants corpus with article and ASC import examples.', 'Small source/encoding fixtures; historical advice, not a current horticulture reference.'],
  microtou: ['Early Hyperties microtour', 'Introduction to hypertext and input interfaces, with articles, graphic-reference lists and legacy picture files.', 'Useful compact format coverage including GRA and unresolved PIC data.'],
  newmjh: ['Later Jewish Heritage and Holocaust database', 'Later museum packed records and companion stores, still images, FLI animation/media actions and browser 3.0.5.100.\n\n## Structure and open questions\n\nThe main store is `ENC.HDT`, with seven companions: HFF, HIN, HLN, HNC, HOL, HSD and HUC. Article boundaries, packing and numeric-ID/index mapping remain unresolved; the article and personal-name counts are not established. Forty-two PCX images, seven GIFs, six FLI animations and three PCC files preserve media and interface evidence. Standard image decoding is distinct from recovering proprietary record/index schemas.\n\nSee the [museum structure, names and lookup survey](../../../analysis/museum-structure.md#later-edition-and-formats-still-to-recover) and [questions for Ben](../../../analysis/museum-structure.md#questions-for-ben). We need authoring exports or schema/source notes, clarification of PCC and graphic regions, external video/media sources, and evidence of the intended physical installation. Do not assume this is identical to the earlier collection or a victim-name registry.', 'Crown jewel: complementary to the earlier loose source, not a redundant copy. Later HDT recovery remains pending.'],
  oldmjh: ['Earlier Jewish Heritage and Holocaust encyclopedia', 'Loose museum articles, aliases and navigation into themes, chronology, questions, culture and Holocaust history.\n\n## Structure, names and lookup\n\nThis is a linked encyclopedia: 402 surviving article files and 478 index rows. Four hundred index rows have loose articles; 78 do not. CHRONOLO and LEARNING survive without index rows. Each article has a heading, short description, body and references, plus two other preserved sections.\n\nThe original help offers an index via EXTRA and word/phrase search via EXTRA then SEARCH. Named subjects can be found among the articles, but a separate victim-name or genealogy registry is not established. A reviewed title-based inventory identifies **102 person-focused entries, all with surviving articles, plus three family-focused entries**. This is not the number of victims or every name mentioned in the text.\n\nPeople include religious and cultural figures, scientists, politicians, resistance activists, rescuers and perpetrators. Other articles cover Jewish beliefs and practices, immigration, organizations, geography, laws, events, ghettos and camps. Four authored themes organize access: The World Before, The Holocaust, The Aftermath and Renewal in America; questions, outlines, timelines and maps provide overlapping paths.\n\nRead the [full structure and linked name inventory](../../../analysis/museum-structure.md), including counting rules and source evidence, and [questions for Ben](../../../analysis/museum-structure.md#questions-for-ben). The modern reader searches titles/aliases, not the original SEARCH implementation.', 'Crown jewel: 402 articles, 478 legacy index entries and 3,548 recognized body links. Public historical information, separate from the personal genealogy.'],
  pascal: ['Linked Pascal quadtree program', 'Sven Dickinson CMSC 420/Samet program fragments presented as linked hypertext articles.', 'Program source embedded in article records, not the Hyperties engine source.'],
  program: ['Packed program-navigation example', 'Procedure index suggests a quadtree/window-navigation example related to the Pascal corpus.', 'Relationship is suggested by names, not yet proven byte/semantic equivalence.'],
  'red-mask': ['The Masque of the Red Death demo', 'Segmented narrative hypertext identified by the packed article index.', 'Preserve text/media attribution separately; simple narrative navigation example.'],
  redsk: ['Historical football-team demo', 'Packed player/personnel material for the Washington football team.', 'Distinct historical demonstration, lower first-phase restoration priority.'],
  rogers: ['Richard Rodgers and musical theater', 'Historical musical-theater articles and biographical navigation.', 'Subject corpus, not private family records; author attribution remains important.'],
  sigchi: ['SIGCHI abstracts database', 'Packed research abstracts and author/descriptor indexes, with notes on creating and ordering the database.', 'Useful literature/index corpus; full access export follows codec recovery.'],
  toronto: ['Cooperative on Information Technology', 'Courses, programs, publications and session material identified by the classic index.', 'Precise event/year remains unconfirmed.'],
  tour30: ['Later 3.0 packed tour', 'Packed tour knowledge base, VGA images, companion indexes and browser 3.0.3.19.', 'Related to TOUR7_91 but 18 same-path files differ; preserve meaningful edition differences.'],
  tour7_91: ['July-1991-labelled Hyperties tour', 'Later packed tour with browser 3.0.3.20c and companion media/indexes.', 'Directory label is not an independently verified release date; compare editions semantically.'],
  usna: ['United States Naval Academy overview', 'Institutional history, admissions and academic-major hypertext.', 'Distinct early institutional demo with links and public-information context.'],
  wine: ['Wine hypertext glossary', 'Packed wine concepts, regions and vocabulary.', 'Generic classic packed corpus useful for additional decoder coverage.'],
};
const marker = '<!-- Generated collection documentation: analysis/document-collections.mjs -->';
const link = p => {
  const prefix = p.match(/^(?:\.\.\/)+/)?.[0] ?? '';
  return (prefix + relocatedPath(p.slice(prefix.length))).split('/').map(s =>
    encodeURIComponent(s).replaceAll('(', '%28').replaceAll(')', '%29')).join('/');
};
function visibleFiles(directory) {
  directory = relocatedPath(directory);
  const result = spawnSync('git', ['ls-files', '--others', '--cached', '--exclude-standard', '-z', '--', directory], { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr);
  return [...new Set(result.stdout.split('\0').filter(Boolean))].filter(p =>
    !['README.md', 'INDEX.md', 'GLANCE.yml'].includes(path.posix.basename(p))).sort();
}
function write(relative, text) {
  relative = relocatedPath(relative);
  const absolute = path.join(root, relative);
  if (fs.existsSync(absolute) && !fs.readFileSync(absolute, 'utf8').includes(marker) && !relative.endsWith('GLANCE.yml')) {
    throw new Error(`Refusing to overwrite hand-edited document: ${relative}`);
  }
  fs.writeFileSync(absolute, text);
}
const catalogRows = [];
for (const [directory, [title, what, status]] of Object.entries(descriptions)) {
  const summary = what.split('\n\n')[0];
  const actualDirectory = relocatedPath(directory);
  const relativeRoot = '../'.repeat(actualDirectory.split('/').length);
  const files = visibleFiles(directory);
  const groups = new Map();
  for (const p of files) {
    const extension = path.posix.extname(p).toLowerCase() || '(none)';
    if (!groups.has(extension)) groups.set(extension, []);
    groups.get(extension).push(p);
  }
  const bytes = files.reduce((sum, p) => sum + fs.statSync(path.join(root, p)).size, 0);
  const children = Object.keys(descriptions).filter(d => path.posix.dirname(d) === directory);
  const related = directory.startsWith('oldmjh') ? ['newmjh'] : directory === 'newmjh' ? ['oldmjh'] :
    directory === 'ecs' ? ['ht30glos'] : directory === 'htuis' ? ['htuism'] : directory === 'htuism' ? ['htuis'] :
    directory === 'tour30' ? ['tour7_91'] : directory === 'tour7_91' ? ['tour30'] :
    directory === 'HHO-Hypertext on Hypertext book-1988' ? ['htuis', 'oldmjh'] : [];
  write(`${directory}/README.md`, `${marker}\n# ${title}\n\n${what}\n\n## Read this directory in layers\n\n- [GLANCE.yml](GLANCE.yml): compact relevance/status summary for LLMs and catalog tools.\n- [INDEX.md](INDEX.md): linked file-level index grouped by format.\n- This README: human context, interpretation and cross-links.\n\n## Recovery status\n\n${status}\n\nThis catalog contains **${files.length} retained files / ${bytes.toLocaleString('en-US')} bytes**, excluding navigation documents and Git-ignored operational/private material. Counts include descendants. Original basenames and bytes are preserved; programs and imported external actions are not executed by the modern readers.\n\n${children.length ? '## Subcollections\n\n' + children.map(c => `- [${descriptions[c][0]}](${link(c.slice(directory.length + 1))}/README.md)`).join('\n') + '\n\n' : ''}${related.length ? '## Related collections\n\n' + related.map(r => `- [${descriptions[r][0]}](${relativeRoot}${link(r)}/README.md)`).join('\n') + '\n\n' : ''}## Context and formats\n\n- [Repository collection catalog](${relativeRoot}docs/collections.md)\n- [Format definitions and recovery](${relativeRoot}docs/formats.md)\n- [Crown-jewel discoveries](${relativeRoot}docs/discoveries.md)\n- [Import and preservation philosophy](${relativeRoot}docs/import-process.md)\n\nInterpretation is based on source headings, indexes, launchers and format evidence; unresolved names/codecs are not silently invented. Historical text and contemporary commentary are separate layers.\n`);
  let index = `${marker}\n# File index: ${title}\n\n[Overview](README.md) · [Glance](GLANCE.yml)\n\nOriginal retained paths grouped by suffix. A suffix is not proof of a schema; see the [format map](${relativeRoot}docs/formats.md). Sizes are logical bytes.\n`;
  for (const [extension, members] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    index += `\n## ${extension}\n\n| File | Bytes |\n|---|---:|\n`;
    for (const p of members) {
      const relative = p.slice(actualDirectory.length + 1);
      index += `| [${relative.replaceAll('|', '\\|')}](${link(relative)}) | ${fs.statSync(path.join(root, p)).size} |\n`;
    }
  }
  write(`${directory}/INDEX.md`, index);
  const glance = `# ${marker}\nstatus: recovering\nwhat: ${JSON.stringify(what)}\nwhy: ${JSON.stringify(status)}\nk_lines:\n  activates:\n    - HYPERTIES\n    - HISTORICAL-HYPERTEXT\n    - ${directory.split('/')[0].toUpperCase().replace(/[^A-Z0-9]+/g, '-')}\ncounts:\n  retained_files: ${files.length}\n  logical_bytes: ${bytes}\nformats: ${JSON.stringify([...groups.keys()].sort())}\ninterfaces:\n  overview: README.md\n  index: INDEX.md\n  format_map: ${relativeRoot}docs/formats.md\nconstraints:\n  - Preserve original byte offsets, basenames and encoding evidence.\n  - Do not execute historical programs or external actions by default.\n  - Report unsupported formats and unresolved links explicitly.\nsee_also:\n  - ${relativeRoot}docs/collections.md\n  - ${relativeRoot}docs/import-process.md\n`;
  write(`${directory}/GLANCE.yml`, glance);
  if (!directory.includes('/')) catalogRows.push(`| [${title}](${link(`../${actualDirectory}/README.md`)}) | ${files.length} | ${summary} |`);
}
const overview = `<!-- Generated collection catalog: analysis/document-collections.mjs -->\n# Collection catalog\n\n[Start here, Ben](README.md) · [Format map](formats.md) · [Import process](import-process.md)\n\nEach collection has a **GLANCE.yml → README.md → INDEX.md** reading path: quick relevance, context, then source-level navigation. Originals retain their historical names and byte structure. The family-history source is included for Ben’s review at the owner’s request; operational logs remain excluded. See the [family provenance and review notes](../analysis/family-review.md).\n\n| Collection | Retained source files | Description |\n|---|---:|---|\n${catalogRows.join('\n')}\n\n## Root reference documents\n\n- [Hyperties 2.3 user manual](../Hyperties%20User%20Manual.pdf): scanned/OCR operation and authoring reference, 179 pages.\n- [Museum texts and provenance](../oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx): later attributed access document.\n- [Museum images](../oldmjh-images.pdf): later 13-page image access document.\n- [Shared TypeScript format tools](../tools/README.md).\n- [Detailed analysis and definitions](../analysis/README.md).\n\nNames and subject matter are historical catalog context, not blanket endorsement of dated claims. The museum is public historical information, separate from the personal family-history database.\n`;
  fs.writeFileSync(path.join(root, 'docs/collections.md'), overview.replaceAll('../Hyperties%20User', '../reference/manuals/Hyperties%20User').replaceAll('../oldmjh-', '../reference/museum/oldmjh-'));
console.log(`Documented ${Object.keys(descriptions).length} directories with GLANCE.yml, README.md and INDEX.md.`);
