import { SkillEffect } from './skillEffect';
import { Skill } from '../skill';
import type { Entity } from '../../ecs';
import type { Filter } from '../targetFilters';
import { Position } from '../../physics/position';
import { Actor } from '../../actor/actor';

export function applyTarget(
  skill: Skill,
  filters: Filter[],
  maxTargets: number,
  children: SkillEffect[],
): Entity[] {
  const world = skill.entity.world;
  if (!world) return [];
  let actors = world.find(Actor);
  for (const filter of filters) {
    actors = actors.filter((a) => filter(skill)(a));
  }
  actors = actors.slice(0, maxTargets);
  for (const target of actors) {
    const targetPos = target.getComponent(Position);
    const pos = targetPos ? new Position(targetPos.x, targetPos.y) : new Position(0, 0);
    for (const child of children) {
      world.createEntity([pos, new Skill(child, skill.user, skill.entity, target)]);
    }
  }
  return actors;
}

export class Target extends SkillEffect {
  filters: Filter[];
  children: SkillEffect[];
  maxTargets: number;

  constructor(
    filters: Filter | Filter[] = [],
    maxTargets = 1,
    children: SkillEffect | SkillEffect[] = [],
  ) {
    super();
    this.filters = Array.isArray(filters) ? filters : [filters];
    this.children = Array.isArray(children) ? children : [children];
    this.maxTargets = maxTargets;
  }

  override start(skill: Skill): unknown {
    return applyTarget(skill, this.filters, this.maxTargets, this.children);
  }
}
