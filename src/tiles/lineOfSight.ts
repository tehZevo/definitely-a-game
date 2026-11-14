import { TILE_SIZE } from '../constants';
import type { TilePhysics } from './tilePhysics';

export function hasLineOfSight(
  physics: TilePhysics,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): boolean {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.hypot(dx, dy);
  const steps = Math.max(1, Math.ceil(distance / (TILE_SIZE / 2)));
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const x = fromX + dx * t;
    const y = fromY + dy * t;
    if (physics.isSolidAt(Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE))) {
      return false;
    }
  }
  return true;
}
