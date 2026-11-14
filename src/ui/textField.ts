import type { Container as PixiContainer, Text as PixiText, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { UIComponent } from './uiComponent';
import { KeyHandler } from '../core/keyHandler';

const CHAR_WIDTH = 8;
const LINE_HEIGHT = 8;
const PADDING = 8;
const ICON_SIZE = 16;

export class TextField extends UIComponent implements KeyHandler {
  onSubmit: (text: string) => void;
  onCancel: (() => void) | null;
  drawLength: number;
  maxLength: number | null;
  text: string;
  private view: PixiContainer | null = null;
  private textLabel: PixiText | null = null;
  private hintLabel: PixiText | null = null;

  constructor(
    onSubmit: (text: string) => void,
    text?: string,
    drawLength = 10,
    maxLength: number | null = null,
    onCancel: (() => void) | null = null,
  ) {
    super();
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;
    this.drawLength = drawLength;
    this.maxLength = maxLength;
    this.text = text ?? '';
  }

  handleKeys(keys: Set<string>): void {
    if (keys.has('Backspace')) {
      this.text = this.text.slice(0, -1);
    } else if (keys.has('Enter')) {
      this.onSubmit(this.text);
    } else if (keys.has('Escape') && this.onCancel) {
      this.onCancel();
    }
    this.sync();
  }

  displayValue(): string {
    return `${this.text.slice(-this.drawLength)}_`;
  }

  hintText(): string {
    return 'Enter: Confirm; Esc: Cancel';
  }

  async render(parent: PixiContainer): Promise<PixiContainer> {
    this.view?.destroy({ children: true });
    const { Assets, Container, Sprite: PixiSprite, Text } = await import('pixi.js');
    const container = new Container();
    const [box, keyboardTexture] = await Promise.all([
      Assets.load<Texture>(assetUrl('assets/ui/box.png')),
      Assets.load<Texture>(assetUrl('assets/ui/keyboard.png')),
    ]);
    const width = (this.drawLength + 2) * CHAR_WIDTH;
    const height = 3 * LINE_HEIGHT;

    const bg = new PixiSprite(box);
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
    this.textLabel = label;

    const keyboard = new PixiSprite(keyboardTexture);
    keyboard.eventMode = 'none';
    keyboard.width = ICON_SIZE;
    keyboard.height = ICON_SIZE;
    keyboard.x = width - ICON_SIZE - 4;
    keyboard.y = height - ICON_SIZE - 4;
    container.addChild(keyboard);

    const hint = new Text({
      text: this.hintText(),
      style: { fontFamily: 'monospace', fontSize: 12, fill: 0xc8c8c8 },
    });
    hint.eventMode = 'none';
    hint.x = PADDING;
    hint.y = height + 4;
    container.addChild(hint);
    this.hintLabel = hint;

    parent.addChild(container);
    this.view = container;
    return container;
  }

  sync(): void {
    if (this.textLabel) {
      this.textLabel.text = this.displayValue();
    }
    if (this.hintLabel) {
      this.hintLabel.text = this.hintText();
    }
  }
}
