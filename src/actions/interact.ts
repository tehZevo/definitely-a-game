import { Action } from './action';
import { Actor } from '../actor/actor';
import { Interactable } from '../core/interactable';

export class Interact extends Action {
  constructor() {
    super();
    this.interruptible = false;
  }

  override start(): void {
    if (!this.entity) return;
    const actor = this.entity.getComponent(Actor);
    if (!actor) return;
    const world = this.entity.world;
    if (!world) return;
    const interactables = world.find(Interactable);
    for (const e of interactables) {
      const comp = e.getComponent(Interactable);
      if (comp) comp.interact(this.entity);
    }
  }

  serialize(): Record<string, unknown> {
    return {};
  }
}
