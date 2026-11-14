import type { Container, Rectangle } from 'pixi.js';

export enum ScreenAnchor {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  CENTER_LEFT = 'center-left',
  CENTER = 'center',
  CENTER_RIGHT = 'center-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

export interface AnchorOffset {
  x?: number;
  y?: number;
}

function anchorPoint(screen: Rectangle, anchor: ScreenAnchor): { x: number; y: number } {
  switch (anchor) {
    case ScreenAnchor.TOP_LEFT:
      return { x: 0, y: 0 };
    case ScreenAnchor.TOP_CENTER:
      return { x: screen.width / 2, y: 0 };
    case ScreenAnchor.TOP_RIGHT:
      return { x: screen.width, y: 0 };
    case ScreenAnchor.CENTER_LEFT:
      return { x: 0, y: screen.height / 2 };
    case ScreenAnchor.CENTER:
      return { x: screen.width / 2, y: screen.height / 2 };
    case ScreenAnchor.CENTER_RIGHT:
      return { x: screen.width, y: screen.height / 2 };
    case ScreenAnchor.BOTTOM_LEFT:
      return { x: 0, y: screen.height };
    case ScreenAnchor.BOTTOM_CENTER:
      return { x: screen.width / 2, y: screen.height };
    case ScreenAnchor.BOTTOM_RIGHT:
      return { x: screen.width, y: screen.height };
  }
}

export function mountToScreen(
  container: Container,
  screen: Rectangle,
  anchor: ScreenAnchor,
  offset: AnchorOffset = {},
): void {
  const point = anchorPoint(screen, anchor);
  container.x = point.x + (offset.x ?? 0);
  container.y = point.y + (offset.y ?? 0);
}
