# Classic packed articles: adaptive arithmetic codec

[Packed family](packed-format.md) · [Type definition](../docs/file-types/arithmetic.md)

Implementation: [platform-independent TypeScript](../tools/src/arithmetic.ts).
Validation: [real corpus and browser tests](packed.test.mjs).

## Discovery, October 11, 2026

The 30 book records rejected by the LZW decoder are **not corrupt or encrypted**.
They use a second compression method: a 16-bit adaptive arithmetic coder.

Matching flag-02 records in the July 1988 CACM corpus provided known plaintext.
LZW re-encoding reproduced ordinary flag-03 samples, but did not reproduce
flag-02 lengths or bytes. Equal-frequency adaptive Huffman probes also failed.
Static inspection of the retained book browser then exposed the arithmetic
interval arithmetic, cumulative frequencies, input-bit order and model updates.
The historical program was not executed.

## Observed layout and dispatch

- First 12 bytes are the unchanged first three article offset words.
- Remaining bytes are an arithmetic-coded stream, bits read **LSB-first within
  each byte**. The 16-bit code register is filled by shifting left and adding
  those bits.
- In the tested plus-1.0 index corpora, leading flags `02` select arithmetic;
  `03` select LZW. This is observed dispatch evidence, not a definition of every
  flag bit in every Hyperties release.
- Reassemble the prefix and decoded bytes, then validate the six-offset article
  header. Compressed lengths and decoded offsets are different units.

## Interval model

Initial interval: `low = 0`, `high = 65535`, with inclusive endpoints.
For a cumulative frequency total `T` and interval size `R = high - low + 1`:

```text
scaled = floor(((value - low + 1) * T - 1) / R)
choose rank s where cumulative[s] <= scaled < cumulative[s-1]
new high = low + floor(R * cumulative[s-1] / T) - 1
new low  = low + floor(R * cumulative[s] / T)
```

Renormalize in the lower half, upper half, or middle half using thresholds
`0x8000`, `0x4000` and `0xc000`. Shift the interval left, set its high low-bit
to one, and shift another input bit into the code register.

## Ranked adaptive frequencies

- 258 initially unit-frequency ranks, with cumulative totals descending from
  258 to zero. Rank zero has frequency zero.
- Ranks 1..257 initially map to values 0..256. The original browser writes the
  low byte of those values. Rank 258 is the explicit end symbol.
- After decoding, exchange the symbol with the first rank in its equal-frequency
  run, then increase that rank's frequency.
- Increment by **8** if `16383 - total > 8`, otherwise by **1**.
- At total **16383**, halve frequencies with upward rounding and rebuild the
  cumulative totals, scanning backwards.

The arithmetic implementation preserves these mechanics. The frequency-rescale
branch is recovered from static code; the 143 validated short records do not
establish complete behavior for every long-stream variant.

## Termination, limits and confidence

Arithmetic decoding reads ahead into implicit zero bits after the physical end
of the stream. The matched records require 6..13 such bits. The portable decoder
permits at most **14** zero lookahead bits, requires the explicit end symbol,
bounds output (default 8 MiB), checks intervals and validates the resulting
article header. This is deliberately stricter than the browser's much looser
exhausted-input guard; it does not manufacture unbounded padding.

There is no per-record checksum in this observed schema. A valid header alone
is not proof that arbitrary damaged input was decoded correctly. Preserve
original hashes and compare against loose originals whenever possible.

## Evidence

- **113 CACM arithmetic records** decode byte-for-byte to corresponding loose
  `.FIL` sources, including headers, links, reference lists and trailers.
- **All 30 formerly unsupported book records** decode with all six section
  delimiters and valid section offsets.
- The whole book now has **248 recovered records: 218 LZW + 30 arithmetic**.
- Arithmetic decoding also runs in the browser test context without `Buffer`.
- Truncated input and output-limit violations are exercised in tests.

Static reverse-engineering offsets are **file offsets**, not linked CPU addresses,
in the retained [book browser](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/browser.exe)
(SHA-256 available in the [source manifest](../manifests/SHA256SUMS)):

| File offset | Observation |
|---|---|
| `0x7ea8` | Arithmetic decoder initialization |
| `0x7eb7` | Cumulative-frequency symbol selection and interval updates |
| `0x7f29` | Half/middle-half renormalization |
| `0x7f86` | End rank `0x102` (258) |
| `0x7fc8` | Frequency rescaling at `0x3fff` |
| `0x7ff0` | Equal-frequency symbol exchange and adaptive increment |
| `0x8088` | LSB-first input-bit reader |
| `0x80e0` | Initial symbol mapping and cumulative-frequency tables |
| `0x8121` | Initial 16-bit code register |

Local failed probes and disassembly were research aids, not runtime dependencies.
No installed disassembler is needed to build, test or use the portable decoder.
