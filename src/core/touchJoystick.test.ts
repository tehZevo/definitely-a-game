import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TouchJoystick } from './touchJoystick';

function makeEl(width = 400, height = 800) {
  const listeners: Record<string, ((e: TouchEvent) => void)[]> = {};
  const el = {
    clientWidth: width,
    clientHeight: height,
    addEventListener: (type: string, fn: (e: TouchEvent) => void) => {
      if (!listeners[type]) listeners[type] = [];
      listeners[type].push(fn);
    },
    removeEventListener: (type: string, fn: (e: TouchEvent) => void) => {
      if (!listeners[type]) return;
      listeners[type] = listeners[type].filter((f) => f !== fn);
    },
    dispatch: (type: string, touches: { identifier: number; clientX: number; clientY: number }[]) => {
      const event = {
        changedTouches: touches,
      } as unknown as TouchEvent;
      listeners[type]?.forEach((fn) => fn(event));
    },
  };
  return el;
}

describe('TouchJoystick', () => {
  let el: ReturnType<typeof makeEl>;
  let joy: TouchJoystick;

  beforeEach(() => {
    el = makeEl(400, 800);
    joy = new TouchJoystick(el as unknown as HTMLElement, { radius: 50, deadZone: 0.15 });
  });

  afterEach(() => {
    joy.destroy();
  });

  it('returns zero axis when no touch', () => {
    expect(joy.getAxis()).toEqual({ x: 0, y: 0 });
  });

  it('left-half touch creates movement joystick', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    el.dispatch('touchmove', [{ identifier: 1, clientX: 150, clientY: 400 }]);
    const axis = joy.getAxis();
    expect(axis.x).toBeCloseTo(1);
    expect(axis.y).toBeCloseTo(0);
  });

  it('right-half touch triggers attack (Space)', () => {
    el.dispatch('touchstart', [{ identifier: 2, clientX: 300, clientY: 400 }]);
    expect(joy.isPressed('Space')).toBe(true);
    expect(joy.isPressed('KeyA')).toBe(false);
  });

  it('attack released on touchend', () => {
    el.dispatch('touchstart', [{ identifier: 2, clientX: 300, clientY: 400 }]);
    expect(joy.isPressed('Space')).toBe(true);
    el.dispatch('touchend', [{ identifier: 2, clientX: 300, clientY: 400 }]);
    expect(joy.isPressed('Space')).toBe(false);
  });

  it('movement released on touchend', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    el.dispatch('touchmove', [{ identifier: 1, clientX: 130, clientY: 400 }]);
    expect(joy.getAxis().x).toBeGreaterThan(0);
    el.dispatch('touchend', [{ identifier: 1, clientX: 130, clientY: 400 }]);
    expect(joy.getAxis()).toEqual({ x: 0, y: 0 });
  });

  it('clamps axis magnitude to 1', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    el.dispatch('touchmove', [{ identifier: 1, clientX: 300, clientY: 400 }]);
    const axis = joy.getAxis();
    expect(axis.x).toBeCloseTo(1);
    expect(Math.abs(axis.x)).toBeLessThanOrEqual(1);
  });

  it('dead zone returns zero', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    el.dispatch('touchmove', [{ identifier: 1, clientX: 101, clientY: 400 }]);
    expect(joy.getAxis()).toEqual({ x: 0, y: 0 });
  });

  it('second left-half touch is ignored', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    el.dispatch('touchstart', [{ identifier: 3, clientX: 50, clientY: 300 }]);
    el.dispatch('touchmove', [{ identifier: 1, clientX: 150, clientY: 400 }]);
    const axis = joy.getAxis();
    expect(axis.x).toBeCloseTo(1);
  });

  it('getMoveOrigin returns origin when active', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    expect(joy.getMoveOrigin()).toEqual({ x: 100, y: 400 });
  });

  it('getMoveKnob returns clamped knob position', () => {
    el.dispatch('touchstart', [{ identifier: 1, clientX: 100, clientY: 400 }]);
    el.dispatch('touchmove', [{ identifier: 1, clientX: 200, clientY: 400 }]);
    const knob = joy.getMoveKnob();
    expect(knob).not.toBeNull();
    expect(knob!.x).toBeCloseTo(150);
    expect(knob!.y).toBeCloseTo(400);
  });

  it('getMoveOrigin returns null when no touch', () => {
    expect(joy.getMoveOrigin()).toBeNull();
  });
});
