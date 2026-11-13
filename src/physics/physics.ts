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
      const rx = r.x / TILE_SIZE;
      const ry = r.y / TILE_SIZE;
      const rw = r.w / TILE_SIZE;
      const rh = r.h / TILE_SIZE;
      if (x + hw > rx && x - hw < rx + rw && y + hh > ry && y - hh < ry + rh) {
        return true;
      }
    }
    return false;
  }

  override update(dt = 0): void {
    const pos = this.entity.getComponent(Position);
    if (!pos) return;
    this.vel = this.vel.add(this.force.scale(dt / this.mass));
    const nx = pos.x + this.vel.x * dt;
    const ny = pos.y + this.vel.y * dt;
    if (!this.collidesAt(nx, pos.y)) pos.x = nx;
    if (!this.collidesAt(pos.x, ny)) pos.y = ny;
    this.force = new Vector2(0, 0);
    this.vel = this.vel.scale(1 / (1 + this.friction));
  }
}
