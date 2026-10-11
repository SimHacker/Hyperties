export class FormatError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'FormatError';
  }
}

// A reversible byte view, not a claim about the original display encoding.
export function byteText(bytes: Uint8Array): string {
  let text = '';
  for (let start = 0; start < bytes.length; start += 8192) {
    text += String.fromCharCode(...bytes.subarray(start, start + 8192));
  }
  return text;
}
export function littleEndian32(bytes: Uint8Array, offset: number): number {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, true);
}
function hex(text: string): string {
  return [...text].map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}
export interface ArticleSection {
  start: number;
  end: number;
  text: string;
  hasSeparator: boolean;
}
export interface Article {
  offsets: number[];
  sections: ArticleSection[];
  heading: string;
  description: string;
  body: string;
  referenceNames: string[];
  fifthSection: string;
  trailer: string;
}
export function parseArticle(bytes: Uint8Array): Article {
  if (bytes.length < 24) throw new FormatError('SHORT_HEADER', `Expected 24-byte header, got ${bytes.length}`);
  const offsets = Array.from({ length: 6 }, (_, i) => littleEndian32(bytes, i * 4));
  if (offsets[0] !== 24) throw new FormatError('HEADER_START', `First offset is ${offsets[0]}, not 24`);
  if (offsets.some((n, i) => n > bytes.length || n < 24 || (i > 0 && n < offsets[i - 1]))) {
    throw new FormatError('OFFSET_RANGE', 'Section offsets must be ordered and within the record');
  }
  const sections = offsets.map((start, i) => {
    const end = offsets[i + 1] ?? bytes.length;
    const raw = byteText(bytes.subarray(start, end));
    const separator = raw.match(/(?:\r?\n)?\|(?:\r?\n)?$/);
    return { start, end, text: separator ? raw.slice(0, separator.index) : raw, hasSeparator: Boolean(separator) };
  });
  return {
    offsets, sections, heading: sections[0].text, description: sections[1].text,
    body: sections[2].text, referenceNames: sections[3].text.split(/\r?\n/).filter(Boolean),
    fifthSection: sections[4].text, trailer: sections[5].text,
  };
}
export interface LegacyIndexRecord {
  line: number;
  title: string;
  basename: string;
  flagsHex: string;
  aliases: string[];
}
export interface PackedIndexRecord extends LegacyIndexRecord {
  offset: number;
  length: number;
}
export function parseIndex(bytes: Uint8Array): PackedIndexRecord[] {
  const lines = byteText(bytes).split(/\r?\n/);
  if (lines.shift() !== '+1.0 Index') throw new FormatError('INDEX_HEADER', 'Expected +1.0 Index');
  const records: PackedIndexRecord[] = [];
  for (const [i, line] of lines.entries()) {
    if (!line || line === '\x1a') continue;
    const fields = line.split('|');
    if (fields.length < 6 || !fields[0] || !fields[1] || !/^\d+$/.test(fields[3]) || !/^\d+$/.test(fields[4])) {
      throw new FormatError('INDEX_RECORD', `Invalid index record on line ${i + 2}`);
    }
    const offset = Number(fields[3]), length = Number(fields[4]);
    if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || !Number.isSafeInteger(offset + length)) {
      throw new FormatError('INDEX_INTEGER', `Unsafe integer on line ${i + 2}`);
    }
    records.push({ line: i + 2, title: fields[0], basename: fields[1],
      flagsHex: hex(fields[2]), offset, length, aliases: fields.slice(5).filter(Boolean) });
  }
  return records;
}
export function parseLegacyIndex(bytes: Uint8Array): LegacyIndexRecord[] {
  const lines = byteText(bytes).split(/\r?\n/);
  const header = lines.shift();
  if (!header?.startsWith('Entry|') || !header.includes('File|')) {
    throw new FormatError('LEGACY_INDEX_HEADER', 'Expected Entry/File column header');
  }
  return lines.flatMap((line, i) => {
    if (!line) return [];
    if (line === '\x19' || line === '\x1a') {
      if (lines.slice(i + 1).some(next => next !== '')) throw new FormatError('LEGACY_INDEX_TRAILING', 'Data after index terminator');
      return [];
    }
    const fields = line.split('|');
    if (fields.length < 4 || !fields[0] || !fields[1]) {
      throw new FormatError('LEGACY_INDEX_RECORD', `Invalid legacy index record on line ${i + 2}`);
    }
    return [{ line: i + 2, title: fields[0], basename: fields[1],
      flagsHex: hex(fields[2]), aliases: fields.slice(3).filter(Boolean) }];
  });
}
export function checkPackedRanges(records: readonly PackedIndexRecord[], bytes: number) {
  const sorted = [...records].sort((a, b) => a.offset - b.offset);
  let end = 0;
  const gaps: { start: number; end: number }[] = [];
  const overlaps: { basename: string; offset: number; previousEnd: number }[] = [];
  const outOfBounds: string[] = [];
  for (const r of sorted) {
    if (r.offset > end) gaps.push({ start: end, end: r.offset });
    if (r.offset < end) overlaps.push({ basename: r.basename, offset: r.offset, previousEnd: end });
    if (r.offset + r.length > bytes) outOfBounds.push(r.basename);
    end = Math.max(end, r.offset + r.length);
  }
  if (end < bytes) gaps.push({ start: end, end: bytes });
  return { records: records.length, bytes, coveredEnd: end, gaps, overlaps, outOfBounds,
    exactPartition: sorted.length > 0 && end === bytes && !gaps.length && !overlaps.length && !outOfBounds.length };
}
export interface MarkupLink {
  syntax: 'angle' | 'tilde';
  label: string;
  target: string;
  offset: number;
}
export interface Directive {
  name: string;
  value: string | null;
  raw: string;
  offset: number;
}
export function scanMarkup(text: string, baseOffset = 0) {
  const links: MarkupLink[] = [], directives: Directive[] = [];
  const diagnostics: { code: string; message: string }[] = [];
  const claimed: [number, number][] = [];
  for (const match of text.matchAll(/<L>([\s\S]*?)<\\L=([^>]+)>/gi)) {
    links.push({ syntax: 'angle', label: match[1], target: match[2], offset: baseOffset + match.index });
    claimed.push([match.index, match.index + match[0].length]);
  }
  for (const match of text.matchAll(/~([^~\r\n]+)~/g)) {
    if (!claimed.some(([a, b]) => match.index >= a && match.index < b)) {
      links.push({ syntax: 'tilde', label: match[1], target: match[1], offset: baseOffset + match.index });
    }
  }
  for (const match of text.matchAll(/@([A-Za-z]+)(?:=(?:"([^"]*)"|([^\s@]+))|([+-]?\d+))?/g)) {
    directives.push({ name: match[1].toLowerCase(), value: match[2] ?? match[3] ?? match[4] ?? null,
      raw: match[0], offset: baseOffset + match.index });
  }
  if ([...text.matchAll(/~/g)].length % 2) diagnostics.push({ code: 'UNPAIRED_TILDE', message: 'Odd tilde count; requires dialect-aware review' });
  if ([...text.matchAll(/<L>/gi)].length !== links.filter(l => l.syntax === 'angle').length) {
    diagnostics.push({ code: 'UNPARSED_ANGLE_LINK', message: 'Not every angle-link opener was recognized' });
  }
  links.sort((a, b) => a.offset - b.offset);
  return { links, directives, diagnostics };
}
