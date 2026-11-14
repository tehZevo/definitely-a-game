import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { Tileset } from '../tiles/tileset';
import { assetUrl } from '../assets';
import { TILE_SIZE } from '../constants';

export class TileRenderer {
  static async render(tileset: Tileset, parent: Container): Promise<void> {
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
        sprite.zIndex = y * TILE_SIZE - (tile.solid ? 0 : 1);
        parent.addChild(sprite);
      }
    }
  }
}
