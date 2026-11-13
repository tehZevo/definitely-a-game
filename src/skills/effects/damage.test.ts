import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Skill } from '../skill';
import { Damage } from './damage';

describe('Damage', () => {
  it('calculateHit returns damage within the expected range', () => {
    const user = new Stats(100, 100, 0, 0, 100, 0, 0);
    const target = new Stats(100, 100, 0, 0, 100, 0, 0);
    const dmg = new Damage(100, 1);
    const [amount, crit] = dmg.calculateHit(user, target, 0);
    expect(crit).toBe(false);
    expect(amount).toBeGreaterThanOrEqual(50);
    expect(amount).toBeLessThanOrEqual(100);
  });

  it('start applies damage to the target', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(10, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const skill = new Skill(new Damage(100, 1), user, undefined, target);
    const targetStats = target.getComponent(Stats)!;
    skill.effect.start(skill);
    expect(targetStats.hp).toBeLessThan(100);
  });
});
