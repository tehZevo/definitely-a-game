import { Assets, Container, Sprite as PixiSprite, Text, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { UIComponent } from './uiComponent';
import { KeyHandler } from '../core/keyHandler';

const CHAR_WIDTH = 8;
const LINE_HEIGHT = 8;
const PADDING = 8;

export class TextField extends UIComponent implements KeyHandler {
  onSubmit: (text: string) => void;
  drawLength: number;
  maxLength: number | null;
  text: string;
  private view: Container | null = null;
  private textLabel: Text | null = null;

  constructor(
    onSubmit: (text: string) => void,
    text?: string,
    drawLength = 10,
    maxLength: number | null = null,
  ) {
    super();
    this.onSubmit = onSubmit;
    this.drawLength = drawLength;
    this.maxLength = maxLength;
    this.text = text ?? '';
  }

  handleKeys(keys: Set<string>): void {
    if (keys.has('Backspace')) {
      this.text = this.text.slice(0, -1);
    } else if (keys.has('Enter')) {
      this.onSubmit(this.text);
    }
    this.sync();
  }

  displayValue(): string {
    return `${this.text.slice(-this.drawLength)}_`;
  }

  async render(parent: Container): Promise<Container> {
    this.view?.destroy({ children: true });
    const container = new Container();
    const box = await Assets.load<Texture>(assetUrl('assets/ui/box.png'));
    const bg = new PixiSprite(box);
    bg.eventMode = 'none';
    bg.width = (this.drawLength + 2) * CHAR_WIDTH;
    bg.height = 3 * LINE_HEIGHT;
    container.addChild(bg);

    this.textLabel = new Text({
      text: this.displayValue(),
      style: { fontFamily: 'monospace', fontSize: 16, fill: 0xffffff },
    });
    this.textLabel.eventMode = 'none';
    this.textLabel.x = PADDING;
    this.textLabel.y = PADDING;
    container.addChild(this.textLabel);

    parent.addChild(container);
    this.view = container;
    return container;
  }

  sync(): void {
    if (this.textLabel) {
      this.textLabel.text = this.displayValue();
    }
  }
}
