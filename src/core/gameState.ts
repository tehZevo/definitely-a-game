import type { World } from '../ecs';
import type { Application } from 'pixi.js';
import type { Container } from 'pixi.js';

export abstract class GameState {
  abstract enter(app: Application, world: World, worldLayer: Container): void;
  abstract update(dt: number): void;
  abstract exit(): void;
}
