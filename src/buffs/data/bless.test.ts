import { describe, expect, it } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Stats } from '../../actor/stats';
import { Loadout } from '../../items/loadout';
import { Buff } from '../buff';
import { bless } from './bless';

describe('bless buff', () => {
  it('grants +20 VIT and +20 WIS while active', () => {
    const world = new World();
    const stats = new Stats(100, 100, 50, 50);
    stats.recalculate(new Loadout());
    const player = world.createEntity([new Position(0, 0), stats]);

    const buff = new Buff(bless, 1, 5, player, player);
    buff.apply();

    expect(stats.calculated.primary.VIT).toBe(30);
    expect(stats.calculated.primary.WIS).toBe(30);
    expect(stats.calculated.secondary.hp).toBe(950);

    buff.remove();

    expect(stats.calculated.primary.VIT).toBe(10);
    expect(stats.calculated.primary.WIS).toBe(10);
    expect(stats.calculated.secondary.hp).toBe(150);
  });
});
