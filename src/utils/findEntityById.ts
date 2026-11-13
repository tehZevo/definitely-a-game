import type { World, Entity } from '../ecs';
import type { Component, ComponentCtor } from '../ecs';

export function findEntityById(world: World, id: string, idCtor: ComponentCtor<Component & { id: string }>): Entity | undefined {
  const entities = world.find(idCtor);
  for (const entity of entities) {
    const comp = entity.getComponent(idCtor);
    if (comp && comp.id === id) return entity;
  }
  return undefined;
}
