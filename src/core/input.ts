import { DEFAULT_KEY_MAP, type MovementDirection } from './keyMap';

export interface Axis {
  x: number;
  y: number;
}

export interface InputSource {
  getAxis(): Axis;
  isPressed(code: string): boolean;
}

export function normalizeKeyCode(code: string): string {
  return code === 'NumpadEnter' ? 'Enter' : code;
}

const MOVEMENT_VECTORS: Record<MovementDirection, Axis> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEY_MAP: Record<string, Axis> = Object.fromEntries(
  Object.entries(DEFAULT_KEY_MAP.movement).flatMap(([direction, codes]) =>
    codes.map((code) => [code, MOVEMENT_VECTORS[direction as MovementDirection]]),
  ),
);

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

  isPressed(code: string): boolean {
    const wanted = normalizeKeyCode(code);
    for (const key of this.keys) {
      if (normalizeKeyCode(key) === wanted) return true;
    }
    return false;
  }
}

export class FakeInput implements InputSource {
  constructor(
    private ax = 0,
    private ay = 0,
    private attack = false,
    private pressed: string[] = [],
  ) {}

  getAxis(): Axis {
    return { x: this.ax, y: this.ay };
  }

  isPressed(code: string): boolean {
    const wanted = normalizeKeyCode(code);
    if (this.attack && wanted === 'Space') return true;
    return this.pressed.some((key) => normalizeKeyCode(key) === wanted);
  }
}
