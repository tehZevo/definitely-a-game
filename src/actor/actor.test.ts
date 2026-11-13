import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Stats } from './stats';
import { Actor } from './actor';

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
});
