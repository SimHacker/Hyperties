# Formats we can now describe and test

[Back to the welcome page](README.md)

The format readers are written in TypeScript using `Uint8Array` and `DataView`,
with no filesystem, network or Node-only APIs in the core. Node adapters perform
inventory/export work; a browser bundle uses the same decoding code.

## Format map

See the **[complete file-type registry](file-types/README.md)** for all surveyed
suffixes, standard/bespoke/unknown classifications, retained/publication counts,
linked definition placeholders and proposed tool work items. Named `.TIE`
schemas are documented separately rather than conflating the extension.

| Family | Role | Current understanding |
|---|---|---|
| `.FIL` | Article records | Header, sections, classic links and many reference lists parsed |
| `INDEX.NEW` | Plus-1.0 index | Titles, basenames, flags, packed ranges and aliases parsed |
| `INDEX.TIE` | Legacy Entry/File index | Different schema; titles, basenames, status bytes and aliases parsed |
| `BIGFILE.TIE` | Packed articles | Classic LZW subset decoded; second codec unresolved |
| `BIGRAPH.TIE`, graphic indexes | Packed graphics | Retained; extraction/schema work ahead |
| `.STL`, `.GRB` | Styles and graphical-link definitions | Readable script examples identified; full grammar and binary forms unresolved |
| `.ELB`, `.HDT` and `.H*` companions | Later databases and indexes | Roles and structural clues observed; complete decoding ahead |
| `.PBB`, `.TGF`, `.PAL`, `.PIC` | Fonts, palette and picture-related data | Mixed confidence; original evidence retained |
| PCX, GIF, FLI, TIFF | Standard image/animation formats | Signatures identified; modern access rendering to follow |
| DOS EXE/COM | Historical tools | Distinct versions retained once for optional format/algorithm research |

Extensions are not authoritative schemas. Some application headers falsely
match unrelated MATLAB, PDP-11 or Windows file signatures.

## Loose article record

```text
header = six unsigned 32-bit little-endian offsets
offset[0] = 24
24 <= offset[i] <= file length
offsets are nondecreasing

section[i] = bytes from offset[i] to the next offset
last section ends at file length
```

Observed sections: heading, short description, body, reference list, an
additional unresolved section, and a trailer often containing a build label.
Terminal line-delimited bars are recorded; interior bars and original bytes
are preserved.

Positions are byte-based. Latin-1 is used as a reversible inspection view,
**not** as a claim about original encoding. CP437 is an explicit access-display
profile; Japanese and other encoding cases require separate investigation.

## Two index dialects

```text
INDEX.NEW:
  "+1.0 Index"
  title | basename | flags | offset | length | aliases...

legacy INDEX.TIE:
  Entry/File tagged-column header
  title | basename | status bytes | aliases...
```

The legacy index does not inherit offset/length meanings from the newer schema.
Control/status bytes are preserved, not assigned invented interpretations.

## Verified packed LZW subset

```text
first 12 bytes       copied unchanged from the article header
remaining bytes     LSB-first LZW stream
clear code          256
end code            257
literal codes       0..255
dictionary starts   258
code widths         9 through 12 bits
```

The decoder handles dictionary resets and the special next-slot case, bounds
its output, requires clear/end codes, and validates reconstructed article
sections.

**Evidence:** 218 book records decode into valid article structures; 49
comparable ACM records match original loose files byte-for-byte. A real joke
record also decodes in the browser with no `Buffer` global.

Thirty book records do not use this tested stream. They remain unsupported,
not silently decoded, dropped or labelled corrupt.

## Syntax versus semantics

The scanner recognizes classic `~label~` links, later angle-link syntax and
directive tokens. It retains raw spellings and positions. It does not execute
imported commands or claim complete layout semantics.

Target lookup preserves ambiguity. Where all detected links are classic links
and their count matches the nonempty stored reference list, ordered basename
correspondence provides stronger evidence. That rule is conditional—not a
universal assumption for every dialect.

## Verification status

Thirteen tests cover malformed headers, index dialects, range arithmetic,
markup positions, corpus counts, LZW coverage, byte-identical source recovery
and browser/Node compatibility. A separate archive verifier reconciles approved
removals and checks retained historical file hashes.

The [shared TypeScript tools](../tools/README.md), [full technical notes](../analysis/README.md)
and [retained historical sources](collections.md) are included in this repository.
Build outputs, full access exports and private/local audit manifests are
regenerated rather than committed. This is a working restoration toolkit, not
yet an exact emulator of the historical interface.
