export function calculateDays(startDate: Date, endDate: Date): number {
  return (
    Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) +
    1
  );
}

export function dayOrDays(duration: number | string): string {
  let duration2 = duration;
  if (typeof duration2 === 'string') {
    duration2 = Number(duration2);
  }
  return duration2 + ' day' + (duration2 === 1 ? '' : 's');
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function dateFormatter(date: Date): string {
  return dateFormat.format(date);
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export function rgbDataURL(blurColor: string): string {
  const bigint = parseInt(blurColor, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
}

const nameMapping = new Map([
  ['Agent S', 'Agent_S'],
  ['Agent_S', 'Agent S'],
  ['Big Top', 'Big_Top'],
  ['Big_Top', 'Big Top'],
  ['Kid Cat', 'Kid_Cat'],
  ['Kid_Cat', 'Kid Cat'],
  ["O'Hare", 'O_Hare'],
  ['O_Hare', "O'Hare"],
  ['Renée', 'Renee'],
  ['Renee', 'Renée'],
  ['Wart Jr.', 'Wart_Jr.'],
  ['Wart_Jr.', 'Wart Jr.'],
  ['Étoile', 'Etoile'],
  ['Etoile', 'Étoile'],
]);

export function fixName(name: string): string {
  if (nameMapping.has(name)) {
    return nameMapping.get(name)!;
  }
  return name;
}
