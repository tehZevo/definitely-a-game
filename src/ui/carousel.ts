import { UIComponent } from './uiComponent';
import { KeyHandler } from '../core/keyHandler';

export class Carousel extends UIComponent implements KeyHandler {
  labels: string[];
  selection: number;
  on_change: (index: number) => void;
  size: number;

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
  }
}
