import { describe, it, expect } from 'vitest';
import { CombinedInput } from './combinedInput';
import { FakeInput } from './input';

describe('CombinedInput', () => {
  it('uses primary axis when non-zero', () => {
    const primary = new FakeInput(1, 0);
    const secondary = new FakeInput(0, 1);
    const combined = new CombinedInput(primary, secondary);
    expect(combined.getAxis()).toEqual({ x: 1, y: 0 });
  });

  it('falls back to secondary when primary is zero', () => {
    const primary = new FakeInput(0, 0);
    const secondary = new FakeInput(0, -1);
    const combined = new CombinedInput(primary, secondary);
    expect(combined.getAxis()).toEqual({ x: 0, y: -1 });
  });

  it('isPressed returns true if either source is pressed', () => {
    const primary = new FakeInput(0, 0, false);
    const secondary = new FakeInput(0, 0, true);
    const combined = new CombinedInput(primary, secondary);
    expect(combined.isPressed('Space')).toBe(true);
  });

  it('isPressed returns false if neither source is pressed', () => {
    const primary = new FakeInput(0, 0, false);
    const secondary = new FakeInput(0, 0, false);
    const combined = new CombinedInput(primary, secondary);
    expect(combined.isPressed('Space')).toBe(false);
  });
});
