import { GameState } from './gameState';
import type { World } from '../ecs';
import type { Application, Container } from 'pixi.js';
import { Container as PixiContainer, Text } from 'pixi.js';

export class MainMenuState extends GameState {
  private container: PixiContainer | null = null;
  private onStart: (() => void) | null = null;

  setOnStart(cb: () => void): void {
    this.onStart = cb;
  }

  enter(app: Application, _world: World, _worldLayer: Container): void {
    void _world;
    void _worldLayer;
    this.container = new PixiContainer();
    const title = new Text({
      text: 'A Game Maybe',
      style: { fontFamily: 'monospace', fontSize: 48, fill: 0xffffff },
    });
    title.anchor.set(0.5);
    title.x = app.screen.width / 2;
    title.y = app.screen.height / 3;
    this.container.addChild(title);

    const startBtn = new Text({
      text: '[ Start Game ]',
      style: { fontFamily: 'monospace', fontSize: 24, fill: 0x88ccff },
    });
    startBtn.anchor.set(0.5);
    startBtn.x = app.screen.width / 2;
    startBtn.y = app.screen.height / 2;
    startBtn.eventMode = 'static';
    startBtn.cursor = 'pointer';
    startBtn.on('pointerdown', () => this.onStart?.());
    this.container.addChild(startBtn);

    app.stage.addChild(this.container);
  }

  update(_dt: number): void {
    void _dt;
  }

  exit(): void {
    this.container?.destroy({ children: true });
    this.container = null;
  }
}
