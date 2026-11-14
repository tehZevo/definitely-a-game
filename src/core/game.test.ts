import { describe, expect, it, vi } from 'vitest';
import type { Application } from 'pixi.js';
import { Container } from 'pixi.js';
import { World } from '../ecs';
import { MapDef } from '../maps/dfsGenerator';
import { Game } from './game';
import { PlayState } from './playState';

describe('Game', () => {
  it('updates the world and current state', () => {
    const game = new Game();
    const world = new World();
    const updateWorld = vi.spyOn(world, 'update');
    const state = new PlayState();
    let updates = 0;

    game.app = {} as Application;
    game.worldLayer = new Container();
    game.world = world;
    state.setUpdate(() => {
      updates += 1;
    });
    game.setState(state);

    game.update(0.1);

    expect(updateWorld).toHaveBeenCalledWith(0.1);
    expect(updates).toBe(1);
  });

  it('calls onTransition once while a transition is active', async () => {
    const game = new Game();
    const calls: string[] = [];
    let resolve: () => void = () => {};
    const promise = new Promise<void>((r) => {
      resolve = r;
    });

    game.onTransition = (mapdef) => {
      calls.push(typeof mapdef === 'string' ? mapdef : mapdef.id);
      return promise;
    };

    game.transition('plains');
    game.transition('forest');
    expect(calls).toEqual(['plains']);

    resolve();
    await promise;

    game.transition(new MapDef('forest', 'forest', 'dfs'));
    expect(calls).toEqual(['plains', 'forest']);
  });
});
