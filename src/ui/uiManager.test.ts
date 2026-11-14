import { describe, expect, it } from 'vitest';
import { Container } from 'pixi.js';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Stats } from '../actor/stats';
import { Screen } from './screen';
import { UIManager } from './uiManager';
import { StatsScreen } from './statsScreen';

describe('UIManager', () => {
  it('opens and closes a screen entity', () => {
    const world = new World();
    const stage = new Container();
    const uiManager = new UIManager(stage);
    world.createEntity([uiManager]);

    const player = world.createEntity([new Position(0, 0), new Stats(100, 100, 50, 50)]);
    const screen = new StatsScreen(player, uiManager);
    uiManager.openScreen(screen);

    expect(uiManager.focusStack).toEqual([screen]);
    expect(stage.children).toContain(screen.container);
    expect(world.find(Screen)).toContain(screen.entity);

    uiManager.pop();

    expect(uiManager.focusStack).toEqual([]);
    expect(stage.children).not.toContain(screen.container);
    expect(world.find(Screen)).not.toContain(screen.entity);
  });
});
