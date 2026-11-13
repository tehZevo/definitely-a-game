import { Rectangle, type Texture } from 'pixi.js';
import { Vector2 } from './vector';

export function getFrame(texture: Texture, frameWidth: number, frame: number): Texture {
  const height = texture.source.height;
  return new (require('pixi.js').Texture)({
    source: texture.source,
    frame: new Rectangle(frame * frameWidth, 0, frameWidth, height),
  });
}

export function getFrameT(texture: Texture, frameWidth: number, t: number, clamp = false): Texture {
  const width = texture.source.width;
  const numFrames = Math.floor(width / frameWidth);
  let frame = Math.floor(t * numFrames);
  frame = clamp ? Math.max(0, Math.min(frame, numFrames - 1)) : frame % numFrames;
  return getFrame(texture, frameWidth, frame);
}

export function textToCharRects(text: string): Array<{ x: number; y: number }> {
  const bytes = Buffer.from(text, 'ascii');
  return Array.from(bytes).map((c) => ({
    x: (c % 16) * 8,
    y: Math.floor(c / 16) * 8,
  }));
}

export function get9PatchRects(w: number, h: number): Array<{ x: number; y: number; px: number; py: number }> {
  const rects: Array<{ x: number; y: number; px: number; py: number }> = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x === 0 ? 0 : x === w - 1 ? 2 : 1;
      const py = y === 0 ? 0 : y === h - 1 ? 2 : 1;
      rects.push({ x, y, px, py });
    }
  }
  return rects;
}

export function textOffset(index: number, base: Vector2): Vector2 {
  return new Vector2(base.x + index * 8, base.y);
}

export function textLinesOffset(lineIndex: number, base: Vector2): Vector2 {
  return new Vector2(base.x, base.y + lineIndex * 8);
}
