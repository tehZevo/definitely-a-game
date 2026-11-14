import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Player } from './player';
import { Actor } from './actor';
import { Stats } from './stats';
import { Invulnerable } from './invulnerable';
import { PLAYER_INVULN_TIME } from '../constants';

describe('Player', () => {
  it('becomes invulnerable after taking damage', () => {
    const world = new World();
    const player = world.createEntity([
      new Position(0, 0),
      new Player(),
      new Actor(),
      new Stats(100, 100),
    ]);

    player.getComponent(Actor)!.damage(10);

    const invuln = player.getComponent(Invulnerable);
    expect(invuln).toBeDefined();
    expect(invuln!.time).toBe(PLAYER_INVULN_TIME);
  });

  it('keeps the existing invulnerability window when hit again', () => {
    const world = new World();
    const player = world.createEntity([
      new Position(0, 0),
      new Player(),
      new Actor(),
      new Stats(100, 100),
    ]);
    const actor = player.getComponent(Actor)!;

    actor.damage(10);
    player.getComponent(Invulnerable)!.time = 0.5;
    actor.damage(10);

    expect(player.getComponent(Invulnerable)!.time).toBe(0.5);
  });
});
