import { Container } from 'pixi.js';
import { BitmapText } from './bitmapText';

export class Tooltip {
  private container = new Container();
  private text: BitmapText;

  constructor(stage: Container) {
    this.text = new BitmapText({
      text: '',
      style: {
        fontSize: 8,
        fill: 0xffffff,
        wordWrap: true,
        wordWrapWidth: 160,
      },
    });
    this.container.addChild(this.text);
    this.container.visible = false;
    this.container.eventMode = 'none';
    this.container.zIndex = 1000;
    stage.addChild(this.container);
  }

  show(text: string, x: number, y: number): void {
    this.text.text = text;
    this.container.x = x;
    this.container.y = y;
    this.container.visible = true;
  }

  hide(): void {
    this.container.visible = false;
  }
}
