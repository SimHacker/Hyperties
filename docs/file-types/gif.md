<!-- Generated format registry: analysis/document-formats.mjs -->
# .gif: GIF images

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Recognized standard |
| Confidence | High |

## Identification and observed structure

Museum still-image samples identify as GIF87a. Similar basenames do not prove equivalence to FLI animation.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/museum/newmjh/1938.GIF](../../corpus/museum/newmjh/1938.GIF)
- [corpus/museum/newmjh/1939.GIF](../../corpus/museum/newmjh/1939.GIF)
- [corpus/museum/newmjh/1940.GIF](../../corpus/museum/newmjh/1940.GIF)
- [corpus/museum/newmjh/1942.GIF](../../corpus/museum/newmjh/1942.GIF)
- [corpus/museum/newmjh/1943.GIF](../../corpus/museum/newmjh/1943.GIF)
- [corpus/museum/newmjh/1944.GIF](../../corpus/museum/newmjh/1944.GIF)

## Tool work item

P1: decode indexed pixels/palettes and preserve still-versus-animation roles.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
