import { describe, it, expect } from 'vitest';
import { MobDef } from './mobdef';

describe('MobDef', () => {
  it('stores id, sprite, and difficulty', () => {
    const d = new MobDef('slime', 'assets/monsters/slime_idle.png', 5);
    expect(d.id).toBe('slime');
    expect(d.sprite).toBe('assets/monsters/slime_idle.png');
    expect(d.difficulty).toBe(5);
  });

  it('defaults difficulty to 5', () => {
    expect(new MobDef('x', 'y.png').difficulty).toBe(5);
  });
});
