import { Target } from './target';
import type { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import type { Entity } from '../../ecs';

export class SelfTarget extends Target {
  constructor(children: SkillEffect | SkillEffect[] = []) {
    super(
      [(skill: Skill) => (actor: Entity) => actor === skill.user],
      1,
      children,
    );
  }
}
