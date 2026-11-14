import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Actor } from './actor';
import { Stats } from './stats';
import { HPRecovery } from './hpRecovery';
import { MPRecovery } from './mpRecovery';
import { HP_RECOVERY_PERCENT, MP_RECOVERY_PERCENT, HP_RECOVERY_TIME, MP_RECOVERY_TIME } from '../constants';

function makeActor() {
  const world = new World();
  return world.createEntity([new Actor(), new Stats(100, 100, 50, 50, 100, 0, 0, 100, 0), new HPRecovery(), new MPRecovery()]);
}

describe('recovery', () => {
  it('recovers hp and mp once the recovery timer elapses', () => {
    const entity = makeActor();
    const stats = entity.getComponent(Stats)!;
    stats.hp = 0;
    stats.mp = 0;

    const world = new World();
    void world;

    entity.getComponent(HPRecovery)!.update(HP_RECOVERY_TIME + 0.01);
    entity.getComponent(MPRecovery)!.update(MP_RECOVERY_TIME + 0.01);

    expect(stats.hp).toBeCloseTo(100 * HP_RECOVERY_PERCENT / 100);
    expect(stats.mp).toBeCloseTo(50 * MP_RECOVERY_PERCENT / 100);
  });

  it('does not recover hp while in combat', () => {
    const entity = makeActor();
    const actor = entity.getComponent(Actor)!;
    const stats = entity.getComponent(Stats)!;
    stats.hp = 0;
    actor.inCombat = true;

    entity.getComponent(HPRecovery)!.update(HP_RECOVERY_TIME + 0.01);

    expect(stats.hp).toBe(0);
  });

  it('always recovers mp, even in combat', () => {
    const entity = makeActor();
    const actor = entity.getComponent(Actor)!;
    const stats = entity.getComponent(Stats)!;
    stats.mp = 0;
    actor.inCombat = true;

    entity.getComponent(MPRecovery)!.update(MP_RECOVERY_TIME + 0.01);

    expect(stats.mp).toBeCloseTo(50 * MP_RECOVERY_PERCENT / 100);
  });
});
