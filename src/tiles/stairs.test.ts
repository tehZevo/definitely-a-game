import { describe, expect, it, vi } from 'vitest';
import { World } from '../ecs';
import { GameMaster } from '../core/gameMaster';
import type { Game } from '../core/game';
import { MapDef } from '../maps/dfsGenerator';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { Stairs } from './stairs';

describe('Stairs', () => {
  it('renders the stairs sprite', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new Stairs('forest')]);
    const sprite = entity.getComponent(Sprite);

    expect(sprite?.frames.default).toEqual(['assets/tiles/stairs.png']);
    expect(sprite?.current).toBe('default');
  });

  it('transitions through the GameMaster when interacted with', () => {
    const world = new World();
    const game = { transition: vi.fn() } as unknown as Game;
    world.createEntity([new GameMaster(new MapDef('plains', 'grass', 'dfs'), game)]);

    const stairsEntity = world.createEntity([new Position(0, 0), new Stairs('forest')]);
    const stairs = stairsEntity.getComponent(Stairs);
    expect(stairs).toBeDefined();

    stairs?.interact(stairsEntity);

    expect(game.transition).toHaveBeenCalledWith('forest');
  });
});
