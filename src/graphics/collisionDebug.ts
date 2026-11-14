import { Container, Graphics } from 'pixi.js';
import { TILE_SIZE } from '../constants';
import type { TilePhysics } from '../tiles/tilePhysics';

const OUTLINE_COLOR = 0xff00ff;
const OUTLINE_ALPHA = 0.45;
const LINE_WIDTH = 1;

export function drawCollisionDebug(physics: TilePhysics, parent: Container): Container {
  const container = new Container();
  const graphics = new Graphics();
  container.addChild(graphics);

  for (const rects of physics.chunkRects.values()) {
    for (const rect of rects) {
      graphics.rect(
        rect.x * TILE_SIZE,
        rect.y * TILE_SIZE,
        rect.w * TILE_SIZE,
        rect.h * TILE_SIZE,
      ).stroke({
        width: LINE_WIDTH,
        color: OUTLINE_COLOR,
        alpha: OUTLINE_ALPHA,
      });
    }
  }

  parent.addChild(container);
  return container;
}
