import { GameState } from './gameState';
import type { World } from '../ecs';
import type { Application, Container } from 'pixi.js';
import { Container as PixiContainer } from 'pixi.js';
import { BitmapText } from '../ui/bitmapText';
import { MenuBackground } from '../ui/menuBackground';
import { ScreenAnchor, mountToScreen } from '../ui/screenAnchor';

export class MainMenuState extends GameState {
  private container: PixiContainer | null = null;
  private background: MenuBackground | null = null;
  private onStart: (() => void) | null = null;
  private onSkip: (() => void) | null = null;

  setOnStart(cb: () => void): void {
    this.onStart = cb;
  }

  setOnSkip(cb: () => void): void {
    this.onSkip = cb;
  }

  enter(app: Application, _world: World, _worldLayer: Container): void {
    void _world;
    void _worldLayer;
    this.container = new PixiContainer();
    this.container.eventMode = 'static';
    mountToScreen(this.container, app.screen, ScreenAnchor.CENTER);
    this.background = new MenuBackground(app.screen.width, app.screen.height);
    this.background.container.x = -app.screen.width / 2;
    this.background.container.y = -app.screen.height / 2;
    this.container.addChild(this.background.container);

    const title = new BitmapText({
      text: 'A Game Maybe',
      style: { fontSize: 16, fill: 0xffffff },
    });
    title.anchor.set(0.5);
    title.y = -app.screen.height / 3;
    this.container.addChild(title);

    const startBtn = new BitmapText({
      text: '[ Start Game ]',
      style: { fontSize: 12, fill: 0x88ccff },
    });
    startBtn.anchor.set(0.5);
    startBtn.y = 0;
    startBtn.eventMode = 'static';
    startBtn.cursor = 'pointer';
    startBtn.on('pointerdown', () => this.onStart?.());
    this.container.addChild(startBtn);

    const skipBtn = new BitmapText({
      text: '[ Skip ]',
      style: { fontSize: 10, fill: 0x88ff88 },
    });
    skipBtn.anchor.set(0.5);
    skipBtn.y = 24;
    skipBtn.eventMode = 'static';
    skipBtn.cursor = 'pointer';
    skipBtn.on('pointerdown', () => this.onSkip?.());
    this.container.addChild(skipBtn);

    app.stage.addChild(this.container);
  }

  update(dt: number): void {
    this.background?.update(dt);
  }

  exit(): void {
    this.container?.destroy({ children: true });
    this.container = null;
    this.background = null;
  }
}
