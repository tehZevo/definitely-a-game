import { describe, expect, it, vi } from 'vitest';
import { World } from '../ecs';
import { Disposition, TeamManager } from '../actor/teamManager';
import { MapDef } from '../maps/dfsGenerator';
import type { Game } from './game';
import { GameMaster } from './gameMaster';

describe('GameMaster', () => {
  it('configures team relationships on start', () => {
    const world = new World();
    const entity = world.createEntity([
      new TeamManager('player'),
      new GameMaster(new MapDef('plains', 'grass', 'dfs')),
    ]);
    const teams = entity.getComponent(TeamManager);

    expect(teams?.getDisposition('player', 'enemy')).toBe(Disposition.ENEMY);
    expect(teams?.getDisposition('player', 'player')).toBe(Disposition.ALLY);
  });

  it('delegates transitions to the game', () => {
    const game = { transition: vi.fn() } as unknown as Game;
    const master = new GameMaster(new MapDef('plains', 'grass', 'dfs'), game);

    master.transition('forest');
    expect(game.transition).toHaveBeenCalledWith('forest');

    master.transition();
    expect(game.transition).toHaveBeenLastCalledWith(master.mapdef);
  });
});
