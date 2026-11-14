import { describe, expect, it } from 'vitest';
import { Container } from 'pixi.js';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Stats } from '../actor/stats';
import { Loadout } from '../items/loadout';
import { UIManager } from './uiManager';
import { StatsScreen, statsScreenLines } from './statsScreen';

describe('StatsScreen', () => {
  it('renders the calculated secondary stats', () => {
    const world = new World();
    const stats = new Stats(75, 100, 25, 50, 110, 8, 5, 100, 0);
    stats.recalculate(new Loadout());
    const player = world.createEntity([new Position(0, 0), stats]);

    const lines = statsScreenLines(player);

    expect(lines).toEqual([
      'Secondary:',
      'HP: 150',
      'MP: 130',
      'Phys. Att.: 30',
      'Mag. Att.: 30',
      'Phys. Def.: 20',
      'Mag. Def.: 20',
      'Acc.: 200',
      'Eva.: 200',
      'Move Spd: 110',
      'Crit: 10',
    ]);
  });

  it('closes when confirm is pressed', () => {
    const world = new World();
    const uiManager = new UIManager(new Container());
    world.createEntity([uiManager]);
    const player = world.createEntity([new Position(0, 0), new Stats(100, 100, 50, 50)]);
    const screen = new StatsScreen(player, uiManager);
    uiManager.openScreen(screen);

    screen.handleKeys(new Set(['Enter']));

    expect(uiManager.focusStack).toEqual([]);
  });
});
