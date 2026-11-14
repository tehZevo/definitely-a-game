import { describe, it, expect } from 'vitest';
import { KeyboardInput, FakeInput, normalizeKeyCode } from './input';

describe('KeyboardInput', () => {
  it('maps the arrow keys to an axis', () => {
    const handlers: Record<string, (e: { code: string }) => void> = {};
    const target = {
      addEventListener: (t: string, h: (e: { code: string }) => void) => {
        handlers[t] = h;
      },
    } as unknown as Window;

    const input = new KeyboardInput(target);
    handlers['keydown']({ code: 'ArrowRight' });
    handlers['keydown']({ code: 'ArrowUp' });
    expect(input.getAxis()).toEqual({ x: 1, y: -1 });

    handlers['keyup']({ code: 'ArrowRight' });
    expect(input.getAxis()).toEqual({ x: 0, y: -1 });
  });

  it('treats NumpadEnter as Enter', () => {
    const handlers: Record<string, (e: { code: string }) => void> = {};
    const target = {
      addEventListener: (t: string, h: (e: { code: string }) => void) => {
        handlers[t] = h;
      },
    } as unknown as Window;

    const input = new KeyboardInput(target);
    handlers['keydown']({ code: 'NumpadEnter' });

    expect(input.isPressed('Enter')).toBe(true);
    expect(input.isPressed('NumpadEnter')).toBe(true);
  });
});

describe('normalizeKeyCode', () => {
  it('normalizes NumpadEnter to Enter', () => {
    expect(normalizeKeyCode('NumpadEnter')).toBe('Enter');
  });

  it('leaves other codes unchanged', () => {
    expect(normalizeKeyCode('Space')).toBe('Space');
  });
});

describe('FakeInput', () => {
  it('returns the configured axis', () => {
    expect(new FakeInput(1, -1).getAxis()).toEqual({ x: 1, y: -1 });
  });
});
