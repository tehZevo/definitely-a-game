import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { ConnectionState, DISCONNECTED_ICON, connectionIconPath } from './connectionState';

describe('ConnectionState', () => {
  it('has no icon while connected', () => {
    expect(connectionIconPath(true)).toBeNull();
  });

  it('shows disconnect icon when disconnected', () => {
    const world = new World();
    const entity = world.createEntity([
      new Position(0, 0),
      new Sprite({ idle: ['assets/player/idle_down_body.png'] }),
      new ConnectionState(false),
    ]);
    expect(entity.getComponent(ConnectionState)!.iconPath()).toBe(DISCONNECTED_ICON);
  });
});
