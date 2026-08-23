const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function monthLabel(iso: string): string {
  const date = parseIsoDate(iso);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDate(iso: string): string {
  const date = parseIsoDate(iso);
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function monthSortKey(iso: string): string {
  return iso.slice(0, 7); // "YYYY-MM", sorts chronologically as a string
}
