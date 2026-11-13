import { UIComponent } from './uiComponent';
import { KeyHandler } from '../core/keyHandler';

export class TextField extends UIComponent implements KeyHandler {
  onSubmit: (text: string) => void;
  drawLength: number;
  maxLength: number | null;
  text: string;

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
  }
}
