import type { World } from '../ecs';
import type { Component, ComponentCtor } from '../ecs';
import { Position } from '../physics/position';

export function findInRange<T extends Component>(
  world: World,
  ctor: ComponentCtor<T>,
  x: number,
  y: number,
  radius: number,
  sort = false,
): import('../ecs').Entity[] {
  const entities = world.find(ctor);
  const results: { entity: import('../ecs').Entity; dist: number }[] = [];
  for (const entity of entities) {
    const pos = entity.getComponent(Position);
    if (!pos) continue;
    const dx = pos.x - x;
    const dy = pos.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= radius) {
      results.push({ entity, dist });
    }
  }
  if (sort) {
    results.sort((a, b) => a.dist - b.dist);
  }
  return results.map((r) => r.entity);
}
