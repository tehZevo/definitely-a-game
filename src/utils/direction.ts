import { Vector2 } from './vector';

export enum Direction {
  EAST,
  NORTH,
  WEST,
  SOUTH,
}

export function vectorToDirection(v: Vector2): Direction {
  if (v.x > 0.5) return Direction.EAST;
  if (v.x < -0.5) return Direction.WEST;
  if (v.y > 0.5) return Direction.SOUTH;
  return Direction.NORTH;
}

export function directionToVector(d: Direction): Vector2 {
  switch (d) {
    case Direction.EAST: return new Vector2(1, 0);
    case Direction.WEST: return new Vector2(-1, 0);
    case Direction.NORTH: return new Vector2(0, -1);
    case Direction.SOUTH: return new Vector2(0, 1);
  }
}
