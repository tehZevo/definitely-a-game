import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { TILE_SIZE } from '../constants';
import { Actor } from '../actor/actor';
import { PlayerController } from '../actor/playerController';
import { UseSkill } from '../actions/useSkill';
import { defaultAttack } from '../data/skills/defaultAttack';
import { SkillSlot } from '../skills/skillSlot';
import { SkillSlots } from '../skills/skillSlots';
import type { SkillDef } from '../skills/skillDef';

export class MobAI extends Component {
  speed = 40;
  aggroRange = 120;
  stopRange = 12;
  attackDist = 2 * TILE_SIZE;

  private getSkill(): SkillDef {
    return this.entity.getComponent(SkillSlots)?.get(SkillSlot.ALPHA) ?? defaultAttack;
  }

  override update(dt = 0): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    const actor = this.entity.getComponent(Actor);
    if (!world || !pos || !actor) return;

    const players = world.find(PlayerController);
    if (players.length === 0) return;
    const target = players[0].getComponent(Position);
    if (!target) return;

    const to = new Vector2(target.x - pos.x, target.y - pos.y);
    const dist = to.length();
    if (dist === 0 || dist > this.aggroRange) return;

    const dir = to.scale(1 / dist);
    actor.lookDir = dir;

    if (actor.busy) return;

    if (dist <= this.attackDist) {
      actor.act(new UseSkill(this.getSkill()));
      return;
    }

    if (dist <= this.stopRange) return;

    const step = Math.min(this.speed * dt, dist - this.stopRange);
    pos.x += dir.x * step;
    pos.y += dir.y * step;
  }
}
