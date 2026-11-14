import { SkillEffect, createChildSkill } from './skillEffect';
import type { Skill } from '../../actor/skill';
import type { Entity } from '../../ecs';
import type { Filter } from '../targetFilters';
import { Actor } from '../../actor/actor';

export function applyTarget(
  skill: Skill,
  filters: Filter[],
  maxTargets: number | null,
  children: SkillEffect[],
): Entity[] {
  if (!skill.entity) return [];
  const world = skill.entity.world;
  if (!world) return [];
  let actors = world.find(Actor);
  for (const filter of filters) {
    actors = actors.filter((a) => filter(skill)(a));
  }
  actors = maxTargets === null ? actors : actors.slice(0, maxTargets);
  for (const target of actors) {
    for (const child of children) {
      createChildSkill(world, skill, child, target);
    }
  }
  return actors;
}

export class Target extends SkillEffect {
  filters: Filter[];
  maxTargets: number | null;

  constructor(
    filters: Filter | Filter[] = [],
    maxTargets: number | null = 1,
    children: SkillEffect | SkillEffect[] = [],
    multiplier = 1,
  ) {
    super({ children, multiplier });
    this.filters = Array.isArray(filters) ? filters : [filters];
    this.maxTargets = maxTargets;
  }

  override start(skill: Skill): unknown {
    const targets = applyTarget(skill, this.filters, this.maxTargets, this.children);
    skill.success = targets.length > 0;
    return targets;
  }
}
