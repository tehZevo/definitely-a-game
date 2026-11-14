import { describe, it, expect } from 'vitest';
import { MenuBackground } from './menuBackground';

describe('MenuBackground', () => {
  it('scrolls and wraps its offset', () => {
    const bg = new MenuBackground(128, 96, 16);
    const initial = (bg as unknown as { offset: number }).offset;
    bg.update(1);
    expect((bg as unknown as { offset: number }).offset).not.toBe(initial);
    bg.update(2);
    expect((bg as unknown as { offset: number }).offset).toBeLessThan(32);
  });
});
