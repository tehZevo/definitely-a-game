export class Vector2 {
  constructor(public x = 0, public y = 0) {}

  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  scale(s: number): Vector2 {
    return new Vector2(this.x * s, this.y * s);
  }

  length(): number {
    return Math.hypot(this.x, this.y);
  }

  normalize(): Vector2 {
    const len = this.length();
    return len === 0 ? new Vector2(0, 0) : new Vector2(this.x / len, this.y / len);
  }
}
