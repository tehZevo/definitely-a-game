import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Skill } from './skill';
import { SkillEffect } from '../skills/effects/skillEffect';

class CountingEffect extends SkillEffect {
  started = 0;
  removed = 0;
  override start(): unknown {
    this.started++;
    return null;
  }
  override remove(): void {
    this.removed++;
  }
}

class MultiplierEffect extends SkillEffect {
  constructor() {
    super({ multiplier: 2 });
  }
}

class FailedEffect extends SkillEffect {
  constructor() {
    super({ success: false });
  }
}

describe('Skill', () => {
  it('runs the effect on start and removes the entity when complete', () => {
    const world = new World();
    const effect = new CountingEffect();
    const user = world.createEntity([new Position(0, 0)]);
    const e = world.createEntity([new Position(0, 0), new Skill(effect, user)]);
    expect(effect.started).toBe(1);
    expect(e.alive).toBe(true);
    world.update(0);
    expect(e.alive).toBe(false);
    expect(effect.removed).toBe(1);
  });

  it('uses the effect multiplier by default', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const skill = new Skill(new MultiplierEffect(), user);
    expect(skill.multiplier).toBe(2);
  });

  it('allows an explicit multiplier to override the effect default', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const skill = new Skill(new MultiplierEffect(), user, undefined, undefined, 3);
    expect(skill.multiplier).toBe(3);
  });

  it('uses the effect success by default', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    expect(new Skill(new CountingEffect(), user).success).toBe(true);
    expect(new Skill(new FailedEffect(), user).success).toBe(false);
  });

  it('allows an explicit success value to override the effect default', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    expect(new Skill(new CountingEffect(), user, undefined, undefined, 1, false).success).toBe(false);
  });
});
