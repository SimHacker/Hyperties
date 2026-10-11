<!-- Generated format registry: analysis/document-formats.mjs -->
# .pcx: PC Paintbrush images

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Recognized standard |
| Confidence | High |

## Identification and observed structure

PCX signatures and headers identify multiple CGA/EGA/VGA modes, bit depths and planes. Header validation still matters.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/books-and-literature/ACM/ACMCGA.PCX](../../corpus/books-and-literature/ACM/ACMCGA.PCX)
- [corpus/books-and-literature/ACM/COVER.PCX](../../corpus/books-and-literature/ACM/COVER.PCX)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/amy1.pcx](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/amy1.pcx)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/amy2.pcx](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/amy2.pcx)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/amy3.pcx](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/amy3.pcx)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/amy4.pcx](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/amy4.pcx)

## Tool work item

P0: decode planes/RLE/palettes to pixels; compare lossless PNG access derivatives.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
