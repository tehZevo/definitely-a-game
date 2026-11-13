import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { FakeInput } from '../core/input';
import { PlayerController } from './playerController';
import { Sprite } from '../graphics/sprite';

describe('PlayerController', () => {
  it('moves by speed along the input axis', () => {
    const world = new World();
    const pos = new Position(0, 0);
    const ctrl = new PlayerController(new FakeInput(1, 0));
    world.createEntity([pos, ctrl]);
    world.update(1);
    expect(pos.x).toBeCloseTo(ctrl.speed);
    expect(pos.y).toBeCloseTo(0);
  });

  it('normalizes diagonal so it is not faster', () => {
    const world = new World();
    const pos = new Position(0, 0);
    const ctrl = new PlayerController(new FakeInput(1, 1));
    world.createEntity([pos, ctrl]);
    world.update(1);
    expect(Math.hypot(pos.x, pos.y)).toBeCloseTo(ctrl.speed);
  });

  it('does not move with no input', () => {
    const world = new World();
    const pos = new Position(5, 7);
    world.createEntity([pos, new PlayerController(new FakeInput(0, 0))]);
    world.update(1);
    expect(pos.x).toBe(5);
    expect(pos.y).toBe(7);
  });

  it('sets walk animation while moving', () => {
    const world = new World();
    const sprite = new Sprite({ idle: ['i.png'], walk: ['w.png'] }, 'idle');
    world.createEntity([
      new Position(0, 0),
      new PlayerController(new FakeInput(1, 0)),
      sprite,
    ]);
    world.update(1);
    expect(sprite.current).toBe('walk');
  });

  it('sets idle animation when not moving', () => {
    const world = new World();
    const sprite = new Sprite({ idle: ['i.png'], walk: ['w.png'] }, 'walk');
    world.createEntity([
      new Position(0, 0),
      new PlayerController(new FakeInput(0, 0)),
      sprite,
    ]);
    world.update(1);
    expect(sprite.current).toBe('idle');
  });
});
