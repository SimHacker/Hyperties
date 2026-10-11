# Timeline and date evidence

Dates below distinguish **project/content events**, **build evidence**, and **later copying/scanning**. The supplied archive has multiple extraction generations. Top-level file mtimes are often 2018-08-14 or 2026-10-09; nested copies preserve many older dates. Thus the nested wrapper can be content-redundant while its original dates still provide provenance.

| Date / range | Interpretation | Evidence / confidence |
|---|---|---|
| Fall 1983 | Development of The Interactive Encyclopedia System/Hyperties underway at Maryland. | Explicit statement in [HTUIS Hyperties article](../corpus/hyperties-demos/htuis/hypertie.fil); manual acknowledgments also mention initial support in 1983. High as a statement in supplied material. |
| 1984 onward | Commercial/software copyright lineage starts in embedded notices. | Multiple browser strings say 1984-1988, 1984-1990, 1984-1991 or 1984-1992 Cognetics. Copyright range is not an exact compilation date. |
| 1987-1989, broadly | Early classic database/tool era. | Many nested mtimes and library/runtime notices. Bibliographic identifiers and article subjects may predate their electronic conversion. Do not equate referenced publication dates with database creation. |
| July 1988 | CACM special hypertext section. | [Database introduction](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/introduc.fil) explicitly names July 1988. High. |
| 1988 | Hypertext-on-hypertext book edition. | Supplied [HHO directory title](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988) plus chapter-like index. Exact release month not established from archive evidence read. |
| Late 1980s | Museum/Jewish-history project at Maryland. | Retrospective attribution in [later text document](../reference/museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx). High as retrospective statement, not exact individual article dates. |
| 1988-07-09 to 1989-12-06 | Dates represented by HTUISM ARC member headers. | `ARC header evidence`, DOS local time without timezone. Member date range, not guaranteed archive creation date. |
| 1989-1990 | Classic 2.35-series and 2.40 alpha data, later tools increasingly present. | `.FIL` trailer labels: 2.35c/d/e/f/g/h and 2.40 alpha b; do not assign every trailer a calendar release without additional evidence. |
| 1990-06-12 | Lanthanum 3.0 build mentioned as buggy. | [Retained encyclopedia README](../corpus/hyperties-demos/ht30glos/readme.doc) explicitly names Lanthanum June 12, 1990; its duplicate ECS copy was removed. Browser strings independently identify `3.0 Lanthanum (57)`. |
| 1990-07-24 | Modified encyclopedia demo intended for a video recording. | Same [README](../corpus/hyperties-demos/ht30glos/readme.doc). It distinguishes original Rubidium demo from a modified TEMP2 setup; its old instruction to delete TEMP2 is **not** proof any current directory is that TEMP2. |
| 1990 | Rubidium preview and Fluorine UPDATE tool. | [ht30tour browser](../corpus/hyperties-demos/ht30tour/browser.exe), encyclopedia update-tool strings and 1984-1990/1990 notices. Exact release dates not established. |
| Nov-Dec 1990 | Family-database browsing sessions logged. | Dates inside excluded [family](../corpus/personal-history/family) logs, inspected locally without reproducing personal content. Omit logs from public repo. |
| 1991-era | Later tour and commercial knowledge-base browsers. | [tour30](../corpus/hyperties-demos/tour30) 3.0.3.19, [tour7_91](../corpus/hyperties-demos/tour7_91) 3.0.3.20c, [frame](../corpus/subject-and-institutional/frame) 3.0.3.29, [hpguide](../corpus/subject-and-institutional/hpguide) 3.0.3.80. July-1991 implication of directory name is not an authenticated release date; embedded copyrights span 1990/1991. |
| 1992-era | New museum browser 3.0.5.100 and later HP material. | [newmjh browser](../corpus/museum/newmjh/BROWSER.EXE) includes 1984-1992 notice; [HP README](../corpus/subject-and-institutional/hpguide/readme.txt) identifies LaserJet 4, nested mtimes include 1992. |
| 1998, 2000 and 2014 | Recopying/editing/access generations in filesystem metadata. | Inventory includes date clusters from these years and shortcut metadata. These do not establish original authoring chronology. |
| March/August 2018 | Repackaging/extraction of archive copies. | ZIP Mac-sidecar dates in March 2018; many top-level mtimes August 14, 2018. |
| 2019-01-14 | Manual scanning/OCR conversion metadata. | PDF producer Acrobat Paper Capture, 179 pages. PDF creation/modification clocks differ; metadata is processing evidence. The manual itself describes version 2.3. |
| 2019-11-15 | Later filesystem timestamp on manual PDF. | Inventory mtime; distinct from PDF internal creation date. |
| 2021-01-12 versus 2022-01-12 | Retrospective text attribution date differs from document metadata. | DOCX body says January 12, 2021; core metadata and filesystem mtime say January 12, 2022. Record the discrepancy; do not silently correct it. |
| 2022-01-12 | Museum text/image access documents generated. | DOCX core created/modified timestamps and 13-page image PDF creation metadata. |
| 2026-10-09/10 | Latest loose-copy extraction and initial Git repository. | Top-level CACM/HHO mtimes; initial Git commit on Oct 10 with README. Not historical Hyperties development dates. |
| 2026-10-11 | Survey, approved first-phase deduplication, and refreshed inventory. | SHA-256 manifests, retained pre-cleanup evidence, and [import record](import-process.md). Larger reorganization remains pending. |

## Timestamp traps

- DOS archive timestamps have no timezone and two-second resolution.
- 1980-01-01 / 1980-01-03 clusters are suspicious default/invalid-clock dates, not evidence Hyperties existed then. CHIM ZIP also has an early 1983/1984-looking timestamp; do not make that an origin claim.
- Same content under two paths with different mtimes is one content object and two packaging histories.
- Article text dates (e.g. nineteenth-century museum chronology, story publication dates) describe subjects, not database birth dates.
- Copyright years and compiler-library notices bound context but do not prove build timestamps.
- The local `inventory` preserves filesystem dates; `ZIP members` preserve remaining ZIP dates. Keep a **sanitized** date/provenance summary in public Git instead of the complete private raw manifest.
