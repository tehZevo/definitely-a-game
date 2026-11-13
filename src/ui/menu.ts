import { Screen } from './screen';

export interface MenuItem {
  label: string;
  action: (menu: Menu) => void;
}

export class Menu extends Screen {
  options: MenuItem[];
  selection = 0;
  uiManager: import('./uiManager').UIManager | null = null;

  constructor(options: MenuItem[] = [], selection = 0) {
    super();
    this.options = options;
    this.selection = selection;
  }

  override handleKeys(keys: Set<string>): void {
    if (keys.has('ArrowDown')) this.down();
    if (keys.has('ArrowUp')) this.up();
    if (keys.has('Space')) this.select();
  }

  down(): void {
    this.selection = Math.max(0, Math.min(this.selection + 1, this.options.length - 1));
  }

  up(): void {
    this.selection = Math.max(0, Math.min(this.selection - 1, this.options.length - 1));
  }

  select(): void {
    if (this.options[this.selection]) {
      this.options[this.selection].action(this);
    }
  }

  override onDestroy(): void {
    this.uiManager?.pop();
  }
}
