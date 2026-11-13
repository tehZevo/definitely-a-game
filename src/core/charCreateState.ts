import { GameState } from './gameState';
import type { World } from '../ecs';
import type { Application, Container } from 'pixi.js';
import { Container as PixiContainer, Text } from 'pixi.js';
import {
  GENDERS,
  SKIN_TONES,
  EYE_COLORS,
  HAIR_COLORS,
  NUM_HAIR_STYLES,
  type FaceConfig,
  getFaceImagePaths,
} from '../graphics/characterCreator';

export class CharCreateState extends GameState {
  private container: PixiContainer | null = null;
  private config: FaceConfig = {
    gender: 'male',
    skinTone: 'light',
    hairStyle: 0,
    hairColor: 'brown',
    eyeColor: 'blue',
  };
  private onConfirm: ((config: FaceConfig) => void) | null = null;
  private label: Text | null = null;

  setOnConfirm(cb: (config: FaceConfig) => void): void {
    this.onConfirm = cb;
  }

  getConfig(): FaceConfig {
    return { ...this.config };
  }

  enter(app: Application, _world: World, _worldLayer: Container): void {
    void _world;
    void _worldLayer;
    this.container = new PixiContainer();
    this.container.eventMode = 'static';
    const title = new Text({
      text: 'Character Creator',
      style: { fontFamily: 'monospace', fontSize: 32, fill: 0xffffff },
    });
    title.anchor.set(0.5);
    title.x = app.screen.width / 2;
    title.y = 40;
    this.container.addChild(title);

    this.label = new Text({
      text: this.renderConfig(),
      style: { fontFamily: 'monospace', fontSize: 16, fill: 0xcccccc },
    });
    this.label.x = app.screen.width / 2 - 120;
    this.label.y = 90;
    this.container.addChild(this.label);

    const controls: Array<[string, () => void]> = [
      ['[G]ender', () => this.cycle('gender')],
      ['[S]kin', () => this.cycle('skinTone')],
      ['[H]air style', () => this.cycle('hairStyle')],
      ['hai[R] color', () => this.cycle('hairColor')],
      ['[E]ye color', () => this.cycle('eyeColor')],
      ['[Start]', () => this.onConfirm?.(this.getConfig())],
    ];

    controls.forEach(([label, handler], i) => {
      const t = new Text({
        text: label,
        style: { fontFamily: 'monospace', fontSize: 18, fill: 0x88ccff },
      });
      t.x = app.screen.width / 2 - 80;
      t.y = 180 + i * 30;
      t.eventMode = 'static';
      t.cursor = 'pointer';
      t.on('pointerdown', handler);
      this.container!.addChild(t);
    });

    app.stage.addChild(this.container);
  }

  update(_dt: number): void {
    void _dt;
  }

  exit(): void {
    this.container?.destroy({ children: true });
    this.container = null;
    this.label = null;
  }

  private cycle(field: keyof FaceConfig): void {
    if (field === 'gender') {
      const i = GENDERS.indexOf(this.config.gender);
      this.config.gender = GENDERS[(i + 1) % GENDERS.length];
    } else if (field === 'skinTone') {
      const i = SKIN_TONES.indexOf(this.config.skinTone);
      this.config.skinTone = SKIN_TONES[(i + 1) % SKIN_TONES.length];
    } else if (field === 'hairStyle') {
      this.config.hairStyle = (this.config.hairStyle + 1) % NUM_HAIR_STYLES;
    } else if (field === 'hairColor') {
      const i = HAIR_COLORS.indexOf(this.config.hairColor);
      this.config.hairColor = HAIR_COLORS[(i + 1) % HAIR_COLORS.length];
    } else if (field === 'eyeColor') {
      const i = EYE_COLORS.indexOf(this.config.eyeColor);
      this.config.eyeColor = EYE_COLORS[(i + 1) % EYE_COLORS.length];
    }
    this.label!.text = this.renderConfig();
  }

  private renderConfig(): string {
    return [
      `Gender: ${this.config.gender}`,
      `Skin: ${this.config.skinTone}`,
      `Hair: style ${this.config.hairStyle + 1}, ${this.config.hairColor}`,
      `Eyes: ${this.config.eyeColor}`,
      `Sprites: ${getFaceImagePaths(this.config).length} layers`,
    ].join('\n');
  }
}
