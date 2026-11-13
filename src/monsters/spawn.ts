import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { MobAI } from './mobAI';
import { MobDef } from './mobdef';
import { Stats } from '../actor/stats';
import { Actor } from '../actor/actor';

export function spawnMob(
  world: World,
  def: MobDef,
  x: number,
  y: number,
): Entity {
  return world.createEntity([
    new Position(x, y),
    new Sprite({ default: [def.sprite] }),
    new MobAI(),
    new Stats(def.maxHp, def.maxHp, def.maxMp, def.maxMp),
    new Actor(),
  ]);
}
