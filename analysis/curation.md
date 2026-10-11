# Curation decisions

This is a restoration collection, not a backup. The recommendations deliberately allow discarding uninteresting repeated packaging after the original is retained on Dropbox. The `dry-run manifest` proposes actions for every file; it does **not** execute them.

Approved phase-one cleanup is complete: **2,919 files / 35,922,491 bytes removed**.
The current inventory has 2,529 files and 16 distinct executables, each stored
once. See [the import record](import-process.md) for completed actions and mapping.
The table below preserves the original survey evidence and distinguishes
completed removals from remaining recommendations.

## Confirmed redundancy and operational-junk recommendations

| Candidate | Evidence | Recommended action |
|---|---|---|
| Former `HypertiesDatabases-minusFamily` wrapper | All 32 nested database directories had top-level counterparts. Every same-path counterpart was byte-identical; zero changed files. See `pre-cleanup comparisons`, a local-only report. Top-level copies contain useful extra styles, images, help and search files. | **Removed.** 2,627 files / 32,135,702 bytes, including its three ZIPs. Do not add their savings again. |
| Former `ACM.zip` and `chim.zip` inside the wrapper | All substantive members hash-matched loose files. Unmatched AppleDouble records described Finder metadata only. | **Removed.** Original ZIP timestamps retained in `pre-cleanup member evidence`, locally only. |
| Former `newmjh.zip` inside the wrapper | All 87 regular members SHA-256-matched loose files, including media present in [newmjh](../corpus/museum/newmjh). | **Removed.** Verified by member content, not directory name. |
| `.DS_Store` files | 29 files / 184,436 bytes total at survey; Finder state, not Hyperties content. | **Removed all.** Most were included in wrapper removal. |
| `srchtemp.$$$` | Two zero-byte files and two 128-byte files across [ht30glos](../corpus/hyperties-demos/ht30glos), [tour30](../corpus/hyperties-demos/tour30), and their nested copies. Name and launcher conventions identify transient search/swap state. | Omit from curated repository; let runtime recreate temporary files. Do not turn this into a rule deleting every small `.FIL` or unknown binary. |
| `Music - Shortcut.lnk` | Windows shell shortcut with unrelated music target and 2014/2018 timestamps. | Remove; no restoration value. |
| `hho.PIF` and its duplicate | Windows DOS launch settings with an old absolute drive/path. | Omit for a web restoration; retain only if reconstructing the historical Windows launch environment. The DOS batch launcher is a better concise dependency record. |

The earlier hypothetical first-pass estimate was **2,736 files / 34.58 MiB**.
Actual approved cleanup went further on repeated content/programs, but did not
delete private subject matter, unresolved packages or remaining operational
files. Current exclusion recommendations are regenerated in `curation.tsv`;
they are **not** a rights-cleared public allowlist.

## More redundancy, with dependency caveats

### ECS versus the Ogawa database

All **264 files** in [ht30glos/ogawa](../corpus/hyperties-demos/ht30glos/ogawa) originally occurred byte-for-byte at the same relative paths in [ecs](../corpus/hyperties-demos/ecs). ECS added only three executables, a batch launcher, and the same README text found in [ht30glos/readme.doc](../corpus/hyperties-demos/ht30glos/readme.doc).

The three ECS executables differ from the [ht30glos](../corpus/hyperties-demos/ht30glos) executables only in byte offset 2 of the MZ header and 7/13 trailing zero bytes. Their common executable bytes are otherwise identical. This is compelling evidence of **uninteresting padding/length variants**, not three new program versions. Exact hashes alone would have missed that.

**Completed:** retained one content tree and tool set under [ht30glos](../corpus/hyperties-demos/ht30glos),
including the outer `.ELB` indexes. Removed ECS payload, duplicate README and
padding-only tools. Only [ecs.bat](../corpus/hyperties-demos/ecs/ecs.bat) remains as dependency evidence.

### HTUIS versus HTUISM

[htuis](../corpus/hyperties-demos/htuis) and [htuism](../corpus/hyperties-demos/htuism) share 17 same-path files but have 11 changed files and now 24/6 files unique by relative name (25/6 before removing the repeated browser). HTUISM has additional articles and different external-program actions; HTUIS has other interface/application articles.

Recommendation: one main corpus plus a documented variant/overlay for meaningful differences. Do **not** treat HTUISM as an exact duplicate. The multimedia/external-action differences are potentially valuable to your reincarnation.

### TOUR30 versus TOUR7_91

[tour30](../corpus/hyperties-demos/tour30) and [tour7_91](../corpus/hyperties-demos/tour7_91) share 21 same-path files, with 18 changes and eight files only in TOUR30. Packed content, image assets, browser version and launcher behavior differ.

Recommendation: use the July-1991-labelled tour as the later comparison target, compare rendered article/UI output, then retain only meaningful older differences. Binary differences are not yet evidence that those differences are boring. No rendered semantic comparison was performed.

### Old and new museum databases

[oldmjh](../corpus/museum/oldmjh) exposes hundreds of editable `.FIL` articles; [newmjh](../corpus/museum/newmjh) holds later `.HDT` data, indexes, GIF/FLI animations and a newer browser.

Recommendation: retain both **for now** as complementary restoration evidence, not redundant versions. Once the later packed content can be exported and compared by article, keep a single canonical corpus and any meaningful edition/media differences.

### Loose articles versus packed databases

`BIGFILE.TIE` / `BIGRAPH.TIE` often coexist with loose articles/images. They are plausible compact browser representations, but this analysis has **not** decoded and compared all packed payloads with the loose inputs.

Recommendation: keep packed-only databases, keep packed exemplars needed to build a decoder, and defer mass deletion until export/round-trip tests establish equivalence. Do not delete an opaque file merely because its name contains "index" or because `file` calls it generic data.

## Low-value or conditional material

- [family](../corpus/personal-history/family): exclude entirely from public GitHub. Not necessary to restore Hyperties; contains personal genealogy and interaction logs. See [publication review](publication-review.md).
- `tour30/import.log` and `tour7_91/import.log`: identical import transcript. Keep a short summary of its useful unresolved-link diagnostic, omit both raw copies and local home-path traces.
- [htuism/htuism.arc](../corpus/hyperties-demos/htuism/htuism.arc): **probable** redundant historical package. All 33 ARC member names/sizes match loose files; the repeated nested archive was removed with the wrapper, but this substantive archive was retained. Compressed member contents were **not** decoded or hash-verified.
- Installers and launch wrappers: [setup.com](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/setup.com) is less useful than the browser/content for a web restoration. Hold offline unless installation behavior is itself a goal.
- The [HP LaserJet guide](../corpus/subject-and-institutional/hpguide), [AT&T frame-relay guide](../corpus/subject-and-institutional/frame), [sports database](../corpus/subject-and-institutional/redsk), [wine database](../corpus/subject-and-institutional/wine), and [landscaping database](../corpus/subject-and-institutional/landscap) are lower first-phase priorities. They are not junk: commercial-use examples and unusual printer/font/UI formats can be useful later.
- [chim/sub](../corpus/subject-and-institutional/chim/sub), [extra.fil](../corpus/subject-and-institutional/chim/extra.fil), [extr2.fil](../corpus/subject-and-institutional/chim/extr2.fil), and [chronolo.fil](../corpus/subject-and-institutional/chim/chronolo.fil): mostly scratch/parser edge cases, including a 21-byte truncated file. Keep one small set of format-test fixtures locally instead of an entire scratch tree. Do not "repair" them in the historical corpus.
- `SIG.P` / `SIG.S` search indexes: the 2.3 manual describes UPDATE-generated files. Omit later only if rebuilding or disabling search is intentional and tested. They are a small cost now.
- `REFER.TIE`: manual says not needed once editing finishes. Useful for understanding references/authoring, not rebuilding with the old toolchain.

## Do not confuse old Windows files with the actual runtime

Of 79 `.EXE` paths and two `.COM` paths, **all are identified as DOS executables**, not modern PE Windows applications. There are only two PIF copies and one Windows shortcut. The browser variants are still useful as rendering oracles in DOSBox or another isolated emulator.

Store one copy per required runtime family outside the content trees, preferably on Dropbox or as an optional GitHub Release download rather than in the default content tree. You have confirmed that Ben owns the Cognetics rights; that is not treated as a blocker. Map each database to a runtime hash. There are 19 unique executable contents, and three pairs are padding-only variants, leaving **16 distinct executable groups under that structural comparison**, including converters/players/installers. Do not retain 30 copies of the same 114,725-byte browser, and do not assume a 3.0.5 browser can correctly read every 2.x database.

## Approved cleanup and remaining boundaries

The survey scripts write reports; the separately approved deduplication tool
removed only validated redundant files/metadata. It saved a local removal journal
and pre-cleanup evidence. The `curation manifest` now covers remaining
files. Larger reorganization and selective staging are deferred. Everything is
unstaged. See [import record](import-process.md) and
[GitHub workflow](github-and-restoration.md#publishing-without-lfs).
