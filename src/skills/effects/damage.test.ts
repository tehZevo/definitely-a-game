import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Physics } from '../../physics/physics';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Skill } from '../../actor/skill';
import { Damage } from './damage';
import { KNOCKBACK_FORCE } from '../../constants';

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

  it('uses magic attack and magic defense for magic damage', () => {
    const user = new Stats(100, 100, 0, 0, 100, 0, 0, 1000, 0);
    const target = new Stats(100, 100, 0, 0, 100, 1000, 0, 0, 0);
    const dmg = new Damage(100, 1, true);
    const [amount] = dmg.calculateHit(user, target, 0);

    expect(amount).toBeGreaterThanOrEqual(500);
    expect(amount).toBeLessThanOrEqual(1000);
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

  it('knocks back the target on a heavy hit', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(10, 0),
      new Physics(),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const skill = new Skill(new Damage(100, 1), user, undefined, target);
    skill.effect.start(skill);
    const force = target.getComponent(Physics)!.force;
    expect(force.x).toBeCloseTo(KNOCKBACK_FORCE);
    expect(force.y).toBeCloseTo(0);
  });
});
