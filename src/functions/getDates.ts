export function getFirstDayOfMonth(month: string, year: string) {
  return new Date(Number(year), Number(month) - 1, 1)
    .toISOString()
    .slice(0, 10);
}

export function getLastDayOfMonth(month: string, year: string) {
  return new Date(Number(year), Number(month), 0).toISOString().slice(0, 10);
}

export function getNextAndPreviousYears(
  currentYear: number,
  range: number = 2
) {
  const years = [];

  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i);
  }

  return years;
}
