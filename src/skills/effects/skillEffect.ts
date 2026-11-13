import type { Skill } from '../skill';

export class SkillEffect {
  start(skill: Skill): unknown {
    void skill;
    return null;
  }

  update(skill: Skill, state: unknown): unknown {
    void skill;
    return state;
  }

  remove(skill: Skill, state: unknown): void {
    void skill;
    void state;
  }
}
