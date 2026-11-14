import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Action } from '../actions/action';
import { DamageNumber } from '../ui/damageNumber';
import { DamageNumberType } from '../ui/damageNumberType';
import { Stats } from './stats';
import { Actor } from './actor';

class TestAction extends Action {
  constructor(
    private duration: number,
    interruptible = false,
  ) {
    super();
    this.interruptible = interruptible;
    this.active = true;
  }

  override start(): void {
    this.active = true;
  }

  override update(dt = 0): void {
    this.duration -= dt;
    if (this.duration <= 0) this.active = false;
  }

  override serialize(): Record<string, unknown> {
    return {};
  }
}

describe('Actor', () => {
  it('damage reduces hp and kills at 0', () => {
    const world = new World();
    const stats = new Stats(100, 100, 50, 50);
    const e = world.createEntity([new Position(0, 0), stats, new Actor()]);
    const actor = e.getComponent(Actor)!;
    actor.damage(40);
    expect(stats.hp).toBe(60);
    expect(actor.alive).toBe(true);
    actor.damage(100);
    expect(stats.hp).toBe(0);
    expect(actor.alive).toBe(false);
  });

  it('heal restores hp up to max', () => {
    const world = new World();
    const stats = new Stats(50, 100);
    const e = world.createEntity([new Position(0, 0), stats, new Actor()]);
    e.getComponent(Actor)!.heal(200);
    expect(stats.hp).toBe(100);
  });

  it('healMp restores mp up to max', () => {
    const world = new World();
    const stats = new Stats(50, 100, 0, 50);
    const e = world.createEntity([new Position(0, 0), stats, new Actor()]);
    e.getComponent(Actor)!.healMp(1000);
    expect(stats.mp).toBe(50);
  });

  it('healMp spawns a mana restore number', () => {
    const world = new World();
    const stats = new Stats(50, 100, 10, 50);
    const e = world.createEntity([new Position(0, 0), stats, new Actor()]);
    e.getComponent(Actor)!.healMp(20);
    expect(stats.mp).toBe(30);

    const numbers = world.find(DamageNumber);
    expect(numbers).toHaveLength(1);
    const number = numbers[0].getComponent(DamageNumber)!;
    expect(number.number).toBe('+ 20');
    expect(number.damageType).toBe(DamageNumberType.MANA_RESTORE);
  });

  it('drainMp removes mp and spawns a mana drain number', () => {
    const world = new World();
    const stats = new Stats(50, 100, 30, 50);
    const e = world.createEntity([new Position(0, 0), stats, new Actor()]);
    e.getComponent(Actor)!.drainMp(12);
    expect(stats.mp).toBe(18);

    const numbers = world.find(DamageNumber);
    expect(numbers).toHaveLength(1);
    const number = numbers[0].getComponent(DamageNumber)!;
    expect(number.number).toBe('- 12');
    expect(number.damageType).toBe(DamageNumberType.MANA);
  });

  it('updates and clears a finished action', () => {
    const world = new World();
    const actor = new Actor();
    world.createEntity([new Position(0, 0), new Stats(100, 100), actor]);

    const action = new TestAction(1);
    actor.act(action);

    world.update(0.5);
    expect(actor.currentAction).toBe(action);
    expect(action.active).toBe(true);

    world.update(0.5);
    expect(actor.currentAction).toBeNull();
  });

  it('queues a non-interruptible next action', () => {
    const world = new World();
    const actor = new Actor();
    world.createEntity([new Position(0, 0), new Stats(100, 100), actor]);

    const first = new TestAction(1);
    const second = new TestAction(1);
    actor.act(first);
    actor.act(second);

    expect(actor.currentAction).toBe(first);
    expect(actor.nextAction).toBe(second);

    world.update(1);
    expect(actor.currentAction).toBe(second);
    expect(actor.nextAction).toBeNull();
  });

  it('replaces an interruptible action immediately', () => {
    const world = new World();
    const actor = new Actor();
    world.createEntity([new Position(0, 0), new Stats(100, 100), actor]);

    const first = new TestAction(1, true);
    const second = new TestAction(1, true);
    actor.act(first);
    actor.act(second);

    expect(actor.currentAction).toBe(second);
    expect(actor.nextAction).toBeNull();
  });
});
