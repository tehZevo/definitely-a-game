import { Container, Graphics } from 'pixi.js';

const STRIPE_SIZE = 32;
const COLORS = [0x101820, 0x182430] as const;

export class MenuBackground {
  readonly container = new Container();
  private graphics: Graphics;
  private offset = 0;

  constructor(
    private width: number,
    private height: number,
    private speed = 12,
  ) {
    this.graphics = new Graphics();
    this.container.addChild(this.graphics);
    this.draw();
  }

  update(dt: number): void {
    this.offset = (this.offset + this.speed * dt) % STRIPE_SIZE;
    this.draw();
  }

  private draw(): void {
    const g = this.graphics;
    g.clear();
    g.rect(0, 0, this.width, this.height).fill(COLORS[0]);
    const cols = Math.ceil(this.width / STRIPE_SIZE) + 2;
    const rows = Math.ceil(this.height / STRIPE_SIZE) + 2;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((row + col) % 2 !== 0) continue;
        g.rect(
          col * STRIPE_SIZE - STRIPE_SIZE - this.offset,
          row * STRIPE_SIZE - STRIPE_SIZE - this.offset,
          STRIPE_SIZE,
          STRIPE_SIZE,
        ).fill(COLORS[1]);
      }
    }
  }
}
