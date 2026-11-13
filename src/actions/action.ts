import type { Entity } from '../ecs';

export abstract class Action {
  interruptible = true;
  active = false;
  entity: Entity | null = null;

  register(entity: Entity): void {
    this.entity = entity;
  }

  start(): void {}
  update(_dt?: number): void {}
  abstract serialize(): Record<string, unknown>;
}
