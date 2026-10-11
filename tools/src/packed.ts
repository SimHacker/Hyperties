import { FormatError, parseArticle } from './records.js';

function concat(parts: readonly Uint8Array[], length: number): Uint8Array {
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.length; }
  return result;
}
function extend(prefix: Uint8Array, byte: number): Uint8Array {
  const result = new Uint8Array(prefix.length + 1);
  result.set(prefix); result[prefix.length] = byte;
  return result;
}

// Observed classic BIGFILE.TIE dialect: 12 raw bytes, then LSB-first LZW.
export function decodePackedArticle(bytes: Uint8Array, { maxOutputBytes = 8 * 1024 * 1024 }: { maxOutputBytes?: number } = {}) {
  if (bytes.length < 14) throw new FormatError('PACKED_SHORT', 'Packed record is too short');
  if (!Number.isSafeInteger(maxOutputBytes) || maxOutputBytes < 12) {
    throw new FormatError('PACKED_LIMIT', 'Output limit must be a positive safe integer of at least 12');
  }
  let bit = 96, width = 9, next = 258, ended = false, cleared = false, total = 12;
  let previous: Uint8Array | null = null;
  let dictionary: (Uint8Array | undefined)[] = [];
  const output: Uint8Array[] = [bytes.subarray(0, 12)];
  function reset() {
    dictionary = Array.from({ length: 256 }, (_, n) => Uint8Array.of(n));
    width = 9; next = 258; previous = null;
  }
  reset();
  while (bit + width <= bytes.length * 8) {
    let code = 0;
    for (let i = 0; i < width; i++, bit++) code |= ((bytes[bit >> 3] >> (bit % 8)) & 1) << i;
    if (!cleared && code !== 256) throw new FormatError('PACKED_CLEAR', 'Stream must begin with clear code 256');
    if (code === 256) { reset(); cleared = true; continue; }
    if (code === 257) { ended = true; break; }
    const value: Uint8Array | null = dictionary[code] ?? (code === next && previous ? extend(previous, previous[0]) : null);
    if (!value) throw new FormatError('PACKED_CODE', `Invalid code ${code}, next ${next}, bit ${bit}`);
    total += value.length;
    if (total > maxOutputBytes) throw new FormatError('PACKED_LIMIT', 'Decoded output exceeds limit');
    output.push(value);
    if (previous && next < 4096) {
      dictionary[next++] = extend(previous, value[0]);
      if (width < 12 && next === 1 << width) width++;
    }
    previous = value;
  }
  if (!ended) throw new FormatError('PACKED_END', 'Missing LZW end code 257');
  const decoded = concat(output, total);
  const article = parseArticle(decoded);
  return { decoded, article, consumedBits: bit, trailingBits: bytes.length * 8 - bit };
}
