<!-- Generated format registry: analysis/document-formats.mjs -->
# .s: UPDATE search companion SIG.S

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Definition placeholder |
| Confidence | High role; unresolved schema |

## Identification and observed structure

Paired with SIG.P; binary/bit-packed-looking search data. No verified posting, signature or bit-vector schema yet.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/books-and-literature/ACM/SIG.S](../../corpus/books-and-literature/ACM/SIG.S)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/sig.s](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/sig.s)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/sig.s](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/sig.s)
- [corpus/books-and-literature/cr/sig.s](../../corpus/books-and-literature/cr/sig.s)
- [corpus/books-and-literature/horror/sig.s](../../corpus/books-and-literature/horror/sig.s)
- [corpus/books-and-literature/red-mask/sig.s](../../corpus/books-and-literature/red-mask/sig.s)

## Tool work item

P1: identify bit ordering, search representation and paired lookup behavior.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
