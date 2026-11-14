import { describe, expect, it } from 'vitest';
import { Container } from 'pixi.js';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Stats } from '../actor/stats';
import { UIManager } from './uiManager';
import { StatsScreen, statsScreenLines } from './statsScreen';

describe('StatsScreen', () => {
  it('renders base and current stats', () => {
    const world = new World();
    const stats = new Stats(75, 100, 25, 50, 110, 8, 5, 100, 0);
    const player = world.createEntity([new Position(0, 0), stats]);

    const lines = statsScreenLines(player);

    expect(lines).toEqual([
      'Base:',
      'HP: 75/100',
      'MP: 25/50',
      'Phys. Att.: 110',
      'Phys. Def.: 8',
      'Mag. Att.: 100',
      'Mag. Def.: 0',
      'Crit: 5',
      '',
      'Current:',
      'HP: 75/100',
      'MP: 25/50',
      'Phys. Att.: 110',
      'Phys. Def.: 8',
      'Mag. Att.: 100',
      'Mag. Def.: 0',
      'Crit: 5',
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
