<!-- Generated format registry: analysis/document-formats.mjs -->
# .txt: Text, help and control-bearing scripts

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Mixed text conventions |
| Confidence | Medium |

## Identification and observed structure

Mixed prose, fixed-width help/screens, imported content and playback-related text. Some members are not clean Unicode or plain prose.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/books-and-literature/ACM/HELP.TXT](../../corpus/books-and-literature/ACM/HELP.TXT)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/help.txt](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/help.txt)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/_candrie.txt](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/_candrie.txt)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/_cben.txt](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/_cben.txt)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/_cbush.txt](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/_cbush.txt)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/_ccover.txt](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/_ccover.txt)

## Tool work item

P1: explicit byte/encoding profiles and screen-text handling; do not strip control bytes blindly.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
