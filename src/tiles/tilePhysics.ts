import { Component } from '../ecs';
import type { Tileset } from '../tiles/tileset';
import { CHUNK_SIZE, PHYS_SCALE } from '../constants';
import type { Vector2 } from '../utils/vector';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function buildRects(cx: number, cy: number, chunk: Tileset): Rect[] {
  const solid: boolean[][] = [];
  for (let y = 0; y < CHUNK_SIZE; y++) {
    solid[y] = [];
    for (let x = 0; x < CHUNK_SIZE; x++) {
      solid[y][x] = chunk.tileAt(x, y)?.solid ?? false;
    }
  }

  const rects: Rect[] = [];
  for (let y = 0; y < CHUNK_SIZE; y++) {
    for (let x = 0; x < CHUNK_SIZE; x++) {
      if (!solid[y][x]) continue;
      let w = 0;
      while (x + w < CHUNK_SIZE && solid[y][x + w]) w++;
      let h = 0;
      while (y + h < CHUNK_SIZE) {
        let allSolid = true;
        for (let w2 = 0; w2 < w; w2++) {
          if (!solid[y + h][x + w2]) { allSolid = false; break; }
        }
        if (!allSolid) break;
        h++;
      }
      if (w > 0 && h > 0) {
        for (let x2 = 0; x2 < w; x2++) {
          for (let y2 = 0; y2 < h; y2++) {
            solid[y + y2][x + x2] = false;
          }
        }
        rects.push({
          x: (cx * CHUNK_SIZE + x) * PHYS_SCALE,
          y: (cy * CHUNK_SIZE + y) * PHYS_SCALE,
          w: w * PHYS_SCALE,
          h: h * PHYS_SCALE,
        });
      }
    }
  }
  return rects;
}

export class TilePhysics extends Component {
  chunkRects: Map<string, Rect[]> = new Map();

  constructor(chunks?: Map<string, Tileset>) {
    super();
    if (chunks) {
      for (const [key, chunk] of chunks) {
        const [cx, cy] = key.split(',').map(Number);
        this.loadChunk(cx, cy, chunk);
      }
    }
  }

  loadChunk(cx: number, cy: number, chunk: Tileset): void {
    const key = `${cx},${cy}`;
    if (!this.chunkRects.has(key)) {
      this.chunkRects.set(key, buildRects(cx, cy, chunk));
    }
  }

  getRectsForPos(pos: Vector2): Rect[] {
    const centerCx = Math.floor(pos.x / CHUNK_SIZE);
    const centerCy = Math.floor(pos.y / CHUNK_SIZE);
    const rects: Rect[] = [];
    for (const [ox, oy] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]]) {
      const key = `${centerCx + ox},${centerCy + oy}`;
      const chunkRects = this.chunkRects.get(key);
      if (chunkRects) rects.push(...chunkRects);
    }
    return rects;
  }
}
