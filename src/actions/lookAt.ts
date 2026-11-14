import { Action } from './action';
import { Actor } from '../actor/actor';
import { Vector2 } from '../utils/vector';

export class LookAt extends Action {
  constructor(public dir: Vector2) {
    super();
    this.active = true;
  }

  override start(): void {
    this.apply();
  }

  override update(): void {
    this.apply();
    this.active = false;
  }

  private apply(): void {
    const actor = this.entity?.getComponent(Actor);
    if (!actor) return;
    actor.lookDir = this.dir.length() === 0 ? new Vector2(0, -1) : this.dir.normalize();
  }

  serialize(): Record<string, unknown> {
    return { dir: { x: this.dir.x, y: this.dir.y } };
  }
}
