import { describe, it, expect } from 'vitest';
import { barWidth } from './hud';

describe('barWidth', () => {
  it('returns full width when current equals max', () => {
    expect(barWidth(100, 100, 120)).toBe(120);
  });

  it('returns half width at half health', () => {
    expect(barWidth(50, 100, 120)).toBe(60);
  });

  it('clamps below 0 and above max', () => {
    expect(barWidth(-10, 100, 120)).toBe(0);
    expect(barWidth(200, 100, 120)).toBe(120);
  });

  it('returns 0 when max is 0', () => {
    expect(barWidth(0, 0, 120)).toBe(0);
  });
});
