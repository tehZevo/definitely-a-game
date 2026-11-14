import { Action } from './action';
import { Actor } from '../actor/actor';
import { Physics } from '../physics/physics';
import { Stats } from '../actor/stats';
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
    const stats = this.entity.getComponent(Stats);
    const sprite = this.entity.getComponent(Sprite);
    if (!actor || !phys || !stats) return;

    if (this.dir) {
      const lookDir =
        this.dir.y > 0.5 ? new Vector2(0, 1) :
        this.dir.y < -0.5 ? new Vector2(0, -1) :
        this.dir.x > 0.5 ? new Vector2(1, 0) :
        this.dir.x < -0.5 ? new Vector2(-1, 0) : null;
      if (lookDir) actor.lookDir = lookDir;
      actor.moveDir = this.dir;
      const force = this.dir.scale(stats.moveSpeed);
      phys.applyForce(force);
      if (sprite) {
        const animName = actor.lookDir.y > 0 ? 'walk_down' : actor.lookDir.y < 0 ? 'walk_up' : 'walk_right';
        sprite.setAnimation(animName);
      }
    }
  }

  serialize(): Record<string, unknown> {
    return { dir: this.dir ? { x: this.dir.x, y: this.dir.y } : null };
  }
}
