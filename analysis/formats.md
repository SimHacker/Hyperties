# File formats

The [public file-type registry](../docs/file-types/README.md) indexes every
surveyed suffix with linked working definitions, named-schema pages and tool
priorities. It includes removed/excluded categories without linking their
private or obsolete paths. The detailed historical observations below remain
supporting evidence; the registry distinguishes current counts and tested
implementations from earlier survey statements.

The `generated census` lists all 50 extension categories, counts, bytes and examples; `inventory` records every signature and the first 32 bytes. **Extensions are not schemas.** Several formats share storage structures, and this collection contains deliberately mixed, damaged, or renamed files.

Counts and duplicate-path descriptions below refer to the original survey unless
specified otherwise. The regenerated census reflects approved cleanup and no
longer includes deleted ZIP/Finder metadata categories. There are now 1,658
`.FIL` paths, of which 1,653 satisfy the common header layout; five unique-path
exceptions remain. Exact duplicate and padding-only executables have been
removed, leaving 16 program files.

Confidence: **confirmed** = signature or manual plus content agreement; **observed** = structural/text evidence without complete formal schema; **unknown** = purpose or binary encoding still unresolved.

The next iteration adds [tested format definitions](format-definitions.md),
[record/index readers](records.mjs), and a `semantic catalog`.
The section meanings and legacy index aliases are now documented more precisely;
packed decoding and later numerical IDs remain unresolved.

## Standard containers and media

| Extensions | Identification | Handling |
|---|---|---|
| `.EXE`, `.COM` | Confirmed DOS MZ/COM programs. All executable paths are DOS, not PE Windows apps. Some contain PKWARE executable-compression notices. | Hold one required version/hash per runtime. Not source. Do not execute directly on the host; use an isolated emulator. Ben's Cognetics rights are confirmed by you. |
| `.BAT` | DOS batch text, generally CRLF. | Preserve useful launch/dependency behavior; modernize obsolete absolute paths in new wrappers, not original evidence. |
| `.PCX`, `.PCC`, `.HPH` | PC Paintbrush/PCX images. `.PCC` and `.HPH` signatures are PCX despite unconventional extensions. Multiple CGA/EGA/VGA modes, planes and palettes. | Decode according to header/planes, not just suffix. Lossless PNG access copies; retain representative originals and compare rendered pixels. |
| `.TIF` | Standard TIFF; only [ACM/COVER.TIF](../corpus/books-and-literature/ACM/COVER.TIF). | Possible alternative rendition of PCX cover; no decoded-pixel equality test yet. |
| `.GIF` | Standard GIF87a images, seven files, museum collection. | Useful access graphics; preserve until animation/still roles are clear. |
| `.FLI` | Autodesk Animator FLI; six 320x200, 8-bit, 20-frame animations. | FFmpeg access video/GIF derivatives are reasonable. Do not replace motion with the similarly named still GIF without comparison. |
| `.PDF` | Two PDF 1.6 documents: manual and museum images. | `pdfinfo` metadata and `pdftotext` used. OCR text is lossy evidence, not the authoritative original. |
| `.DOCX` | ZIP-based Office Open XML. | Wordprocessing XML and core creator/date metadata. Later provenance/text document, not original 1980s format. |
| `.DOC` | All four paths are **plain ASCII text**, not binary Word documents. Two copies each of the same encyclopedia README. | Can be presented as text; preserve original once, name access copy clearly. |
| `.PIF` | Windows DOS Program Information File, two identical paths. | Old launch settings, not content. |
| `.LNK` | Windows shell shortcut, unrelated music target. | Junk for this restoration; may expose local paths. |
| `.PCL`, `.RFS` | HP printer-command streams. PCL uses ESC raster commands; RFS contains PCL typography/rules plus readable support text. | `.RFS` is an application-specific naming convention for a printer stream, not an established general RFS document format here. Low priority unless recreating print output. |
| `.MD` | Markdown repository stub. | Documentation. |

## Archives

- `.ZIP`: three standard archives. The custom [analysis reader](analyze.mjs) scans central-directory records, decompresses stored/deflated regular members with length/CRC32 checks, hashes their content, and matches all loose files. All substantive content exists loose; only a 120-byte AppleDouble metadata record is archive-only.
- `.ARC`: two exact copies of one classic ARC archive with dynamic-LZW method 8. The [header inspector](inspect.mjs) reads 33 member names, lengths, dates, CRC16 values and compression methods. All names/sizes have loose-file candidates. **Member decompression and content-hash equivalence remain unverified**. `bsdtar` did not recognize the file. Use a real ARC decoder if definitive equivalence is desired.
- `__MACOSX/._...`: AppleDouble sidecar records inside ZIPs; metadata, not Hyperties application assets.
- `.DS_Store`: Finder directory-view state, even though the extension census places it in `(none)` under Node's extension rules.

## Classic article and database family

### `.FIL`: article records, not ordinary clean text

Confirmed by the 2.3 manual's distribution checklist (printed page 140). **3,628 of 3,638 file paths** satisfy the observed common layout:

1. Six little-endian unsigned 32-bit words, a 24-byte header.
2. First word is 24; the six offsets are nondecreasing and within the file.
3. Offset 24 begins the article heading, followed by description/body and additional sections.
4. Sections commonly contain line-delimited `|` separators and LF text.
5. Inline directives and links: `@s1`, `@t`, `@p5`, `@g=...`, `@b=...`, `~target article~`; later examples have `<L>label<\L=#000038>`, `@stylesheet=...`.
6. Trailers may carry build labels such as `2.35d`, `2.35f`, `2.35h`, `2.40 alpha b`.

The six words are **observed section-offset candidates**, not a fully reverse-engineered schema. Do not strip 24 bytes from every `.FIL` indiscriminately.

Exceptions occur in [chim](../corpus/subject-and-institutional/chim): a 21-byte truncated chronology (also under [sub](../corpus/subject-and-institutional/chim/sub)), scratch articles with malformed sixth offsets, and [friedbrg.fil](../corpus/subject-and-institutional/chim/friedbrg.fil), which is readable imported source beginning with markup rather than this binary header. Ten anomalous paths include duplicate copies; they are not ten independent corruptions.

Text is generally DOS-era single-byte data. Help/screens contain box-drawing bytes and Ctrl-Z terminators; Japanese samples may use another encoding. Latin-1 in analysis is a **byte-preserving inspection view**, not a claim that Latin-1 is the original encoding. Detect/test CP437 and likely Japanese encodings per asset. Keep binary offsets byte-based, not Unicode-character-based.

### `.TIE`, `.NEW`, `.P`, `.S`, `.SYS`

| Extension / filename | Meaning and confidence | Restoration policy |
|---|---|---|
| `INDEX.NEW` | Observed `+1.0 Index` header and pipe-separated title, basename, flags, numeric fields and aliases; includes binary control bytes. | Human-readable directory/index evidence. Infer numeric meanings through packed-decoder tests, not guesswork. |
| `INDEX.TIE` | Classic database index; manual-required. Some versions share readable index-like structure, others do not. | Keep. |
| `REFER.TIE` | Reference/editing data; manual says unnecessary when editing is finished. | Useful for authoring restoration; not automatically junk. |
| `GIndex.TIE` | Observed graphics-related index by naming/context. Exact layout unresolved. | Keep with images. |
| `BIGFILE.TIE` | Packed/compressed article store; some begin with familiar article offsets but later payload is opaque. | Critical where no loose `.FIL` exists. Packed/loose equivalence unverified. |
| `BIGRAPH.TIE` | Packed graphics-related store; inferred from context/name. | Keep until images can be extracted and compared. |
| `COMMON.TIE` and other `.TIE` names | Shared/runtime database data; details unresolved by the 2.3 manual excerpt. | Preserve representative files; do not apply a single schema to every `.TIE`. |
| `SIG.P`, `SIG.S` | Search files produced by UPDATE, confirmed by manual printed page 140. `.P` includes recognizable article basenames/record-like numbers; `.S` is opaque bit-packed-looking data. | Generated but behavior-relevant. Keep until search is rebuilt or intentionally dropped. `.P` is **not Pascal source**. |
| `TIES.SYS` | Optional text configuration per manual: colors, graphics path and related settings. Some census members contain nontext bytes. | Not a DOS kernel driver merely because suffix is `.SYS`. |
| `.ASC` | Observed author/import text with `@heading`, `@Description`, markup and DOS end marker. | Excellent import fixtures. Not all bytes are clean Unicode. |
| `.ORI` | Old/original article-shaped scratch record in [chim/sub](../corpus/subject-and-institutional/chim/sub). | Bespoke naming; keep one parser fixture if useful, not a parallel history of every scratch copy. |
| `.TXT` | Mixed text graphics/help, content and playback scripts; not universally plain prose. Some are generic `data` under `file`. | Preserve semantic role: fixed-width boxes/controls can be the original UI. |

## 3.0 styles, graphics, fonts and indexes

| Extension | Observed structure / meaning | Confidence |
|---|---|---|
| `.STL` | Stylesheet script: BACKGROUND, TEXTWINDOW, SHORTDESCRIPTION blocks, SIZE, FONT, colors, actions, page controls; referenced by `@stylesheet`. Some files are binary, requiring further inspection. | Text examples confirmed by readable directives and README. **Not STL 3D mesh files.** |
| `.GRB` | Graphic object/script: FILE/TYPE/SIZE/MODE, LINK rectangles, ACTION blocks, JUMP TO ARTICLE, XOR inversion. Some are opaque binary compiled/object variants. | Text role observed; binary schema unknown. |
| `.GRA` | Article/graphic association list; [microtou.gra](../corpus/hyperties-demos/microtou/microtou.gra) begins with named article and term blocks. | Bespoke graphic-reference format; exact grammar unresolved. |
| `.ELB` | Paged binary library/index family: header fields, named keys (`artname`, etc.), article/link/search filenames. | Index role strongly suggested by names and strings; complete schema unknown. |
| `.HDT` | Packed later knowledge-base data; contains article text, styles/scripts and opaque regions. Launchers open the common database stem, not a loose file. | Main data role observed; record/packing details unresolved. |
| `.HIN`, `.HNC`, `.HUC` | Related paged index/catalog-looking stores. Headers share structure with `.ELB` and name the corresponding key family. | Observed relation; do not expand suffixes into invented authoritative names. |
| `.HLN` | Small database-title/logical-name companion; e.g. AT&T guide title and NUL terminator. | Observed title role. |
| `.HFF`, `.HSD` | Binary companion tables with repeated small integer structures. | Unknown exact schema/purpose. Keep complete stem family. |
| `.HOL` | Binary companion with headings/outline-like strings; some also contain DOS directory-like names (`IBMBIO`, `IBMDOS`, `COMMAND`). | Possible outline/storage residue; **not** confirmed Windows INF. Review before publishing; full schema unknown. |
| `.PBB` | Bitmap-font-looking files referenced explicitly by stylesheet FONT, e.g. `BIT7X14.PBB`, with compact header and glyph-shaped payload. | Font purpose confirmed by references; encoding not fully decoded. |
| `.TGF` | Binary font/graphics-related companion in stylesheet-rich databases. | Exact encoding and role unknown; filenames alone insufficient. |
| `.PAL` | Small binary palette companion in tour collections. | Palette role inferred, exact record layout unresolved. |
| `.PRF` | Small binary preferences-looking companion in Pascal example. | Unknown exact schema; not guaranteed disposable. |
| `.PIC` | Binary images in CHIM and microtour; signatures and sizes do not establish a standard subtype. | Unknown legacy picture encoding. Do not claim all PIC equals PCX. |
| `.SET` | Text runtime/editor settings: editor, edits filename, username, date format, options. | Confirmed by content; local identity/path review needed. |
| `.MSG` | Text runtime/support messages. | Readable application data, not Outlook email files here. |
| `.LOG` | Session logs in excluded family database; duplicate authoring/import log in later tours. | Text diagnostics/interaction records; omit raw private or machine-specific logs from publication. |
| `.$$$` | Search temporary/scratch files, zero or 128 bytes. | Safe publication exclusion; runtime behavior not exercised. |
| `(none)` | Mix of extensionless files and dotfiles, including Finder state and other text/binary data. | Consult per-file signature; no blanket deletion rule. |

## Signature false positives

`file` reports MATLAB v4, PDP-11 executable, MacBinary, Windows PNF/INF, xBase, LIF and GLS for some application records. Those detections are **not credible identifications without structural validation**:

- little-endian article offsets accidentally resemble MATLAB dimensions;
- `.HDT` data does not become a PDP-11 program because a magic test matches;
- binary `.HOL` is not a Windows precompiled INF merely because `file` guesses that;
- search and packed stores can match unrelated legacy magic patterns.

Keep the raw signature in the inventory as evidence, but label the format according to verified content/context. Remaining unknowns are genuine work items, not files to silently discard.

## Decoder priorities

1. Strict byte-based `.FIL` reader with explicit anomalous-header errors; preserve metadata, sections and original markup.
2. Classic index/alias reader; compare names and references with articles.
3. PCX decoding, screen-text CP437 handling, and link-region rendering.
4. Text `.STL` / `.GRB` grammar and action model; never execute imported host commands.
5. Packed `.TIE` extraction for HHO/other packed-only examples.
6. `.ELB` and `.H*` families, full export/comparison of old/new museum and tour editions.
7. Fonts, Japanese encoding, printer streams, animations and conditional emulated runtime support.
