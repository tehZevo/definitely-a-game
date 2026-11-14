import type { Container as PixiContainer, Text as PixiText, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { UIComponent } from './uiComponent';
import { KeyHandler } from '../core/keyHandler';

const CHAR_WIDTH = 8;
const LINE_HEIGHT = 8;
const PADDING = 8;

export class Carousel extends UIComponent implements KeyHandler {
  labels: string[];
  selection: number;
  on_change: (index: number) => void;
  size: number;
  private view: PixiContainer | null = null;
  private label: PixiText | null = null;

  constructor(
    labels: string[],
    selection = 0,
    size?: number,
    onChange: (index: number) => void = () => {},
  ) {
    super();
    this.labels = labels;
    this.selection = selection;
    this.on_change = onChange;
    this.size = size ?? Math.max(...labels.map((l) => l.length));
  }

  handleKeys(keys: Set<string>): void {
    const old = this.selection;
    if (keys.has('ArrowLeft')) this.selection -= 1;
    if (keys.has('ArrowRight')) this.selection += 1;
    this.selection = ((this.selection % this.labels.length) + this.labels.length) % this.labels.length;
    if (old !== this.selection) this.on_change(this.selection);
    this.sync();
  }

  displayValue(): string {
    return this.labels[this.selection]?.slice(0, this.size) ?? '';
  }

  async render(parent: PixiContainer): Promise<PixiContainer> {
    this.view?.destroy({ children: true });
    const { Assets, Container, Sprite: PixiSprite, Text } = await import('pixi.js');
    const container = new Container();
    const [bgTexture, borderTexture] = await Promise.all([
      Assets.load<Texture>(assetUrl('assets/ui/slot_bg.png')),
      Assets.load<Texture>(assetUrl('assets/ui/slot_border.png')),
    ]);

    const width = this.size * CHAR_WIDTH + PADDING * 2;
    const height = LINE_HEIGHT + PADDING * 2;

    const bg = new PixiSprite(bgTexture);
    bg.eventMode = 'none';
    bg.width = width;
    bg.height = height;
    container.addChild(bg);

    const label = new Text({
      text: this.displayValue(),
      style: { fontFamily: 'monospace', fontSize: 16, fill: 0xffffff },
    });
    label.eventMode = 'none';
    label.x = PADDING;
    label.y = PADDING;
    container.addChild(label);

    const border = new PixiSprite(borderTexture);
    border.eventMode = 'none';
    border.width = width;
    border.height = height;
    container.addChild(border);

    parent.addChild(container);
    this.view = container;
    this.label = label;
    return container;
  }

  sync(): void {
    if (this.label) {
      this.label.text = this.displayValue();
    }
  }
}
