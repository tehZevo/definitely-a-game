import { Axis, InputSource } from './input';

export interface TouchJoystickOptions {
  radius: number;
  deadZone: number;
}

const DEFAULT_OPTIONS: TouchJoystickOptions = {
  radius: 50,
  deadZone: 0.15,
};

interface ActiveTouch {
  id: number;
  originX: number;
  originY: number;
  currentX: number;
  currentY: number;
}

export class TouchJoystick implements InputSource {
  private moveTouch: ActiveTouch | null = null;
  private attackTouch: ActiveTouch | null = null;
  private opts: TouchJoystickOptions;
  private el: HTMLElement;
  private handlers: {
    start: (e: TouchEvent) => void;
    move: (e: TouchEvent) => void;
    end: (e: TouchEvent) => void;
  };

  constructor(el: HTMLElement, opts?: Partial<TouchJoystickOptions>) {
    this.el = el;
    this.opts = { ...DEFAULT_OPTIONS, ...opts };
    this.handlers = {
      start: (e) => this.onTouchStart(e),
      move: (e) => this.onTouchMove(e),
      end: (e) => this.onTouchEnd(e),
    };
    this.el.addEventListener('touchstart', this.handlers.start, { passive: true });
    this.el.addEventListener('touchmove', this.handlers.move, { passive: true });
    this.el.addEventListener('touchend', this.handlers.end, { passive: true });
    this.el.addEventListener('touchcancel', this.handlers.end, { passive: true });
  }

  destroy(): void {
    this.el.removeEventListener('touchstart', this.handlers.start);
    this.el.removeEventListener('touchmove', this.handlers.move);
    this.el.removeEventListener('touchend', this.handlers.end);
    this.el.removeEventListener('touchcancel', this.handlers.end);
  }

  private isLeftHalf(x: number): boolean {
    return x < this.el.clientWidth / 2;
  }

  private onTouchStart(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (this.isLeftHalf(t.clientX)) {
        if (this.moveTouch === null) {
          this.moveTouch = {
            id: t.identifier,
            originX: t.clientX,
            originY: t.clientY,
            currentX: t.clientX,
            currentY: t.clientY,
          };
        }
      } else {
        if (this.attackTouch === null) {
          this.attackTouch = {
            id: t.identifier,
            originX: t.clientX,
            originY: t.clientY,
            currentX: t.clientX,
            currentY: t.clientY,
          };
        }
      }
    }
  }

  private onTouchMove(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (this.moveTouch && t.identifier === this.moveTouch.id) {
        this.moveTouch.currentX = t.clientX;
        this.moveTouch.currentY = t.clientY;
      }
    }
  }

  private onTouchEnd(e: TouchEvent): void {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (this.moveTouch && t.identifier === this.moveTouch.id) {
        this.moveTouch = null;
      }
      if (this.attackTouch && t.identifier === this.attackTouch.id) {
        this.attackTouch = null;
      }
    }
  }

  getMoveOrigin(): { x: number; y: number } | null {
    if (!this.moveTouch) return null;
    return { x: this.moveTouch.originX, y: this.moveTouch.originY };
  }

  getMoveKnob(): { x: number; y: number } | null {
    if (!this.moveTouch) return null;
    const dx = this.moveTouch.currentX - this.moveTouch.originX;
    const dy = this.moveTouch.currentY - this.moveTouch.originY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clamped = Math.min(dist, this.opts.radius);
    if (dist === 0) return { x: this.moveTouch.originX, y: this.moveTouch.originY };
    const nx = dx / dist;
    const ny = dy / dist;
    return {
      x: this.moveTouch.originX + nx * clamped,
      y: this.moveTouch.originY + ny * clamped,
    };
  }

  getAxis(): Axis {
    if (!this.moveTouch) return { x: 0, y: 0 };
    const dx = this.moveTouch.currentX - this.moveTouch.originX;
    const dy = this.moveTouch.currentY - this.moveTouch.originY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.opts.radius * this.opts.deadZone) return { x: 0, y: 0 };
    const magnitude = Math.min(dist / this.opts.radius, 1);
    const x = (dx / dist) * magnitude;
    const y = (dy / dist) * magnitude;
    return {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
  }

  isPressed(code: string): boolean {
    if (code === 'Space') return this.attackTouch !== null;
    return false;
  }
}
