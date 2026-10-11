# Layout and original-path map

[Repository](../README.md) · [Collections](collections.md)

## Layers

- [corpus/](../corpus/README.md): intact historical collections, grouped by broad subject.
- [reference/](../reference/README.md): manuals and later museum documents.
- [docs/](README.md): human-facing interpretation, catalogs and overlapping views.
- [analysis/](../analysis/README.md): inventory, provenance, research and access generators.
- [tools/](../tools/README.md): shared browser/Node TypeScript byte readers.
- [manifests/](../manifests/README.md): publication-source SHA-256 and path provenance.

A subject tree is only one route through the collection. [Versions](by-version.md), [storage families](by-storage.md), [file types](file-types/README.md), related editions and recovery notes supply other routes. Do not fragment a database into suffix folders or promote an uncertain version to authoritative taxonomy.

## Moved intact

| Original root path | Current path | Primary group |
|---|---|---|
| `ACM/` | [`corpus/books-and-literature/ACM/`](../corpus/books-and-literature/ACM/README.md) | books-and-literature |
| `CACM-Hypertext Conference issue July 1988/` | [`corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/`](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/README.md) | books-and-literature |
| `HHO-Hypertext on Hypertext book-1988/` | [`corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/`](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/README.md) | books-and-literature |
| `cr/` | [`corpus/books-and-literature/cr/`](../corpus/books-and-literature/cr/README.md) | books-and-literature |
| `sigchi/` | [`corpus/books-and-literature/sigchi/`](../corpus/books-and-literature/sigchi/README.md) | books-and-literature |
| `horror/` | [`corpus/books-and-literature/horror/`](../corpus/books-and-literature/horror/README.md) | books-and-literature |
| `red-mask/` | [`corpus/books-and-literature/red-mask/`](../corpus/books-and-literature/red-mask/README.md) | books-and-literature |
| `oldmjh/` | [`corpus/museum/oldmjh/`](../corpus/museum/oldmjh/README.md) | museum |
| `newmjh/` | [`corpus/museum/newmjh/`](../corpus/museum/newmjh/README.md) | museum |
| `family/` | [`corpus/personal-history/family/`](../corpus/personal-history/family/README.md) | personal-history |
| `ecs/` | [`corpus/hyperties-demos/ecs/`](../corpus/hyperties-demos/ecs/README.md) | hyperties-demos |
| `ht30glos/` | [`corpus/hyperties-demos/ht30glos/`](../corpus/hyperties-demos/ht30glos/README.md) | hyperties-demos |
| `ht30tour/` | [`corpus/hyperties-demos/ht30tour/`](../corpus/hyperties-demos/ht30tour/README.md) | hyperties-demos |
| `htuis/` | [`corpus/hyperties-demos/htuis/`](../corpus/hyperties-demos/htuis/README.md) | hyperties-demos |
| `htuism/` | [`corpus/hyperties-demos/htuism/`](../corpus/hyperties-demos/htuism/README.md) | hyperties-demos |
| `microtou/` | [`corpus/hyperties-demos/microtou/`](../corpus/hyperties-demos/microtou/README.md) | hyperties-demos |
| `tour30/` | [`corpus/hyperties-demos/tour30/`](../corpus/hyperties-demos/tour30/README.md) | hyperties-demos |
| `tour7_91/` | [`corpus/hyperties-demos/tour7_91/`](../corpus/hyperties-demos/tour7_91/README.md) | hyperties-demos |
| `hat/` | [`corpus/hyperties-demos/hat/`](../corpus/hyperties-demos/hat/README.md) | hyperties-demos |
| `AIDS/` | [`corpus/subject-and-institutional/AIDS/`](../corpus/subject-and-institutional/AIDS/README.md) | subject-and-institutional |
| `chim/` | [`corpus/subject-and-institutional/chim/`](../corpus/subject-and-institutional/chim/README.md) | subject-and-institutional |
| `cmsc/` | [`corpus/subject-and-institutional/cmsc/`](../corpus/subject-and-institutional/cmsc/README.md) | subject-and-institutional |
| `frame/` | [`corpus/subject-and-institutional/frame/`](../corpus/subject-and-institutional/frame/README.md) | subject-and-institutional |
| `hfind/` | [`corpus/subject-and-institutional/hfind/`](../corpus/subject-and-institutional/hfind/README.md) | subject-and-institutional |
| `hpguide/` | [`corpus/subject-and-institutional/hpguide/`](../corpus/subject-and-institutional/hpguide/README.md) | subject-and-institutional |
| `landscap/` | [`corpus/subject-and-institutional/landscap/`](../corpus/subject-and-institutional/landscap/README.md) | subject-and-institutional |
| `redsk/` | [`corpus/subject-and-institutional/redsk/`](../corpus/subject-and-institutional/redsk/README.md) | subject-and-institutional |
| `rogers/` | [`corpus/subject-and-institutional/rogers/`](../corpus/subject-and-institutional/rogers/README.md) | subject-and-institutional |
| `toronto/` | [`corpus/subject-and-institutional/toronto/`](../corpus/subject-and-institutional/toronto/README.md) | subject-and-institutional |
| `usna/` | [`corpus/subject-and-institutional/usna/`](../corpus/subject-and-institutional/usna/README.md) | subject-and-institutional |
| `wine/` | [`corpus/subject-and-institutional/wine/`](../corpus/subject-and-institutional/wine/README.md) | subject-and-institutional |
| `pascal/` | [`corpus/program-examples/pascal/`](../corpus/program-examples/pascal/README.md) | program-examples |
| `program/` | [`corpus/program-examples/program/`](../corpus/program-examples/program/README.md) | program-examples |

Reference PDFs/DOCX moved under reference/manuals and reference/museum. The manual's browser-download suffix " (1)" was dropped from its filename; its bytes are unchanged. The [machine-readable mapping](../analysis/layout.mjs) is shared by migration, catalog and verification code. The local relocation journal records every original/retained path, size and SHA-256; it is excluded because it includes operational/private state. The public checksum manifest covers only selected sources.

All 2,528 retained historical files, including locally excluded state, were hash-verified after relocation. No original article, program, media or settings bytes were rewritten. Modern navigation was regenerated. Historical launchers retain their internal names/assumptions; some cross-collection references require a future adapter, not mutation of source evidence.
