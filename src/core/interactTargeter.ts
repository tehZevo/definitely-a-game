import { Component, type Entity, type World } from '../ecs';
import { Actor } from '../actor/actor';
import { Position } from '../physics/position';
import { Interactable } from '../core/interactable';
import { InteractCursor } from '../core/interactCursor';
import { findInRange } from '../utils/findInRange';
import {
  INTERACT_RADIUS,
  INTERACT_TARGET_DISTANCE,
  INTERACT_TARGET_UPDATE_TIME,
  TILE_SIZE,
} from '../constants';

export class InteractTargeter extends Component {
  interactTarget: Entity | null = null;
  timeSinceLastUpdate = 0;
  cursorEntity: Entity | null = null;

  override start(): void {
    this.entity.ensureComponent(Actor);
    this.entity.ensureComponent(Position);
  }

  override update(dt = 0): void {
    this.timeSinceLastUpdate += dt;
    if (this.cursorEntity && !this.cursorEntity.alive) {
      this.cursorEntity = null;
    }
    if (this.interactTarget && !this.interactTarget.alive) {
      this.interactTarget = null;
      this.removeCursor();
    }
    if (this.timeSinceLastUpdate < INTERACT_TARGET_UPDATE_TIME) return;
    this.timeSinceLastUpdate = 0;

    const world = this.entity.world;
    if (!world) return;
    const pos = this.entity.getComponent(Position);
    const actor = this.entity.getComponent(Actor);
    if (!pos || !actor) return;

    const centerX = pos.x + actor.lookDir.x * INTERACT_TARGET_DISTANCE * TILE_SIZE;
    const centerY = pos.y + actor.lookDir.y * INTERACT_TARGET_DISTANCE * TILE_SIZE;
    const interactables = findInRange(
      world,
      Interactable,
      centerX,
      centerY,
      INTERACT_RADIUS * TILE_SIZE,
      true,
    );
    const newTarget = interactables.length > 0 ? interactables[0] : null;

    if (newTarget !== this.interactTarget) {
      this.interactTarget = newTarget;
    }
    this.syncCursor(world, newTarget);
  }

  private syncCursor(world: World, target: Entity | null): void {
    if (!target) {
      this.removeCursor();
      return;
    }

    const targetPos = target.getComponent(Position);
    if (!targetPos) {
      this.removeCursor();
      return;
    }

    if (!this.cursorEntity || !this.cursorEntity.alive) {
      this.cursorEntity = world.createEntity([
        new Position(targetPos.x, targetPos.y),
        new InteractCursor(),
      ]);
      return;
    }

    const cursorPos = this.cursorEntity.getComponent(Position);
    if (cursorPos) {
      cursorPos.x = targetPos.x;
      cursorPos.y = targetPos.y;
    }
  }

  private removeCursor(): void {
    if (!this.cursorEntity) return;
    this.cursorEntity.remove();
    this.cursorEntity = null;
  }
}
