import { Component, type Entity } from '../ecs';
import type { SkillEffect } from '../skills/effects/skillEffect';

export class Skill extends Component {
  state: unknown = null;
  completed = true;

  constructor(
    public effect: SkillEffect,
    public user: Entity,
    public parent?: Entity,
    public target?: Entity,
    public multiplier = effect.multiplier,
    public success = effect.success,
  ) {
    super();
  }

  override start(): void {
    this.state = this.effect.start(this);
  }

  override update(dt = 0): void {
    this.state = this.effect.update(this, this.state, dt);
    if (this.completed) {
      this.entity.remove();
      this.effect.remove(this, this.state);
    }
  }
}
