export interface Axis {
  x: number;
  y: number;
}

export interface InputSource {
  getAxis(): Axis;
}

const KEY_MAP: Record<string, Axis> = {
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
};

export class KeyboardInput implements InputSource {
  private keys = new Set<string>();

  constructor(target: Window) {
    target.addEventListener('keydown', (e) => this.keys.add(e.code));
    target.addEventListener('keyup', (e) => this.keys.delete(e.code));
  }

  getAxis(): Axis {
    const axis: Axis = { x: 0, y: 0 };
    for (const code of this.keys) {
      const mapped = KEY_MAP[code];
      if (mapped) {
        axis.x += mapped.x;
        axis.y += mapped.y;
      }
    }
    return {
      x: Math.max(-1, Math.min(1, axis.x)),
      y: Math.max(-1, Math.min(1, axis.y)),
    };
  }
}

export class FakeInput implements InputSource {
  constructor(private ax = 0, private ay = 0) {}

  getAxis(): Axis {
    return { x: this.ax, y: this.ay };
  }
}
