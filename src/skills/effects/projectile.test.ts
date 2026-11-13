import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Vector2 } from '../../utils/vector';
import { Actor } from '../../actor/actor';
import { Team } from '../../actor/team';
import { Stats } from '../../actor/stats';
import { Sprite } from '../../graphics/sprite';
import { Skill } from '../skill';
import { SkillEffect } from './skillEffect';
import { Projectile } from './projectile';
import { TargetType } from '../targetType';
import { DT } from '../../constants';

class NoopEffect extends SkillEffect {}

function setup() {
  const world = new World();
  const user = world.createEntity([
    new Position(0, 0),
    new Actor(),
    new Team(0),
    new Stats(100, 100),
  ]);
  user.getComponent(Actor)!.moveDir = new Vector2(1, 0);
  return { world, user };
}

describe('Projectile', () => {
  it('creates a sprite entity on start when sprite is set', () => {
    const { world, user } = setup();
    const effect = new Projectile(TargetType.ENEMY, 'assets/skills/fireball.png');
    const skill = new Skill(effect, user);
    world.createEntity([new Position(0, 0), skill]);
    const sprites = world.findComponents(Sprite);
    expect(sprites.length).toBe(1);
    expect(Object.values(sprites[0].frames).flat()).toContain('assets/skills/fireball.png');
  });

  it('does not create a sprite entity when sprite is null', () => {
    const { world, user } = setup();
    const effect = new Projectile(TargetType.ENEMY, null);
    const skill = new Skill(effect, user);
    world.createEntity([new Position(0, 0), skill]);
    expect(world.findComponents(Sprite).length).toBe(0);
  });

  it('moves the skill entity along dir each update', () => {
    const { world, user } = setup();
    const effect = new Projectile(TargetType.ENEMY, null, [], [], 1, 32, 64, 1);
    const skill = new Skill(effect, user);
    const entity = world.createEntity([new Position(0, 0), skill]);
    const pos = entity.getComponent(Position)!;
    expect(pos.x).toBe(0);
    world.update(DT);
    expect(pos.x).toBeCloseTo(64 * DT);
  });

  it('completes after life expires', () => {
    const { world, user } = setup();
    const effect = new Projectile(TargetType.ENEMY, null, [], [], DT, 32, 64, 1);
    const skill = new Skill(effect, user);
    const entity = world.createEntity([new Position(0, 0), skill]);
    expect(entity.alive).toBe(true);
    world.update(DT);
    expect(entity.alive).toBe(false);
  });

  it('hits an enemy within radius and does not re-hit', () => {
    const { world, user } = setup();
    world.createEntity([
      new Position(10, 0),
      new Actor(),
      new Team(1),
      new Stats(100, 100),
    ]);
    const effect = new Projectile(TargetType.ENEMY, null, [new NoopEffect()], [], 1, 32, 0, 6);
    const skill = new Skill(effect, user);
    world.createEntity([new Position(0, 0), skill]);
    world.update(DT);
    const state = skill.state as { entsHit: unknown[] };
    expect(state.entsHit.length).toBe(1);
    world.update(DT);
    const state2 = skill.state as { entsHit: unknown[] };
    expect(state2.entsHit.length).toBe(1);
  });
});
