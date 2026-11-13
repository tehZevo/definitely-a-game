export class Keyboard {
  pressed: Set<string> = new Set();
  released: Set<string> = new Set();
  held: Set<string> = new Set();
  unicode: string | null = null;

  constructor(events: Array<{ type: 'keydown' | 'keyup'; code: string; key?: string }>) {
    for (const event of events) {
      if (event.type === 'keydown') {
        this.pressed.add(event.code);
        if (event.key) this.unicode = event.key;
      }
      if (event.type === 'keyup') {
        this.released.add(event.code);
      }
    }
  }

  isPressed(code: string): boolean {
    return this.pressed.has(code);
  }

  isReleased(code: string): boolean {
    return this.released.has(code);
  }

  isHeld(code: string): boolean {
    return this.held.has(code);
  }
}
