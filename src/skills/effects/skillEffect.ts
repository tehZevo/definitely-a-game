import type { Entity, World } from '../../ecs';
import { Position } from '../../physics/position';
import { Skill } from '../skill';

export interface SkillEffectOptions {
  children?: SkillEffect | SkillEffect[];
  multiplier?: number;
}

function normalizeChildren(children?: SkillEffect | SkillEffect[]): SkillEffect[] {
  if (children === undefined) return [];
  return Array.isArray(children) ? children : [children];
}

export function createChildSkill(
  world: World,
  parentSkill: Skill,
  child: SkillEffect,
  target?: Entity,
  multiplier = parentSkill.multiplier * child.multiplier,
): Entity {
  const sourcePos = target?.getComponent(Position) ?? parentSkill.entity.getComponent(Position);
  const pos = sourcePos ? new Position(sourcePos.x, sourcePos.y) : new Position(0, 0);
  return world.createEntity([pos, new Skill(child, parentSkill.user, parentSkill.entity, target, multiplier)]);
}

export class SkillEffect {
  children: SkillEffect[];
  multiplier: number;

  constructor(options: SkillEffectOptions = {}) {
    this.children = normalizeChildren(options.children);
    this.multiplier = options.multiplier ?? 1;
  }

  spawnChildren(skill: Skill, target?: Entity): Entity[] {
    if (!skill.entity) return [];
    const world = skill.entity.world;
    if (!world) return [];
    return this.children.map((child) => createChildSkill(world, skill, child, target));
  }

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
