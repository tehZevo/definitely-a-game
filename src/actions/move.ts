import { Action } from './action';
import { Actor } from '../actor/actor';
import { Physics } from '../physics/physics';
import { Position } from '../physics/position';
import { PLAYER_MOVE_SPEED, PLAYER_MOVE_SPEED_SCALE, TILE_SIZE } from '../constants';
import { Sprite } from '../graphics/sprite';
import { Vector2 } from '../utils/vector';

export class Move extends Action {
  dir: Vector2 | null;

  constructor(dir: Vector2 | null) {
    super();
    this.interruptible = true;
    this.dir = dir && dir.length() > 0 ? dir.normalize() : null;
    this.active = true;
  }

  override start(): void {
    if (!this.dir || this.dir.length() === 0) {
      this.active = false;
    }
  }

  override update(_dt?: number): void {
    if (!this.active || !this.entity) return;
    const actor = this.entity.getComponent(Actor);
    const phys = this.entity.getComponent(Physics);
    const pos = this.entity.getComponent(Position);
    const sprite = this.entity.getComponent(Sprite);
    if (!actor || !phys || !pos) return;

    if (this.dir) {
      const lookDir =
        this.dir.y > 0.5 ? new Vector2(0, 1) :
        this.dir.y < -0.5 ? new Vector2(0, -1) :
        this.dir.x > 0.5 ? new Vector2(1, 0) :
        this.dir.x < -0.5 ? new Vector2(-1, 0) : null;
      if (lookDir) actor.lookDir = lookDir;
      actor.moveDir = this.dir;
      const force = this.dir.scale(PLAYER_MOVE_SPEED * PLAYER_MOVE_SPEED_SCALE * TILE_SIZE);
      phys.applyForce(force);
      const canMove = phys.canMoveTo(pos.x + this.dir.x * 0.01, pos.y + this.dir.y * 0.01);
      sprite?.setAnimation(canMove ? 'walk' : 'idle');
    }
  }

  serialize(): Record<string, unknown> {
    return { dir: this.dir ? { x: this.dir.x, y: this.dir.y } : null };
  }
}
