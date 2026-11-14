import { Component, type Entity } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { TILE_SIZE, ENEMY_TARGET_DISTANCE } from '../constants';
import { Actor } from '../actor/actor';
import { PlayerController } from '../actor/playerController';
import { Sprite } from '../graphics/sprite';
import { UseSkill } from '../actions/useSkill';
import { defaultAttack } from '../data/skills/defaultAttack';
import { SkillSlot } from '../skills/skillSlot';
import { SkillSlots } from '../skills/skillSlots';
import type { MobDef } from './mobdef';
import type { SkillDef } from '../skills/skillDef';

export class MobAI extends Component {
  speed = 40;
  aggroRange = ENEMY_TARGET_DISTANCE * TILE_SIZE;
  stopRange = 12;
  attackDist = 2 * TILE_SIZE;
  target: Entity | null = null;

  constructor(public mobdef?: MobDef) {
    super();
  }

  private getSkill(): SkillDef {
    const skills = this.mobdef?.skills;
    if (skills && skills.length > 0) {
      return skills[Math.floor(Math.random() * skills.length)];
    }
    return this.entity.getComponent(SkillSlots)?.get(SkillSlot.ALPHA) ?? defaultAttack;
  }

  private findTarget(): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    if (!world || !pos) {
      this.target = null;
      return;
    }
    let best: Entity | null = null;
    let bestDist = this.aggroRange;
    for (const player of world.find(PlayerController)) {
      const playerPos = player.getComponent(Position);
      const playerActor = player.getComponent(Actor);
      if (!playerPos || (playerActor && !playerActor.alive)) continue;
      const dist = new Vector2(playerPos.x - pos.x, playerPos.y - pos.y).length();
      if (dist <= bestDist) {
        bestDist = dist;
        best = player;
      }
    }
    this.target = best;
  }

  override update(dt = 0): void {
    const pos = this.entity.getComponent(Position);
    const actor = this.entity.getComponent(Actor);
    if (!pos || !actor) return;

    const targetActor = this.target?.getComponent(Actor);
    if (!this.target || (targetActor && !targetActor.alive)) {
      this.findTarget();
    }
    const targetPos = this.target?.getComponent(Position);
    if (!targetPos) return;

    const to = new Vector2(targetPos.x - pos.x, targetPos.y - pos.y);
    const dist = to.length();
    if (dist === 0) return;

    const dir = to.scale(1 / dist);
    actor.lookDir = dir;
    if (actor.busy) return;

    if (dist <= this.attackDist) {
      actor.act(new UseSkill(this.getSkill()));
      return;
    }

    if (dist <= this.stopRange) return;

    const sprite = this.entity.getComponent(Sprite);
    if (sprite && dir.x !== 0) {
      sprite.flip = dir.x < 0 ? 'x' : 'none';
    }

    const step = Math.min(this.speed * dt, dist - this.stopRange);
    pos.x += dir.x * step;
    pos.y += dir.y * step;
  }
}
