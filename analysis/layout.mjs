export const collectionGroups = {
  'books-and-literature': ['ACM', 'CACM-Hypertext Conference issue July 1988', 'HHO-Hypertext on Hypertext book-1988', 'cr', 'sigchi', 'horror', 'red-mask'],
  museum: ['oldmjh', 'newmjh'],
  'personal-history': ['family'],
  'hyperties-demos': ['ecs', 'ht30glos', 'ht30tour', 'htuis', 'htuism', 'microtou', 'tour30', 'tour7_91', 'hat'],
  'subject-and-institutional': ['AIDS', 'chim', 'cmsc', 'frame', 'hfind', 'hpguide', 'landscap', 'redsk', 'rogers', 'toronto', 'usna', 'wine'],
  'program-examples': ['pascal', 'program'],
};
export const pathMap = Object.fromEntries(Object.entries(collectionGroups).flatMap(([group, names]) =>
  names.map(name => [name, `corpus/${group}/${name}`])));
Object.assign(pathMap, {
  'Hyperties User Manual (1).pdf': 'reference/manuals/Hyperties User Manual.pdf',
  'oldmjh-Texts from Austria and the Holocaust.docx': 'reference/museum/oldmjh-Texts from Austria and the Holocaust.docx',
  'oldmjh-images.pdf': 'reference/museum/oldmjh-images.pdf',
});
export function relocatedPath(original) {
  const first = original.split('/')[0];
  return pathMap[first] ? pathMap[first] + original.slice(first.length) : original;
}
export function originalPath(current) {
  for (const [old, destination] of Object.entries(pathMap)) {
    if (current === destination || current.startsWith(destination + '/')) return old + current.slice(destination.length);
  }
  return current;
}
