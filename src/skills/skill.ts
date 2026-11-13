import { Component, type Entity } from '../ecs';
import type { SkillEffect } from './effects/skillEffect';

export class Skill extends Component {
  state: unknown = null;
  completed = true;

  constructor(
    public effect: SkillEffect,
    public user: Entity,
    public parent?: Entity,
    public target?: Entity,
  ) {
    super();
  }

  override start(): void {
    this.state = this.effect.start(this);
  }

  override update(_dt = 0): void {
    this.state = this.effect.update(this, this.state);
    if (this.completed) {
      this.entity.remove();
      this.effect.remove(this, this.state);
    }
  }
}
