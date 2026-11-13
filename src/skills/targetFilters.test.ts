import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Vector2 } from '../utils/vector';
import { Actor } from '../actor/actor';
import { Team } from '../actor/team';
import { Skill } from './skill';
import { SkillEffect } from './effects/skillEffect';
import { distanceFilter, teamFilter, angleFilter, angleDistanceDeg } from './targetFilters';
import { TargetType } from './targetType';

function setup(userTeam: number, look: Vector2) {
  const world = new World();
  const user = world.createEntity([new Position(0, 0), new Actor(), new Team(userTeam)]);
  user.getComponent(Actor)!.lookDir = look;
  const skill = new Skill(new SkillEffect(), user);
  world.createEntity([new Position(0, 0), skill]);
  return { world, skill };
}

describe('targetFilters', () => {
  it('angleDistanceDeg normalizes', () => {
    expect(angleDistanceDeg(0, 0)).toBe(0);
    expect(angleDistanceDeg(0, 180)).toBe(180);
    expect(angleDistanceDeg(10, 350)).toBe(20);
  });

  it('distanceFilter matches within radius', () => {
    const { world, skill } = setup(0, new Vector2(1, 0));
    const near = world.createEntity([new Position(10, 0), new Actor(), new Team(1)]);
    const far = world.createEntity([new Position(100, 0), new Actor(), new Team(1)]);
    const f = distanceFilter(32);
    expect(f(skill)(near)).toBe(true);
    expect(f(skill)(far)).toBe(false);
  });

  it('teamFilter matches enemy and ally', () => {
    const { world, skill } = setup(0, new Vector2(1, 0));
    const enemy = world.createEntity([new Position(0, 0), new Actor(), new Team(1)]);
    const ally = world.createEntity([new Position(0, 0), new Actor(), new Team(0)]);
    expect(teamFilter(TargetType.ENEMY)(skill)(enemy)).toBe(true);
    expect(teamFilter(TargetType.ENEMY)(skill)(ally)).toBe(false);
    expect(teamFilter(TargetType.ALLY)(skill)(ally)).toBe(true);
  });

  it('angleFilter matches in front', () => {
    const { world, skill } = setup(0, new Vector2(1, 0));
    const front = world.createEntity([new Position(10, 0), new Actor(), new Team(1)]);
    const behind = world.createEntity([new Position(-10, 0), new Actor(), new Team(1)]);
    const f = angleFilter(180);
    expect(f(skill)(front)).toBe(true);
    expect(f(skill)(behind)).toBe(false);
  });
});
