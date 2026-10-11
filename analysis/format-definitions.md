# Executable format notes: syntax and semantics

This document accompanies [the shared TypeScript records module](../tools/src/records.ts) and its
[tests](records.test.mjs). It defines the **observed subset**, not a complete
vendor specification. Original bytes remain authoritative. No historical
executable is run or required by these readers.

## Article record: `.FIL`

```text
header       = six unsigned little-endian 32-bit offsets
offset[0]    = 24
24 <= offset[i] <= file length
offset[i] <= offset[i+1]
section[i]  = bytes[offset[i] : offset[i+1]], i = 0..4
section[5]  = bytes[offset[5] : file length]
```

Every section's raw start/end is preserved. The reader removes at most one
terminal line-delimited `|` marker from its interpreted text. It does not remove
interior bars or rewrite CRLF/LF. Missing terminal markers are recorded, not
silently reconstructed.

| Section | Observed interpretation | Confidence |
|---|---|---|
| 0 | Heading/title | High, many readable records |
| 1 | Short description | High; preview behavior is described in manual |
| 2 | Article body including directives and visible link markers | High |
| 3 | Ordered reference basenames in many classic records | Strong corpus evidence, conditional |
| 4 | Additional/unknown section, often empty | Unresolved; not discarded |
| 5 | Version/build trailer in many records | Observed; not assumed universal |

Error codes: `SHORT_HEADER`, `HEADER_START`, `OFFSET_RANGE`. An imported text
file with a `.FIL` suffix is not automatically a damaged binary record: CHIM has
such a source example. The catalog reports it as unsupported by this reader,
without modifying it.

### Text and positions

The current reader uses Latin-1 to preserve a one-byte-to-one-character
inspection mapping. This is **not an encoding identification**. DOS box drawing
and Japanese data need explicit encoding profiles before creating access text.
All source positions are byte offsets. A UTF-8 decode before slicing would
invalidate offset arithmetic.

### Body markup: partial grammar

```text
classic-link = "~" label-without-tilde-or-newline "~"
angle-link   = "<L>" label "<\L=" target ">"
directive    = "@" alphabetic-name [ "=" value | signed-integer ]
value        = quoted-string | non-whitespace-token
```

The scanner recognizes these forms, retains raw spelling and position, and
reports unpaired tilde/unparsed angle-link leads. It is not yet a full grammar:
escaping, typography, literal marker characters, multiline commands and nested
script behavior need additional fixtures. Directives are **not executed**.

Examples of semantic families:

- layout/text: `@s`, `@t`, `@p`, `@l`, `@r`;
- graphics: `@g`, `@b` (names may refer to files or symbolic graphic objects);
- 3.0 resources: `@stylesheet`, `@font`;
- external actions: `@z` (described as imported behavior, never host execution);
- numeric article references: `<\L=#...>` require a later ID-index mapping.

Exact command meanings depend on dialect; alphabetic tokenization alone must not
be used as the renderer's interpretation.

## `INDEX.NEW`: plus-1.0 packed-range index

```text
header = "+1.0 Index" newline
record = title "|" basename "|" flags "|" offset "|" length "|"
         [alias "|"]* newline
offset, length = nonnegative decimal integers
```

The parser preserves control bytes in `flagsHex` rather than inventing status
bit meanings. It checks safe integer arithmetic and malformed rows explicitly.
Titles, basenames and aliases are separate fields; historical misspellings and
synonyms remain evidence.

The offset/length pair is tested against the same-directory `BIGFILE.TIE`:
gaps, overlaps, out-of-bounds ranges and covered end are reported. For HHO,
**248 ranges form an exact contiguous partition of 206,205 bytes**.
That establishes stored-record boundaries, **not** the decompression algorithm
or decoded article lengths.

The observed leading words of packed data can resemble a loose article header,
but that does not mean the full store can be read by the loose `.FIL` parser.
The LZW subset now has a [tested decoder and local access export](packed-format.md).
The other 30 book records now decode with the
[adaptive arithmetic codec](arithmetic-format.md), validated against 113 CACM originals.

## `INDEX.TIE`: legacy Entry/File index

```text
header = "Entry|" tagged-columns including "File|"
record = title "|" basename "|" status-bytes "|" [alias "|"]* newline
terminal = 0x19 or 0x1a, when present at end after records
```

This is **not** the same schema as `INDEX.NEW`: it has no assumed numeric
offset/length columns. The museum index uses a final `0x19`; the reader rejects
data following that terminal. Control-tagged header fields and status values
are observed, not fully decoded.

The museum's 478 entries exceed its 402 loose article records. An entry may name
a placeholder, missing input or another storage representation. Status-byte
meaning and packed coverage need investigation before calling each such entry
"lost content."

## Link semantics: layered evidence

The [catalog builder](catalog.mjs) never silently chooses between ambiguous
targets:

1. Scope title/basename/index-alias lookup to the article's original directory.
2. Retain all candidate targets; report zero, one or multiple candidates.
3. If **all** detected body links are classic tilde links, the stored reference
   list is nonempty, and its count equals the link count, compare corresponding
   positions. The matching basename's loose file is a stronger candidate.
4. Report missing stored references explicitly.
5. Leave numeric IDs unresolved until the relevant index schema is known.

The ordered correspondence is strongly supported by museum records such as
`1880S.FIL`, but equal counts are not proof for every dialect. Current statuses
are evidence categories (`stored-reference-candidate`, `resolved-candidate`,
`ambiguous`, etc.), not a claim of tested browser navigation.

## Coverage and next definitions

The non-family corpus yields **1,583 parsed loose articles**, **40 parsed index
files**, and **4,069 index rows**. Row counts are across both dialects and may
describe the same articles twice; they are not a unique-article count.

Five CHIM paths remain explicit parse issues. The catalog does not scan raw
private genealogy or export full article text.

Next specifications should extend arithmetic-codec fixtures and cover `.HDT` record
boundaries and IDs, stylesheet/graphic-object grammar, CP437/Japanese encodings,
fonts and media. Each definition should come with a minimal synthetic fixture,
a real corpus check, and documented uncertainty.
