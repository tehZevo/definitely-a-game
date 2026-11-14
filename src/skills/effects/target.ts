import { SkillEffect, createChildSkill } from './skillEffect';
import type { Skill } from '../../actor/skill';
import type { Entity } from '../../ecs';
import type { Filter } from '../targetFilters';
import { lineOfSightFilter } from '../targetFilters';
import { Actor } from '../../actor/actor';
import { Position } from '../../physics/position';

export enum TargetOrder {
  NEAREST = 'nearest',
  RANDOM = 'random',
}

function distanceSq(a: Entity, b: Entity): number {
  const ap = a.getComponent(Position);
  const bp = b.getComponent(Position);
  if (!ap || !bp) return 0;
  const dx = ap.x - bp.x;
  const dy = ap.y - bp.y;
  return dx * dx + dy * dy;
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function orderTargets(
  skill: Skill,
  targets: Entity[],
  order: TargetOrder,
  random: () => number,
): Entity[] {
  if (order === TargetOrder.RANDOM) return shuffle(targets, random);
  const source = skill.entity.getComponent(Position);
  if (!source) return targets;
  return [...targets].sort((a, b) => distanceSq(skill.entity, a) - distanceSq(skill.entity, b));
}

export function applyTarget(
  skill: Skill,
  filters: Filter[],
  maxTargets: number | null,
  children: SkillEffect[],
  order: TargetOrder = TargetOrder.NEAREST,
  random: () => number = Math.random,
): Entity[] {
  if (!skill.entity) return [];
  const world = skill.entity.world;
  if (!world) return [];
  let actors = world.find(Actor);
  for (const filter of filters) {
    actors = actors.filter((a) => filter(skill)(a));
  }
  actors = orderTargets(skill, actors, order, random);
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
  order: TargetOrder;
  requiresLos: boolean;

  constructor(
    filters: Filter | Filter[] = [],
    maxTargets: number | null = 1,
    children: SkillEffect | SkillEffect[] = [],
    multiplier = 1,
    order: TargetOrder = TargetOrder.NEAREST,
    requiresLos = false,
  ) {
    super({ children, multiplier });
    const baseFilters = Array.isArray(filters) ? filters : [filters];
    this.filters = requiresLos ? [...baseFilters, lineOfSightFilter()] : baseFilters;
    this.maxTargets = maxTargets;
    this.order = order;
    this.requiresLos = requiresLos;
  }

  override start(skill: Skill): unknown {
    const targets = applyTarget(skill, this.filters, this.maxTargets, this.children, this.order);
    skill.success = targets.length > 0;
    return targets;
  }
}
