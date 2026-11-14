import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { TilePhysics } from '../tiles/tilePhysics';
import { TILE_SIZE } from '../constants';

export class Physics extends Component {
  force = new Vector2(0, 0);
  vel = new Vector2(0, 0);
  mass = 1;
  friction = 0.5;
  width = 1;
  height = 1;

  applyForce(force: Vector2): void {
    this.force = this.force.add(force);
  }

  canMoveTo(x: number, y: number): boolean {
    return !this.collidesAt(x, y);
  }

  private collidesAt(x: number, y: number): boolean {
    const world = this.entity.world;
    if (!world) return false;
    const tilePhysics = world.findComponents(TilePhysics);
    if (tilePhysics.length === 0) return false;
    const pos = new Vector2(x / TILE_SIZE, y / TILE_SIZE);
    const rects = tilePhysics[0].getRectsForPos(pos);
    const hw = this.width / 2;
    const hh = this.height / 2;
    for (const r of rects) {
      if (pos.x + hw > r.x && pos.x - hw < r.x + r.w && pos.y + hh > r.y && pos.y - hh < r.y + r.h) {
        return true;
      }
    }
    return false;
  }

  private moveAxis(pos: Position, axis: 'x' | 'y', delta: number): boolean {
    if (delta === 0) return false;
    const world = this.entity.world;
    if (!world) return false;
    const tilePhysics = world.findComponents(TilePhysics);
    if (tilePhysics.length === 0) {
      pos[axis] += delta;
      return false;
    }

    const target = axis === 'x' ? pos.x + delta : pos.y + delta;
    const targetPos = axis === 'x'
      ? new Vector2(target / TILE_SIZE, pos.y / TILE_SIZE)
      : new Vector2(pos.x / TILE_SIZE, target / TILE_SIZE);
    const rects = tilePhysics[0].getRectsForPos(targetPos);
    const hw = this.width / 2;
    const hh = this.height / 2;
    const posTile = axis === 'x' ? target / TILE_SIZE : pos.x / TILE_SIZE;
    const posTileOther = axis === 'x' ? pos.y / TILE_SIZE : target / TILE_SIZE;
    let snap: number | null = null;
    let collided = false;

    for (const r of rects) {
      const overlapsOther = axis === 'x'
        ? posTileOther + hh > r.y && posTileOther - hh < r.y + r.h
        : posTile + hw > r.x && posTile - hw < r.x + r.w;
      if (!overlapsOther) continue;

      if (axis === 'x') {
        const right = posTile + hw;
        const left = posTile - hw;
        if (delta > 0 && right > r.x && left < r.x) {
          collided = true;
          const candidate = (r.x - hw) * TILE_SIZE;
          snap = snap === null ? candidate : Math.min(snap, candidate);
        } else if (delta < 0 && left < r.x + r.w && right > r.x + r.w) {
          collided = true;
          const candidate = (r.x + r.w + hw) * TILE_SIZE;
          snap = snap === null ? candidate : Math.max(snap, candidate);
        }
      } else {
        const bottom = posTileOther + hh;
        const top = posTileOther - hh;
        if (delta > 0 && bottom > r.y && top < r.y) {
          collided = true;
          const candidate = (r.y - hh) * TILE_SIZE;
          snap = snap === null ? candidate : Math.min(snap, candidate);
        } else if (delta < 0 && top < r.y + r.h && bottom > r.y + r.h) {
          collided = true;
          const candidate = (r.y + r.h + hh) * TILE_SIZE;
          snap = snap === null ? candidate : Math.max(snap, candidate);
        }
      }
    }

    if (collided && snap !== null) {
      pos[axis] = snap;
      return true;
    }
    if (!collided) pos[axis] = target;
    return false;
  }

  override update(dt = 0): void {
    const pos = this.entity.getComponent(Position);
    if (!pos) return;
    this.vel = this.vel.add(this.force.scale(dt / this.mass));
    if (this.moveAxis(pos, 'x', this.vel.x * dt)) this.vel.x = 0;
    if (this.moveAxis(pos, 'y', this.vel.y * dt)) this.vel.y = 0;
    this.force = new Vector2(0, 0);
    this.vel = this.vel.scale(1 / (1 + this.friction));
  }
}
