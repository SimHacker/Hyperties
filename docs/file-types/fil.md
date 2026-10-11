<!-- Generated format registry: analysis/document-formats.mjs -->
# .fil: Article records

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Tested subset |
| Confidence | High |

## Identification and observed structure

Six little-endian uint32 section offsets, starting at 24, followed by title, preview, body, reference and trailer sections. Five CHIM paths do not satisfy this layout; the suffix alone is not sufficient.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/format-definitions.md)
- [Existing implementation](../../tools/src/records.ts)

## Retained publication examples

- [corpus/books-and-literature/ACM/AIRENTIG.FIL](../../corpus/books-and-literature/ACM/AIRENTIG.FIL)
- [corpus/books-and-literature/ACM/ARNOLDWI.FIL](../../corpus/books-and-literature/ACM/ARNOLDWI.FIL)
- [corpus/books-and-literature/ACM/AUTHORIN.FIL](../../corpus/books-and-literature/ACM/AUTHORIN.FIL)
- [corpus/books-and-literature/ACM/BAHLHARI.FIL](../../corpus/books-and-literature/ACM/BAHLHARI.FIL)
- [corpus/books-and-literature/ACM/BAIRDHEN.FIL](../../corpus/books-and-literature/ACM/BAIRDHEN.FIL)
- [corpus/books-and-literature/ACM/BARTSCHI.FIL](../../corpus/books-and-literature/ACM/BARTSCHI.FIL)

## Tool work item

P0: extend the existing reader with dialect and encoding fixtures; retain all section bytes.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
