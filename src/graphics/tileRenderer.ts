import type { Container as PixiContainer, Sprite as PixiSprite, Texture } from 'pixi.js';
import { Tileset } from '../tiles/tileset';
import { assetUrl } from '../assets';
import { TILE_SIZE } from '../constants';
import type { Position } from '../physics/position';
import { ySortZ } from './ySort';

const BEHIND_ALPHA = 0.5;
const NORMAL_ALPHA = 1;

export function isBehindTile(px: number, py: number, tx: number, ty: number): boolean {
  return px > tx - 1 && px < tx + 1 && py < ty && py > ty - 1.5;
}

interface WallView {
  sprite: PixiSprite;
  x: number;
  y: number;
}

export class TileRenderer {
  private walls: WallView[] = [];

  private constructor() {}

  static async render(tileset: Tileset, parent: PixiContainer): Promise<TileRenderer> {
    const { Assets, Sprite: PixiSprite } = await import('pixi.js');
    const renderer = new TileRenderer();
    parent.sortableChildren = true;
    const cache = new Map<string, Texture>();

    for (let y = 0; y < tileset.height; y++) {
      for (let x = 0; x < tileset.width; x++) {
        const tile = tileset.tileAt(x, y);
        if (!tile || !tile.imagePath) continue;
        let tex = cache.get(tile.imagePath);
        if (!tex) {
          const loaded = await Assets.load<Texture>(assetUrl(tile.imagePath));
          loaded.source.scaleMode = 'nearest';
          tex = loaded;
          cache.set(tile.imagePath, tex);
        }
        const sprite = new PixiSprite(tex);
        sprite.x = x * TILE_SIZE;
        sprite.y = y * TILE_SIZE;
        sprite.zIndex = ySortZ(y * TILE_SIZE, TILE_SIZE);
        parent.addChild(sprite);

        if (tile.solid) {
          renderer.walls.push({ sprite, x, y });
        }
      }
    }

    return renderer;
  }

  update(playerPos: Position): void {
    const px = playerPos.x / TILE_SIZE;
    const py = playerPos.y / TILE_SIZE;
    for (const wall of this.walls) {
      wall.sprite.alpha = isBehindTile(px, py, wall.x, wall.y) ? BEHIND_ALPHA : NORMAL_ALPHA;
    }
  }
}
