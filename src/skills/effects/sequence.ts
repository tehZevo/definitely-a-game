import { createChildSkill, SkillEffect, type SkillEffectOptions } from './skillEffect';
import type { Skill } from '../skill';

export interface SequenceState {
  index: number;
  timer: number;
}

export class Sequence extends SkillEffect {
  constructor(
    public effects: SkillEffect[],
    public delay = 0,
    options: SkillEffectOptions = {},
  ) {
    super(options);
  }

  override start(skill: Skill): SequenceState {
    if (this.effects.length === 0) {
      skill.completed = true;
    } else {
      skill.completed = false;
    }
    return { index: 0, timer: 0 };
  }

  override update(skill: Skill, state: unknown, dt = 0): SequenceState {
    const s = state as SequenceState;
    if (this.effects.length === 0) {
      skill.completed = true;
      return s;
    }

    s.timer -= dt;
    if (s.timer > 0) return s;

    const effect = this.effects[s.index];
    const world = skill.entity.world;
    if (effect && world) {
      createChildSkill(world, skill, effect, skill.target);
    }

    s.index += 1;
    if (s.index >= this.effects.length) {
      skill.completed = true;
    } else {
      s.timer = this.delay;
    }
    return s;
  }
}
