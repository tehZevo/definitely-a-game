import { SkillEffect } from './skillEffect';
import { Skill } from '../skill';
import type { Entity } from '../../ecs';
import { Position } from '../../physics/position';
import { Actor } from '../../actor/actor';
import { Sprite } from '../../graphics/sprite';
import { TargetType } from '../targetType';
import { applyTarget } from './target';
import { ignoreEntitiesFilter, distanceFilter, teamFilter } from '../targetFilters';
import { DT } from '../../constants';

export interface ProjectileState {
  entsHit: Entity[];
  life: number;
  dir: { x: number; y: number };
  sprite: Entity | null;
}

export class Projectile extends SkillEffect {
  constructor(
    public targetType: TargetType,
    public sprite: string | null = null,
    public onTick: SkillEffect[] = [],
    public onEnd: SkillEffect[] = [],
    public life = 1,
    public radius = 1,
    public speed = 4,
    public maxTargets = 1,
  ) {
    super();
  }

  override start(skill: Skill): ProjectileState {
    skill.completed = false;
    const userActor = skill.user.getComponent(Actor);
    const dir = userActor?.moveDir ?? { x: 1, y: 0 };
    const skillPos = skill.entity.getComponent(Position);
    const spriteEntity =
      this.sprite !== null && skill.entity.world && skillPos
        ? skill.entity.world.createEntity([
            new Position(skillPos.x, skillPos.y),
            new Sprite({ default: [this.sprite] }),
          ])
        : null;
    return { entsHit: [], life: this.life, dir, sprite: spriteEntity };
  }

  override update(skill: Skill, state: unknown): ProjectileState {
    const s = state as ProjectileState;
    const pos = skill.entity.getComponent(Position);
    if (pos) {
      pos.x += s.dir.x * this.speed * DT;
      pos.y += s.dir.y * this.speed * DT;
    }
    if (s.sprite) {
      const sp = s.sprite.getComponent(Position);
      if (sp && pos) {
        sp.x = pos.x;
        sp.y = pos.y;
      }
    }
    const filters = [
      ignoreEntitiesFilter(s.entsHit),
      distanceFilter(this.radius),
      teamFilter(this.targetType),
    ];
    const numTargets = this.maxTargets - s.entsHit.length;
    const newEntsHit = applyTarget(skill, filters, numTargets, this.onTick);
    s.entsHit = [...s.entsHit, ...newEntsHit];
    s.life -= DT;
    if (s.life <= 0) skill.completed = true;
    return s;
  }

  override remove(skill: Skill, state: unknown): void {
    const s = state as ProjectileState;
    const world = skill.entity.world;
    const pos = skill.entity.getComponent(Position);
    if (world && pos) {
      for (const child of this.onEnd) {
        world.createEntity([
          new Position(pos.x, pos.y),
          new Skill(child, skill.user, skill.entity),
        ]);
      }
    }
    s.sprite?.remove();
  }
}
