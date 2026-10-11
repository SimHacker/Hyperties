<!-- Generated format registry: analysis/document-formats.mjs -->
# BIGFILE.TIE packed articles

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Both book codecs tested |
| Confidence | Unresolved schema |

## Identification and observed structure

Each tested indexed record has 12 raw header bytes followed by LSB-first LZW (flag 03) or 16-bit adaptive arithmetic coding (flag 02). All 248 book records decode: 218 LZW and 30 arithmetic. 49 ACM LZW and 113 CACM arithmetic comparisons match loose originals exactly.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/packed-format.md)
- [Existing implementation](../../tools/src/packed.ts)

## Retained publication examples

- [corpus/books-and-literature/ACM/BIGFILE.TIE](../../corpus/books-and-literature/ACM/BIGFILE.TIE)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/bigfile.tie](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/bigfile.tie)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/bigfile.tie](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/bigfile.tie)
- [corpus/books-and-literature/cr/bigfile.tie](../../corpus/books-and-literature/cr/bigfile.tie)
- [corpus/books-and-literature/red-mask/bigfile.tie](../../corpus/books-and-literature/red-mask/bigfile.tie)
- [corpus/books-and-literature/sigchi/bigfile.tie](../../corpus/books-and-literature/sigchi/bigfile.tie)

## Tool work item

P0: validate additional corpus variants and retain explicit flag dispatch.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
