import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Actor } from '../actor/actor';
import { Position } from '../physics/position';
import { Interactable } from './interactable';
import { InteractCursor } from './interactCursor';
import { InteractTargeter } from './interactTargeter';
import { INTERACT_TARGET_UPDATE_TIME } from '../constants';

function makePlayer(world: World): InteractTargeter {
  const targeter = new InteractTargeter();
  world.createEntity([new Position(0, 0), new Actor(), targeter]);
  return targeter;
}

describe('InteractTargeter', () => {
  it('ensures required components on start', () => {
    const world = new World();
    const entity = world.createEntity([new InteractTargeter()]);

    expect(entity.getComponent(Actor)).toBeDefined();
    expect(entity.getComponent(Position)).toBeDefined();
  });

  it('waits for the target update interval before targeting', () => {
    const world = new World();
    const targeter = makePlayer(world);
    const target = world.createEntity([new Position(0, -8), new Interactable()]);

    world.update(INTERACT_TARGET_UPDATE_TIME / 2);
    expect(targeter.interactTarget).toBeNull();

    world.update(INTERACT_TARGET_UPDATE_TIME / 2);
    expect(targeter.interactTarget).toBe(target);
  });

  it('creates a cursor entity at the targeted interactable', () => {
    const world = new World();
    makePlayer(world);
    const target = world.createEntity([new Position(0, -8), new Interactable()]);

    world.update(INTERACT_TARGET_UPDATE_TIME);

    const cursor = world.findComponent(InteractCursor);
    expect(cursor).toBeDefined();
    expect(cursor?.entity.getComponent(Position)).toMatchObject({ x: 0, y: -8 });
    expect(target.alive).toBe(true);
  });

  it('keeps one cursor while the target remains the same', () => {
    const world = new World();
    makePlayer(world);
    world.createEntity([new Position(0, -8), new Interactable()]);

    world.update(INTERACT_TARGET_UPDATE_TIME);
    world.update(INTERACT_TARGET_UPDATE_TIME);

    expect(world.find(InteractCursor)).toHaveLength(1);
  });

  it('moves the cursor when the target moves', () => {
    const world = new World();
    makePlayer(world);
    const target = world.createEntity([new Position(0, -8), new Interactable()]);
    world.update(INTERACT_TARGET_UPDATE_TIME);

    target.getComponent(Position)!.y = -16;
    world.update(INTERACT_TARGET_UPDATE_TIME);

    const cursor = world.findComponent(InteractCursor);
    expect(cursor?.entity.getComponent(Position)).toMatchObject({ x: 0, y: -16 });
  });

  it('removes the cursor when the target dies', () => {
    const world = new World();
    const targeter = makePlayer(world);
    const target = world.createEntity([new Position(0, -8), new Interactable()]);
    world.update(INTERACT_TARGET_UPDATE_TIME);
    expect(world.find(InteractCursor)).toHaveLength(1);

    target.remove();
    world.update(INTERACT_TARGET_UPDATE_TIME);

    expect(targeter.interactTarget).toBeNull();
    expect(world.find(InteractCursor)).toHaveLength(0);
  });

  it('switches and moves the cursor when the nearest target changes', () => {
    const world = new World();
    const targeter = makePlayer(world);
    const near = world.createEntity([new Position(0, -8), new Interactable()]);
    const far = world.createEntity([new Position(8, -8), new Interactable()]);

    world.update(INTERACT_TARGET_UPDATE_TIME);
    expect(targeter.interactTarget).toBe(near);

    near.remove();
    world.update(INTERACT_TARGET_UPDATE_TIME);

    expect(targeter.interactTarget).toBe(far);
    expect(world.findComponent(InteractCursor)?.entity.getComponent(Position)).toMatchObject({
      x: 8,
      y: -8,
    });
  });

  it('does not create a cursor when there is no target', () => {
    const world = new World();
    makePlayer(world);

    world.update(INTERACT_TARGET_UPDATE_TIME);

    expect(world.find(InteractCursor)).toHaveLength(0);
  });
});
