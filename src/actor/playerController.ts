import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { Actor } from './actor';
import type { SkillDef } from '../skills/skillDef';
import { useSkill } from '../skills/useSkill';
import type { InputSource } from '../core/input';

export class PlayerController extends Component {
  speed = 120;
  private input: InputSource;
  private skill?: SkillDef;
  private attackTimer = 0;

  constructor(input: InputSource, skill?: SkillDef) {
    super();
    this.input = input;
    this.skill = skill;
  }

  override update(dt = 0): void {
    const axis = this.input.getAxis();
    const raw = new Vector2(axis.x, axis.y);
    const len = raw.length();
    const sprite = this.entity.getComponent(Sprite);
    const actor = this.entity.getComponent(Actor);
    if (len === 0) {
      sprite?.setAnimation('idle');
    } else {
      sprite?.setAnimation('walk');
      const dir = raw.scale(1 / len);
      const pos = this.entity.getComponent(Position);
      if (pos) {
        pos.x += dir.x * this.speed * dt;
        pos.y += dir.y * this.speed * dt;
      }
      if (actor) {
        actor.lookDir = dir;
        actor.moveDir = dir;
      }
    }
    this.attackTimer = Math.max(0, this.attackTimer - dt);
    if (this.skill && this.attackTimer === 0 && this.input.isPressed('Space')) {
      if (this.entity.world) {
        useSkill(this.entity.world, this.skill, this.entity);
        this.attackTimer = this.skill.useTime;
      }
    }
  }
}
