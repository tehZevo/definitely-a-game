export function barWidth(
  current: number,
  max: number,
  maxWidth: number,
): number {
  if (max <= 0) return 0;
  const ratio = Math.max(0, Math.min(1, current / max));
  return Math.round(ratio * maxWidth);
}
