export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export const formatDaysRange = (days: number) => {
  if (days <= 7) return "last week";
  if (days <= 31) return "last month";
  if (days <= 92) return "last quarter";
  if (days <= 366) return "last year";
  return `last ${Math.floor(days / 365)} years`;
};
