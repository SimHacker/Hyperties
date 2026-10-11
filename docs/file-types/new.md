<!-- Generated format registry: analysis/document-formats.mjs -->
# .new: Plus-1.0 packed-range indexes

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Tested subset |
| Confidence | High |

## Identification and observed structure

INDEX.NEW begins with +1.0 Index. Pipe-delimited rows hold title, basename, flags, decimal offset/length and aliases. HHO ranges exactly partition BIGFILE.TIE.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/format-definitions.md)
- [Existing implementation](../../tools/src/records.ts)

## Retained publication examples

- [corpus/books-and-literature/ACM/INDEX.NEW](../../corpus/books-and-literature/ACM/INDEX.NEW)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/index.new](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/index.new)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/index.new](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/index.new)
- [corpus/books-and-literature/cr/index.new](../../corpus/books-and-literature/cr/index.new)
- [corpus/books-and-literature/red-mask/index.new](../../corpus/books-and-literature/red-mask/index.new)
- [corpus/books-and-literature/sigchi/index.new](../../corpus/books-and-literature/sigchi/index.new)

## Tool work item

P0: expand corpus/range validation and preserve control-byte flags.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
