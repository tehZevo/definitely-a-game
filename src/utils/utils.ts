const JOIN_CODE_LENGTH = 5;
const JOIN_CODE_CHARS = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export function createJoinCode(length = JOIN_CODE_LENGTH): string {
  return Array.from({ length }, () => JOIN_CODE_CHARS[Math.floor(Math.random() * JOIN_CODE_CHARS.length)]).join('');
}

export function dictOp(a: Record<string, number>, b: Record<string, number>, op: (x: number, y: number) => number): Record<string, number> {
  const result: Record<string, number> = {};
  for (const key of Object.keys(a)) {
    result[key] = op(a[key], b[key]);
  }
  return result;
}

export function angleDistance(a: number, b: number): number {
  let dist = b - a;
  dist = ((dist + 180) % 360) - 180;
  return dist;
}
