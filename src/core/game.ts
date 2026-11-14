import { World } from '../ecs';
import type { Application, Container } from 'pixi.js';
import type { MapDef } from '../maps/dfsGenerator';
import type { GameState } from './gameState';

export class Game {
  world: World;
  app: Application | null = null;
  worldLayer: Container | null = null;
  currentState: GameState | null = null;
  onTransition: ((mapdef: MapDef | string) => void | Promise<void>) | null = null;
  private transitioning = false;

  constructor() {
    this.world = new World();
  }

  setState(state: GameState): void {
    this.currentState?.exit();
    this.currentState = state;
    if (this.app && this.worldLayer) {
      state.enter(this.app, this.world, this.worldLayer);
    }
  }

  update(dt: number): void {
    this.world.update(dt);
    this.currentState?.update(dt);
  }

  transition(mapdef: MapDef | string): void {
    if (this.transitioning) return;
    this.transitioning = true;

    const result = this.onTransition?.(mapdef);
    if (result instanceof Promise) {
      result.finally(() => {
        this.transitioning = false;
      });
      return;
    }

    this.transitioning = false;
  }
}
