# Classic packed articles: verified LZW dialect

Implementation: [shared TypeScript decoder](../tools/src/packed.ts).
Tests: [packed fixtures and corpus checks](packed.test.mjs).

## Observed layout

```text
record[0..11]   = first three loose-article offset words, copied unchanged
record[12..]    = LSB-first LZW bitstream
first code     = 256 (clear/reset)
literal codes  = 0..255
end code       = 257
dictionary     = begins at 258
code width     = starts at 9, grows through 12
```

After emitting a string, add `previous + firstByte(current)` to the dictionary.
The special code equal to the next dictionary slot means
`previous + firstByte(previous)`. Increase width when the next available slot
reaches `2^width` after insertion. A clear code resets width and dictionary.

The reconstructed record consists of the 12-byte prefix followed by the
decompressed bytes. It is then validated by the ordinary article reader.
Output is bounded (default 8 MiB per record); invalid codes, absent clear/end
markers and output-limit violations produce explicit errors.

This is a classic per-record stream, not ZIP/ARC and not an instruction to run a
historical browser. Stored byte ranges come from the plus-1.0 index. Do not use
decoded section offsets to slice compressed bytes.

## Evidence

- **218 HHO records** decode with valid section boundaries and all six terminal
  section delimiters.
- Each has only 0..7 trailing bits after its end code.
- **49 ACM records** decode byte-for-byte to their original `.FIL` files:
  headers, bodies, reference lists and trailers all match.
- All six hyper-joke records are recovered, including the ordered choice targets.
- The same TypeScript code decodes a real joke record in Node and the browser;
  the browser test confirms no `Buffer` global is present.

This gives stronger validation than merely generating recognizable prose.

## Second codec: now recovered

The book has 30 additional records whose leading status/flag byte is `02`,
rather than `03` for the 218 records successfully decoded here. They do not begin
with the LZW clear code at the tested position. They use
[adaptive arithmetic coding](arithmetic-format.md), not LZW.

This set includes ASCII, brief descriptions, buttons, icons, hyperhumor and other
concepts. All 30 now decode successfully. Recovery dispatches by the observed
index flags rather than silently retrying arbitrary codecs. The LZW-only API
continues to reject arithmetic streams.

The arithmetic reader matches 113 CACM loose records exactly. The book is now
fully recovered at the record/text level: 218 LZW plus 30 arithmetic records.
Graphics, command semantics and later database families remain separate tasks.

## Reading-room interpretation

The prototype preserves raw markup in a disclosure panel and shows unimplemented
commands visibly in the access body. It supports title/alias search, article
navigation, click-for-definition/double-click-to-follow, browser history and explicit
unresolved targets.

An opt-in browser speech-synthesis control reads the displayed definition on
single click (or the first Enter activation). Speech is off by default and
stops on another selection, navigation or disabling the control. Unsupported
browsers and speech errors are reported visibly; the text preview remains
available. There is no microphone access or speech recognition in this feature.
The compact toolbar's fixed-width Speak/Stop button provides explicit playback independently
of its Definitions and Articles checkboxes. Articles automatically reads once per
visit; toggling it again does not replay an already-started article. Navigation
resets that memory, and Speak can always replay it. Playback uses
the rendered article text, or the original description for a definition-only
record, preceded by the title. Unimplemented command tokens are always hidden
in the reading view and remain intact in the original markup.

Link delimiters are hidden in the reading view. For original box-drawing lines,
spacing is measured against the preceding border so removing delimiters does
not move the closing edge. No new link glyphs or box graphics are invented;
the raw disclosure retains the original bytes and markers.

It does **not** emulate original page layout, exact reveal timing, fonts,
graphics, printing or external-program behavior. CP437 is a named access profile,
not universal encoding detection. Historical text is not silently corrected.
The next renderer can interpret commands once their grammar and semantics are
tested.
