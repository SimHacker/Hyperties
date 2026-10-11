<!-- Generated format registry: analysis/document-formats.mjs -->
# INDEX.TIE legacy index

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Tested subset |
| Confidence | High for supported subset |

## Identification and observed structure

Entry/File tagged-column headers; pipe-delimited title, basename, status and aliases; terminal 0x19/0x1a allowed only at end. No assumed packed offset/length columns.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/format-definitions.md)
- [Existing implementation](../../tools/src/records.ts)

## Retained publication examples

- [corpus/books-and-literature/ACM/INDEX.TIE](../../corpus/books-and-literature/ACM/INDEX.TIE)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/index.tie](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/index.tie)
- [corpus/books-and-literature/cr/index.tie](../../corpus/books-and-literature/cr/index.tie)
- [corpus/books-and-literature/horror/index.tie](../../corpus/books-and-literature/horror/index.tie)
- [corpus/books-and-literature/red-mask/index.tie](../../corpus/books-and-literature/red-mask/index.tie)
- [corpus/hyperties-demos/hat/hat-db/index.tie](../../corpus/hyperties-demos/hat/hat-db/index.tie)

## Tool work item

P0: document status bits and unsupported binary index variants.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
