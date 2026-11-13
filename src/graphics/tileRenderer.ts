import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { Tileset } from '../tiles/tileset';
import { assetUrl } from '../assets';

export class TileRenderer {
  static async render(tileset: Tileset, parent: Container): Promise<void> {
    const cache = new Map<string, Texture>();
    for (let y = 0; y < tileset.height; y++) {
      for (let x = 0; x < tileset.width; x++) {
        const tile = tileset.tileAt(x, y);
        if (!tile) continue;
        let tex = cache.get(tile.imagePath);
        if (!tex) {
          tex = await Assets.load<Texture>(assetUrl(tile.imagePath));
          cache.set(tile.imagePath, tex);
        }
        const sprite = new PixiSprite(tex);
        sprite.x = x * tex.width;
        sprite.y = y * tex.height;
        parent.addChild(sprite);
      }
    }
  }
}
