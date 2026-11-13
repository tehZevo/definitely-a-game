import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { MobDef } from './mobdef';

export function spawnMob(
  world: World,
  def: MobDef,
  x: number,
  y: number,
): Entity {
  return world.createEntity([
    new Position(x, y),
    new Sprite({ default: [def.sprite] }),
  ]);
}
