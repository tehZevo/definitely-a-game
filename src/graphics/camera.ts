import { Container } from 'pixi.js';
import { Vector2 } from '../utils/vector';

export interface CameraTransform {
  x: number;
  y: number;
  scale: number;
}

export function cameraTransform(
  target: Vector2,
  viewW: number,
  viewH: number,
  zoom: number,
): CameraTransform {
  return {
    x: Math.round(viewW / 2 - target.x * zoom),
    y: Math.round(viewH / 2 - target.y * zoom),
    scale: zoom,
  };
}

export class Camera {
  zoom = 4;
  constructor(private target: Container) {}

  follow(pos: Vector2, viewW: number, viewH: number): void {
    const t = cameraTransform(pos, viewW, viewH, this.zoom);
    this.target.scale.set(t.scale);
    this.target.x = t.x;
    this.target.y = t.y;
  }
}
