# Collection guide

This is predominantly **authored hypertext data, media, packaged databases, and executable tools**, not a conventional Hyperties implementation-source repository. There are no `.c`, `.h`, `.pas`, or `.asm` source files in the file-extension census. The [Pascal collection](../corpus/program-examples/pascal) does contain source code embedded in hypertext articles; [program](../corpus/program-examples/program) appears related by procedure names.

Topics below are inferred from article headings, index entries, launchers, embedded executable strings, or the supplied directory names. They are not all authenticated catalog descriptions. Exact paths and every contained filename are in the local `directory map` and `inventory`. You have confirmed Ben owns the Cognetics rights; this analysis treats that as supplied authorization, not a blocker. Personal material and third-party publications/images are reviewed separately.

## Highest restoration priority

| Directory | What it is / evidence | Why useful |
|---|---|---|
| [CACM-Hypertext Conference issue July 1988](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988) | Extracted Hyperties/IBM-PC files for ACM's Fall 1988 *Hypertext on Hypertext*, based on the July 1988 CACM special section; [introduction](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/introduc.fil) names the section. Its 307 parsed article files match Nielsen's 1989 report of 307 nodes. He says the database added the IRIS hypertext bibliography and Hypertext '87 trip-report excerpts, and that figures were redrawn for CGA. No raw floppy image. | The retained PC version of one of ACM's three platform-specific implementations; concrete early hypertext interface and excellent 2.x parser/rendering target. Distinct from the computing-literature corpus in the `ACM` directory. |
| [HHO-Hypertext on Hypertext book-1988](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988) | Legacy folder name; 248-record IBM-PC *Hypertext Hands-On!* companion database, strongly matched by its epilog and official book/package description. | Important packed-format and publication target. Exact disk provenance is unverified; loose `.TXT` files are often screen graphics, not an export of the book. |
| [ht30tour](../corpus/hyperties-demos/ht30tour) | 3.0 preview; loose articles, styles, graphics, font assets; browser identifies itself as Rubidium. | Best readable example of 3.0 style/graphic scripting and multimedia interfaces. |
| [tour30](../corpus/hyperties-demos/tour30), [tour7_91](../corpus/hyperties-demos/tour7_91) | Later packed 3.0 tours with `.HDT` companion stores and VGA media; launchers select `about`. Versions 3.0.3.19 and 3.0.3.20c. | Demonstrate later runtime/data family. Compare editions before consolidating. |
| [ht30glos](../corpus/hyperties-demos/ht30glos), [ecs](../corpus/hyperties-demos/ecs) | Computer-science/engineering encyclopedia demo including Japanese/bilingual examples and Lanthanum 3.0 tools. ECS now retains only its launcher, pointing into `..\ht30glos\ogawa`. | 3.0 editing/indexes/fonts, rich styles, graphical links and multilingual encoding. Repeated payload and padding-only tools have been removed. |
| [htuis](../corpus/hyperties-demos/htuis), [htuism](../corpus/hyperties-demos/htuism) | User-interface research/application hypertext; external program actions and multimedia-related variants. | Valuable behavior examples for a modern reincarnation. Keep meaningful differences, not two full repeated distributions. |
| [microtou](../corpus/hyperties-demos/microtou) | Introduction to Hyperties/hypertext, pointing devices and computer interfaces; has `.GRA`, `.PIC`, graphics and articles. | Useful early format coverage and compact demo. |
| [pascal](../corpus/program-examples/pascal) | Sven Dickinson's CMSC 420 / Samet quadtree program presented as linked articles; source fragments in `.FIL`. | Direct source-like material and semantic navigation test corpus. Not the Hyperties engine source. |
| [program](../corpus/program-examples/program) | Packed program-navigation example; index names include ANGLE, window-list and quadtree-related procedures. | Possible packed counterpart or related edition of Pascal example. Not yet decoded enough to prove equivalence. |
| [oldmjh](../corpus/museum/oldmjh), [newmjh](../corpus/museum/newmjh) | Museum/Jewish-history databases; old form has editable articles, later form has packed 3.0.5 content and map animations. [2022 text document](../reference/museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx) attributes late-1980s project texts to Marsha Rozenblit and a student. | Historically important content and cross-generation format/media tests. Old/new are not proven duplicates. Sensitive historical subjects are not automatically private personal data; review factual/bibliographic rights separately. |

## Other distinct databases

| Directory | Interpretation / evidence | Priority |
|---|---|---|
| [ACM](../corpus/books-and-literature/ACM) | Author-indexed computing literature/abstract entries with classification terms and `8604-...` identifiers; [contents](../corpus/books-and-literature/ACM/CONTENT.FIL). | Medium; separate from the CACM issue. |
| [AIDS](../corpus/subject-and-institutional/AIDS) | Library under [LIBRARY](../corpus/subject-and-institutional/AIDS/LIBRARY); subject areas include epidemiology, HIV/AIDS, laboratory, prevention and STD. | Medium; historical health information, not suitable as present-day medical advice. No conclusion that this is clinical patient data; packed/media contents still need review. |
| [chim](../corpus/subject-and-institutional/chim) | David Seymour ("Chim"), Werner Bischof and photographic history. Includes imported text, images, conversion utility and scratch files. | Medium; strong image-rights issue; useful older graphics/import examples. |
| [cmsc](../corpus/subject-and-institutional/cmsc) | University computer-science faculty/department directory; packed index lists faculty names. | Low-medium; public historical directory context, not automatically confidential. |
| [cr](../corpus/books-and-literature/cr) | Computing Reviews/classification material on computer graphics and image processing. | Medium; packed literature corpus, publisher rights. |
| [frame](../corpus/subject-and-institutional/frame) | AT&T's Guide to Frame Relay, confirmed by `.HLN` database title; 3.0.3.29 runtime. | Low-medium for initial corpus; useful commercial use and `.H*` family. |
| [hat](../corpus/hyperties-demos/hat), [hat/hat-db](../corpus/hyperties-demos/hat/hat-db) | Hypertext access/authoring-oriented example: access methods, organizers, maps, glossaries, indexes in article index. Full expansion of HAT unconfirmed. | Medium; useful concepts, packed content. |
| [hfind](../corpus/subject-and-institutional/hfind) | Hornbake library finder with floor directories/maps and director's message. | Medium; graphical navigation case. |
| [horror](../corpus/books-and-literature/horror) | "Cthulhu in Hypertext", compiled by D. Timothy Burall; mythos/story bibliography. | Low; interesting subject corpus, rights not automatically public domain. |
| [hpguide](../corpus/subject-and-institutional/hpguide) | HP LaserJet 4 Travel Guide/Explorer, not a Hyperties developer manual. [README](../corpus/subject-and-institutional/hpguide/readme.txt) describes Setup, remote printer controls, DOS requirements and Guide. | Low initial priority; strong printer/PCL examples, 3.0.3.80 runtime. |
| [landscap](../corpus/subject-and-institutional/landscap) | Amateur landscaping/plants; `.ASC` import examples, browser2 and article corpus. | Low; small encoding/import fixture source. |
| [red-mask](../corpus/books-and-literature/red-mask) | Segmented *The Masque of the Red Death* from packed article index. | Low; simple narrative link demo. Text and illustrations must be assessed separately for rights. |
| [redsk](../corpus/subject-and-institutional/redsk) | Washington football team player/personnel database; article-index names identify topic. | Low; historical demo, not restoration-critical. |
| [rogers](../corpus/subject-and-institutional/rogers) | Richard Rodgers / American musical theater history. | Low; bibliographic/historical corpus. |
| [sigchi](../corpus/books-and-literature/sigchi) | SIGCHI abstracts database; index includes author/descriptor indexes, creation process and ordering information. | Medium; research corpus and packed format. |
| [toronto](../corpus/subject-and-institutional/toronto) | Cooperative on Information Technology (CIT): courses, programs, publications and conference/session material. | Low-medium; precise event/year not established. |
| [usna](../corpus/subject-and-institutional/usna) | Overview of United States Naval Academy, admissions/academic majors and institutional history. | Low; institutional demo. |
| [wine](../corpus/subject-and-institutional/wine) | Wine encyclopedia/glossary; packed index terms include aging, aperitifs, regions, body. | Low; generic packed corpus. |
| [family](../corpus/personal-history/family/README.md) | O'Connell–Interdonato personal family-history hypertext. Omitted from the separate minus-family distribution; reason unknown. | Included at the owner's request for Ben's review; logs excluded. [Provenance/privacy questions remain open](family-review.md). |

## Wrappers, documents and incidental files

- Former `HypertiesDatabases-minusFamily`: redundant second distribution with short `cacm` / `hho` aliases and three ZIPs; removed with approval. See [import record](import-process.md).
- [User manual PDF](../reference/manuals/Hyperties%20User%20Manual.pdf): 179-page OCR/scanned Hyperties 2.3 author/user manual; strong format and operation evidence, not 3.0 schema documentation. Scan metadata dates to 2019. Good candidate for ordinary Git given your confirmation of Ben's rights.
- [oldmjh images PDF](../reference/museum/oldmjh-images.pdf): 13-page, 2022 image-conversion document, only 202,312 bytes. A convenient access copy/contact-sheet-like aid, not demonstrably redundant with original PCX images at this stage.
- [oldmjh text DOCX](../reference/museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx): later text/provenance access document, 22,399 bytes. Keep locally; content and creator metadata reviewed separately.
- [root README](../README.md): initial repository stub only.
- `.DS_Store`, the HHO music shortcut, search temporary files: incidental operating-system state, not corpus.

## Cross-directory behavior to preserve when curating

Batch launchers are not decoration. They specify working-directory assumptions, browser family, packed database stem (`about`, `guide`, `enc`), display switches, swap path, and media player actions.

- [ecs launcher](../corpus/hyperties-demos/ecs/ecs.bat) calls a database in [ht30glos/ogawa](../corpus/hyperties-demos/ht30glos/ogawa).
- [hat launcher](../corpus/hyperties-demos/hat/hat.bat) opens its `hat-db` subdirectory.
- [AIDS launcher](../corpus/subject-and-institutional/AIDS/AIDS.BAT) opens `library`.
- [newmjh](../corpus/museum/newmjh) action launchers call AAPLAY for named animations; some referenced animation stems were not established to be present.
- [HP launcher](../corpus/subject-and-institutional/hpguide/guide4.bat) uses `/x=swap.fil`; this is runtime scratch, not source data.
- Old launchers also retain commented-out `G:\demo`/`J:\ht30` paths. Record intended relative behavior instead of carrying obsolete machine-specific wrappers unchanged into the new UX.
