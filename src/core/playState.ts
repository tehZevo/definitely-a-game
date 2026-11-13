import { GameState } from './gameState';
import type { World } from '../ecs';
import type { Application, Container } from 'pixi.js';

export class PlayState extends GameState {
  private _update: ((dt: number) => void) | null = null;

  setUpdate(fn: (dt: number) => void): void {
    this._update = fn;
  }

  enter(_app: Application, _world: World, _worldLayer: Container): void {
    void _app;
    void _world;
    void _worldLayer;
  }

  update(dt: number): void {
    this._update?.(dt);
  }

  exit(): void {
    this._update = null;
  }
}
