import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Skill } from '../skill';
import { ApplyBuff } from './applyBuff';
import { Buffs } from '../../buffs/buffs';
import { BuffDef } from '../../buffs/buffDef';
import { BuffEffect } from '../../buffs/buffEffect';
import type { Buff } from '../../buffs/buff';

class TestBuffEffect extends BuffEffect {
  applied = false;
  removed = false;

  override apply(_buff: Buff): unknown {
    this.applied = true;
    return null;
  }

  override remove(_buff: Buff, _state: unknown): void {
    this.removed = true;
  }
}

describe('ApplyBuff', () => {
  it('applies buff to target', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(1, 1),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
      new Buffs(),
    ]);
    const effect = new TestBuffEffect();
    const buffdef = new BuffDef('test_buff', [effect]);
    const skill = new Skill(new ApplyBuff(buffdef, 50, 5), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    world.update(0);
    const buffs = target.getComponent(Buffs)!;
    expect(buffs.getBuff(buffdef)).toBeDefined();
    expect(buffs.getBuff(buffdef)!.power).toBe(50);
  });

  it('does nothing without target buffs', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(1, 1),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const buffdef = new BuffDef('test_buff', []);
    const skill = new Skill(new ApplyBuff(buffdef, 50, 5), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    expect(() => world.update(0)).not.toThrow();
  });
});

describe('Buffs component', () => {
  it('expires buff after time', () => {
    const world = new World();
    const entity = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
      new Buffs(),
    ]);
    const buffdef = new BuffDef('short', []);
    const buffs = entity.getComponent(Buffs)!;
    buffs.applyBuff(buffdef, 10, 1, entity);
    expect(buffs.getBuff(buffdef)).toBeDefined();
    world.update(1.1);
    expect(buffs.getBuff(buffdef)).toBeUndefined();
  });

  it('replaces stronger buff', () => {
    const world = new World();
    const entity = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
      new Buffs(),
    ]);
    const buffdef = new BuffDef('str', []);
    const buffs = entity.getComponent(Buffs)!;
    buffs.applyBuff(buffdef, 10, 5, entity);
    expect(buffs.applyBuff(buffdef, 20, 5, entity)).toBe(true);
    expect(buffs.getBuff(buffdef)!.power).toBe(20);
    expect(buffs.applyBuff(buffdef, 5, 5, entity)).toBe(false);
  });
});
