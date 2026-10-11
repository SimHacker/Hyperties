const CP437 = 'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ';

// Explicit access-copy profile; original text still uses byte-preserving views.
export function displayCP437(text: string): string {
  return [...text].map(c => {
    const n = c.charCodeAt(0);
    if (n >= 128 && n <= 255) return CP437[n - 128];
    if (n === 7) return '•';
    if (n === 1) return '☺';
    if (n === 26) return '';
    if (n < 32 && !['\n', '\r', '\t'].includes(c)) return `[0x${n.toString(16).padStart(2, '0')}]`;
    return c;
  }).join('');
}
