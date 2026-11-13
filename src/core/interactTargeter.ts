import { Component } from '../ecs';
import { Actor } from '../actor/actor';
import { Position } from '../physics/position';
import { Interactable } from '../core/interactable';
import { findInRange } from '../utils/findInRange';

const INTERACT_RADIUS = 1;
const INTERACT_TARGET_DISTANCE = 1;

export class InteractTargeter extends Component {
  interactTarget: import('../ecs').Entity | null = null;
  timeSinceLastUpdate = 0;

  override start(): void {
    this.entity.ensureComponent(Actor);
    this.entity.ensureComponent(Position);
  }

  override update(dt = 0): void {
    this.timeSinceLastUpdate += dt;
    if (this.interactTarget && !this.interactTarget.alive) {
      this.interactTarget = null;
    }
    if (this.timeSinceLastUpdate < 0.25) return;
    this.timeSinceLastUpdate = 0;

    const world = this.entity.world;
    if (!world) return;
    const pos = this.entity.getComponent(Position);
    const actor = this.entity.getComponent(Actor);
    if (!pos || !actor) return;

    const centerX = pos.x + actor.lookDir.x * INTERACT_TARGET_DISTANCE;
    const centerY = pos.y + actor.lookDir.y * INTERACT_TARGET_DISTANCE;
    const interactables = findInRange(world, Interactable, centerX, centerY, INTERACT_RADIUS);
    const newTarget = interactables.length > 0 ? interactables[0] : null;

    if (newTarget !== this.interactTarget) {
      this.interactTarget = newTarget;
    }
  }
}
