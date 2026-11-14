import { describe, it, expect } from 'vitest';
import { Container, Rectangle } from 'pixi.js';
import { ScreenAnchor, mountToScreen } from './screenAnchor';

describe('mountToScreen', () => {
  it('places components at screen corners with offsets', () => {
    const screen = new Rectangle(0, 0, 100, 50);
    const container = new Container();

    mountToScreen(container, screen, ScreenAnchor.BOTTOM_RIGHT, { x: -4, y: -6 });

    expect(container.x).toBe(96);
    expect(container.y).toBe(44);
  });

  it('centers components by default anchor', () => {
    const screen = new Rectangle(0, 0, 100, 50);
    const container = new Container();

    mountToScreen(container, screen, ScreenAnchor.CENTER);

    expect(container.x).toBe(50);
    expect(container.y).toBe(25);
  });
});
