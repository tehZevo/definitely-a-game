import type { Entity, World } from '../../ecs';
import { Position } from '../../physics/position';
import { Skill } from '../skill';

export interface SkillEffectOptions {
  children?: SkillEffect | SkillEffect[];
  multiplier?: number;
  success?: boolean;
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
  success = child.success,
): Entity {
  const sourcePos = target?.getComponent(Position) ?? parentSkill.entity.getComponent(Position);
  const pos = sourcePos ? new Position(sourcePos.x, sourcePos.y) : new Position(0, 0);
  return world.createEntity([
    pos,
    new Skill(child, parentSkill.user, parentSkill.entity, target, multiplier, success),
  ]);
}

export function spawnEffectChildren(
  skill: Skill,
  children: SkillEffect[],
  target?: Entity,
): Entity[] {
  if (!skill.success) return [];
  const world = skill.entity?.world;
  if (!world) return [];
  return children.map((child) => createChildSkill(world, skill, child, target));
}

export class SkillEffect {
  children: SkillEffect[];
  multiplier: number;
  success: boolean;

  constructor(options: SkillEffectOptions = {}) {
    this.children = normalizeChildren(options.children);
    this.multiplier = options.multiplier ?? 1;
    this.success = options.success ?? true;
  }

  spawnChildren(skill: Skill, target?: Entity): Entity[] {
    return spawnEffectChildren(skill, this.children, target);
  }

  start(skill: Skill): unknown {
    void skill;
    return null;
  }

  update(skill: Skill, state: unknown, _dt = 0): unknown {
    void skill;
    return state;
  }

  remove(skill: Skill, state: unknown): void {
    void skill;
    void state;
  }
}
