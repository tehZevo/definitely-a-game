import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { PLAYER_MOVE_SPEED, PLAYER_MOVE_SPEED_SCALE, TILE_SIZE } from '../constants';
import { Move } from '../actions/move';
import { UseSkill } from '../actions/useSkill';
import { Sprite } from '../graphics/sprite';
import { Actor } from './actor';
import { Equips } from '../items/equips';
import { SKILL_SLOTS, SKILL_SLOT_KEYS } from '../skills/skillSlot';
import type { SkillDef } from '../skills/skillDef';
import { SkillSlots } from '../skills/skillSlots';
import { getSkillUseTime } from '../skills/skillUseTime';
import { useSkill } from '../skills/useSkill';
import { DEFAULT_KEY_MAP } from '../core/keyMap';
import type { InputSource } from '../core/input';

export class PlayerController extends Component {
  get speed(): number {
    return PLAYER_MOVE_SPEED * PLAYER_MOVE_SPEED_SCALE * TILE_SIZE;
  }

  private input: InputSource;
  private skill?: SkillDef;
  private attackTimer = 0;

  constructor(input: InputSource, skill?: SkillDef) {
    super();
    this.input = input;
    this.skill = skill;
  }

  private getPressedSkill(): SkillDef | null {
    const slots = this.entity.getComponent(SkillSlots);
    if (slots) {
      for (const slot of SKILL_SLOTS) {
        if (this.input.isPressed(SKILL_SLOT_KEYS[slot])) {
          const def = slots.get(slot);
          if (def) return def;
        }
      }
    }

    if (this.skill && DEFAULT_KEY_MAP.attack.some((key) => this.input.isPressed(key))) {
      return this.skill;
    }
    return null;
  }

  override update(dt = 0): void {
    const axis = this.input.getAxis();
    const raw = new Vector2(axis.x, axis.y);
    const actor = this.entity.getComponent(Actor);
    const sprite = this.entity.getComponent(Sprite);

    this.attackTimer = Math.max(0, this.attackTimer - dt);
    if (this.attackTimer === 0) {
      const skill = this.getPressedSkill();
      if (skill) {
        if (actor) {
          actor.act(new UseSkill(skill));
        } else if (this.entity.world) {
          useSkill(this.entity.world, skill, this.entity);
        }
        this.attackTimer = getSkillUseTime(skill, this.entity.getComponent(Equips));
        return;
      }
    }

    if (raw.length() === 0) {
      sprite?.setAnimation('idle');
      actor?.act(new Move(null));
      return;
    }

    actor?.act(new Move(raw.normalize()));
  }
}
