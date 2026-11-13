import { GameState } from './gameState';
import type { World } from '../ecs';
import type { Application, Container } from 'pixi.js';

export class MainMenuState extends GameState {
  enter(_app: Application, _world: World, _worldLayer: Container): void {
    void _app;
    void _world;
    void _worldLayer;
  }

  update(_dt: number): void {
    void _dt;
  }

  exit(): void {}
}
