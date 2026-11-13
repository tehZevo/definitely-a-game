import type { Skill } from './skill';
import type { Entity } from '../ecs';
import { Position } from '../physics/position';
import { Actor } from '../actor/actor';
import { Team } from '../actor/team';
import { TargetType } from './targetType';

export type Filter = (skill: Skill) => (actor: Entity) => boolean;

export function distanceFilter(radius: number): Filter {
  return (skill) => (actor) => {
    const a = skill.entity.getComponent(Position);
    const b = actor.getComponent(Position);
    if (!a || !b) return false;
    return Math.hypot(a.x - b.x, a.y - b.y) <= radius;
  };
}

export function teamFilter(targetType: TargetType): Filter {
  return (skill) => (actor) => {
    const userTeam = skill.user.getComponent(Team)?.team;
    const actorTeam = actor.getComponent(Team)?.team;
    if (userTeam === undefined || actorTeam === undefined) return false;
    if (targetType === TargetType.ENEMY) return actorTeam !== userTeam;
    return actorTeam === userTeam;
  };
}

export function ignoreEntitiesFilter(entities: Entity[]): Filter {
  const set = new Set(entities);
  return (_skill) => (actor) => !set.has(actor);
}

export function angleDistanceDeg(a: number, b: number): number {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

export function angleFilter(maxAngle: number): Filter {
  if (maxAngle >= 360) return () => () => true;
  return (skill) => (actor) => {
    const userActor = skill.user.getComponent(Actor);
    const userPos = skill.user.getComponent(Position);
    const actorPos = actor.getComponent(Position);
    if (!userActor || !userPos || !actorPos) return false;
    const look = userActor.lookDir.angle();
    const toTarget = Math.atan2(actorPos.y - userPos.y, actorPos.x - userPos.x) * (180 / Math.PI);
    return angleDistanceDeg(look, toTarget) <= maxAngle / 2;
  };
}
