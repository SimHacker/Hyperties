import { FormatError, parseArticle } from './records.js';

// Recovered from the DOS browser: 16-bit intervals, LSB-first input, ranked adaptive model.
export function decodeArithmeticArticle(bytes: Uint8Array, { maxOutputBytes = 8 * 1024 * 1024 }: { maxOutputBytes?: number } = {}) {
  if (bytes.length < 14) throw new FormatError('ARITHMETIC_SHORT', 'Packed record is too short');
  if (!Number.isSafeInteger(maxOutputBytes) || maxOutputBytes < 12) {
    throw new FormatError('ARITHMETIC_LIMIT', 'Output limit must be a safe integer of at least 12');
  }
  let bit = 96, low = 0, high = 65535, value = 0;
  const cumulative = Array.from({ length: 259 }, (_, i) => 258 - i);
  const frequency: number[] = Array.from({ length: 259 }, (_, i) => i === 0 ? 0 : 1);
  const symbols = Array.from({ length: 259 }, (_, i) => i - 1);
  const output: number[] = [];
  function readBit(): number {
    // Arithmetic termination leaves the decoder looking ahead into implicit zeros.
    if (bit >= bytes.length * 8 + 14) throw new FormatError('ARITHMETIC_END', 'Missing arithmetic end symbol or truncated stream');
    const result = bit < bytes.length * 8 ? (bytes[bit >> 3] >> (bit % 8)) & 1 : 0;
    bit++;
    return result;
  }
  for (let i = 0; i < 16; i++) value = value * 2 + readBit();
  while (true) {
    if (value < low || value > high) throw new FormatError('ARITHMETIC_INTERVAL', 'Code value outside arithmetic interval');
    const range = high - low + 1;
    const scaled = Math.floor(((value - low + 1) * cumulative[0] - 1) / range);
    let symbol = 1;
    while (cumulative[symbol] > scaled) symbol++;
    high = low + Math.floor(range * cumulative[symbol - 1] / cumulative[0]) - 1;
    low += Math.floor(range * cumulative[symbol] / cumulative[0]);
    while (true) {
      if (high < 32768) {
        // Lower half: no subtraction needed.
      } else if (low >= 32768) {
        value -= 32768; low -= 32768; high -= 32768;
      } else if (low >= 16384 && high < 49152) {
        value -= 16384; low -= 16384; high -= 16384;
      } else break;
      low *= 2; high = high * 2 + 1; value = value * 2 + readBit();
    }
    if (symbol === 258) break;
    if (output.length + 12 >= maxOutputBytes) throw new FormatError('ARITHMETIC_LIMIT', 'Decoded output exceeds limit');
    output.push(symbols[symbol] & 255);
    if (cumulative[0] === 16383) {
      let sum = 0;
      for (let i = 258; i >= 0; i--) {
        frequency[i] = (frequency[i] + 1) >> 1;
        cumulative[i] = sum;
        sum += frequency[i];
      }
    }
    let rank = symbol;
    while (frequency[rank] === frequency[rank - 1]) rank--;
    if (rank < symbol) [symbols[rank], symbols[symbol]] = [symbols[symbol], symbols[rank]];
    const delta = 16383 - cumulative[0] > 8 ? 8 : 1;
    frequency[rank] += delta;
    for (let i = rank - 1; i >= 0; i--) cumulative[i] += delta;
  }
  const decoded = new Uint8Array(12 + output.length);
  decoded.set(bytes.subarray(0, 12));
  decoded.set(output, 12);
  return { decoded, article: parseArticle(decoded), consumedBits: bit,
    paddingBits: Math.max(0, bit - bytes.length * 8), trailingBits: Math.max(0, bytes.length * 8 - bit) };
}
