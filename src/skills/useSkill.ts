import type { World, Entity } from '../ecs';
import { Position } from '../physics/position';
import { Skill } from './skill';
import type { SkillDef } from './skillDef';

export function useSkill(world: World, skillDef: SkillDef, user: Entity): Entity {
  const pos = user.getComponent(Position);
  const skillPos = pos ? new Position(pos.x, pos.y) : new Position(0, 0);
  return world.createEntity([skillPos, new Skill(skillDef.effects[0], user)]);
}
