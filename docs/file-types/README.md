<!-- Generated format registry: analysis/document-formats.mjs -->
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
| [`(none)`](extensionless.md) | unknown | 13 | 11 | 3738 | Per-file dispatch required |
| [`.$$$`](search-scratch.md) | unknown | 2 | 0 | 0 | Definition placeholder; operational scratch |
| [`.arc`](arc.md) | standard | 1 | 1 | 218651 | Header inspection only |
| [`.asc`](asc.md) | bespoke | 8 | 8 | 7656 | Observed syntax |
| [`.bat`](bat.md) | standard | 42 | 42 | 2876 | Recognized command language |
| [`.com`](com.md) | standard | 1 | 1 | 19906 | Recognized by context |
| [`.doc`](doc.md) | standard | 1 | 1 | 981 | Recognized text payload |
| [`.docx`](docx.md) | standard | 1 | 1 | 22399 | Recognized standard |
| [`.elb`](elb.md) | bespoke | 26 | 26 | 177710 | Definition placeholder |
| [`.exe`](exe.md) | standard | 15 | 15 | 2933611 | Recognized standard |
| [`.fil`](fil.md) | bespoke | 1658 | 1658 | 2154007 | Tested subset |
| [`.fli`](fli.md) | standard | 6 | 6 | 303688 | Recognized standard |
| [`.gif`](gif.md) | standard | 7 | 7 | 121357 | Recognized standard |
| [`.gra`](gra.md) | bespoke | 1 | 1 | 1748 | Definition placeholder |
| [`.grb`](grb.md) | bespoke | 42 | 42 | 14967 | Text observed; binary unresolved |
| [`.hdt`](hdt.md) | bespoke | 5 | 5 | 2888515 | Definition placeholder |
| [`.hff`](hff.md) | unknown | 5 | 5 | 12288 | Definition placeholder |
| [`.hin`](hin.md) | bespoke | 5 | 5 | 432128 | Definition placeholder |
| [`.hln`](hln.md) | bespoke | 4 | 4 | 151 | Observed sample layout |
| [`.hnc`](hnc.md) | bespoke | 4 | 4 | 488448 | Definition placeholder |
| [`.hol`](hol.md) | unknown | 5 | 5 | 201440 | Definition placeholder |
| [`.hph`](hph.md) | standard | 1 | 1 | 93198 | Recognized standard payload |
| [`.hsd`](hsd.md) | unknown | 4 | 4 | 317622 | Definition placeholder |
| [`.huc`](huc.md) | bespoke | 5 | 5 | 10240 | Definition placeholder |
| [`.lnk`](lnk.md) | standard | 1 | 0 | 0 | Recognized standard |
| [`.log`](log.md) | bespoke | 7 | 0 | 0 | Observed; excluded operational state |
| [`.md`](md.md) | standard | 0 | 0 | 0 | Recognized standard |
| [`.msg`](msg.md) | bespoke | 2 | 2 | 23604 | Observed text |
| [`.new`](new.md) | bespoke | 17 | 17 | 122980 | Tested subset |
| [`.ori`](ori.md) | bespoke | 1 | 1 | 231 | Observed article-shaped sample |
| [`.p`](p.md) | bespoke | 20 | 20 | 77850 | Definition placeholder |
| [`.pal`](pal.md) | bespoke | 2 | 2 | 236 | Definition placeholder |
| [`.pbb`](pbb.md) | bespoke | 9 | 9 | 69394 | Definition placeholder |
| [`.pcc`](pcc.md) | standard | 23 | 23 | 57829 | Recognized standard payload |
| [`.pcl`](pcl.md) | standard | 1 | 1 | 7070 | Recognized command family |
| [`.pcx`](pcx.md) | standard | 342 | 342 | 11179545 | Recognized standard |
| [`.pdf`](pdf.md) | standard | 2 | 2 | 5926404 | Recognized standard |
| [`.pic`](pic.md) | unknown | 6 | 6 | 98346 | Definition placeholder |
| [`.pif`](pif.md) | standard | 1 | 0 | 0 | Recognized standard |
| [`.prf`](prf.md) | unknown | 1 | 1 | 313 | Definition placeholder |
| [`.rfs`](rfs.md) | bespoke | 1 | 1 | 744 | Observed PCL payload |
| [`.s`](s.md) | bespoke | 20 | 20 | 593435 | Definition placeholder |
| [`.set`](set.md) | bespoke | 2 | 0 | 0 | Observed text |
| [`.stl`](stl.md) | bespoke | 32 | 32 | 20953 | Text observed; binary unresolved |
| [`.sys`](sys.md) | bespoke | 18 | 18 | 1349 | Observed text subset |
| [`.tgf`](tgf.md) | unknown | 3 | 3 | 8649 | Definition placeholder |
| [`.tie`](tie.md) | bespoke | 106 | 106 | 4029692 | Mixed: tested indexes/LZW/arithmetic and unresolved stores |
| [`.tif`](tif.md) | standard | 1 | 1 | 23020 | Recognized standard |
| [`.txt`](txt.md) | standard | 48 | 48 | 48947 | Mixed text conventions |
| [`.zip`](zip.md) | standard | 0 | 0 | 0 | Verified historical survey; packaging removed |

## Named schemas and non-suffix layers

- [INDEX.TIE legacy index](index-tie.md): Tested subset.
- [BIGFILE.TIE packed articles](bigfile-tie.md): Both book codecs tested.
- [Adaptive arithmetic packed-article codec](arithmetic.md): Tested corpus subset.
- [BIGRAPH.TIE packed graphics](bigraph-tie.md): Definition placeholder.
- [GINDEX.TIE graphics index](gindex-tie.md): Definition placeholder.
- [REFER.TIE authoring references](refer-tie.md): Definition placeholder.
- [COMMON.TIE shared/runtime data](common-tie.md): Definition placeholder.
- [INDEX.NEW](new.md) has its own range-bearing dialect.
- [Article markup and link semantics](../../analysis/format-definitions.md) are embedded languages, not separate suffixes.
- [Encoding evidence](../../analysis/format-definitions.md): Latin-1 inspection is reversible byte viewing, not proof of source encoding; CP437/Japanese profiles need per-asset validation.
- [Extensionless files](extensionless.md) include museum playback scripts and prose, not one uniform format.
- AppleDouble records and Finder .DS_Store metadata were found and removed. AppleDouble was also present inside ZIPs; these are standard host metadata, not Hyperties formats.
- Modern authored files use Markdown, YAML, TypeScript, JavaScript ES modules, JSON, HTML and Git control files. They are infrastructure, not newly discovered historical codecs.

## Tool priorities

1. **P0:** extend tested articles/indexes, later HDT/index family and packed graphics; implement PCX and stylesheet/graphic-region access. Both book codecs are now recovered.
2. **P1:** search structures, fonts, palettes, animations, ARC verification, imports and encoding-aware access.
3. **P2/P3:** print reconstruction, static runtime evidence and scratch/settings investigation only when needed.

Priority is a proposed restoration work order, not an implementation claim.
The [tools guide](../../tools/README.md) lists currently working readers/tests.
Every definition page links its supporting analysis and any existing implementation.

Regenerate with `node analysis/document-formats.mjs`; verify exact generated
content and local links with `node analysis/document-formats.mjs --check`.
The generator needs neither private pre-cleanup manifests nor a TypeScript build.
It fails on new source suffixes so additions cannot silently disappear from the index.
