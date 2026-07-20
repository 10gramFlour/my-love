export type Duration = { years: number; months: number; days: number; hours: number; minutes: number; seconds: number };
export function relationshipDuration(startValue: string, now: Date): Duration {
  const start = new Date(startValue); let cursor = new Date(start);
  let years = now.getFullYear() - cursor.getFullYear();
  const anniversary = new Date(cursor); anniversary.setFullYear(cursor.getFullYear() + years);
  if (anniversary > now) years--; cursor.setFullYear(cursor.getFullYear() + years);
  let months = (now.getFullYear() - cursor.getFullYear()) * 12 + now.getMonth() - cursor.getMonth();
  const monthMark = new Date(cursor); monthMark.setMonth(cursor.getMonth() + months);
  if (monthMark > now) months--; cursor.setMonth(cursor.getMonth() + months);
  let remaining = Math.max(0, now.getTime() - cursor.getTime());
  const days = Math.floor(remaining / 86400000); remaining -= days * 86400000;
  const hours = Math.floor(remaining / 3600000); remaining -= hours * 3600000;
  const minutes = Math.floor(remaining / 60000); remaining -= minutes * 60000;
  return { years, months, days, hours, minutes, seconds: Math.floor(remaining / 1000) };
}
