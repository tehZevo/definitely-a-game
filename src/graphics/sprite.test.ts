import { describe, it, expect } from 'vitest';
import { Sprite } from './sprite';

describe('Sprite', () => {
  it('defaults current to the first frame', () => {
    const s = new Sprite({ idle: ['a.png'], walk: ['b.png'] });
    expect(s.current).toBe('idle');
  });

  it('uses an explicit current frame', () => {
    const s = new Sprite({ idle: ['a.png'], walk: ['b.png'] }, 'walk');
    expect(s.current).toBe('walk');
  });

  it('setAnimation switches to a known frame', () => {
    const s = new Sprite({ idle: ['a.png'], walk: ['b.png'] });
    s.setAnimation('walk');
    expect(s.current).toBe('walk');
  });

  it('setAnimation ignores unknown frames', () => {
    const s = new Sprite({ idle: ['a.png'] });
    s.setAnimation('nope');
    expect(s.current).toBe('idle');
  });
});
