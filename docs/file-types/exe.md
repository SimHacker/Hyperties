<!-- Generated format registry: analysis/document-formats.mjs -->
# .exe: DOS MZ executables

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Recognized standard |
| Confidence | High |

## Identification and observed structure

Retained executables are DOS MZ, not Windows PE. Some carry executable-compression notices. Distinct programs are algorithm/format evidence, not modern build dependencies.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/books-and-literature/ACM/BROWSER.EXE](../../corpus/books-and-literature/ACM/BROWSER.EXE)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/browser.exe](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/browser.exe)
- [corpus/books-and-literature/horror/browser2.exe](../../corpus/books-and-literature/horror/browser2.exe)
- [corpus/hyperties-demos/ht30glos/author.exe](../../corpus/hyperties-demos/ht30glos/author.exe)
- [corpus/hyperties-demos/ht30glos/browser.exe](../../corpus/hyperties-demos/ht30glos/browser.exe)
- [corpus/hyperties-demos/ht30glos/update.exe](../../corpus/hyperties-demos/ht30glos/update.exe)

## Tool work item

P2: static headers/strings/disassembly with version hashes; do not execute on the host.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
