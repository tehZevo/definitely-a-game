import { Entity } from './entity';
import type { Component, ComponentCtor } from './component';

function isSubclass(ctor: Function, superCtor: Function): boolean {
  if (ctor === superCtor) return true;
  let proto = Object.getPrototypeOf(ctor);
  while (proto !== null) {
    if (proto === superCtor) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

export class World {
  entities: Entity[] = [];
  lookup: Map<Function, Entity[]> = new Map();

  createEntity(components: Component[]): Entity {
    const entity = new Entity();
    for (const component of components) entity.addComponent(component);
    this.addToLookup(entity);
    this.addEntity(entity);
    return entity;
  }

  addToLookup(entity: Entity): void {
    for (const c of entity) {
      const key = c.constructor;
      const list = this.lookup.get(key);
      if (list) list.push(entity);
      else this.lookup.set(key, [entity]);
    }
  }

  removeFromLookup(entity: Entity): void {
    for (const c of entity) {
      const key = c.constructor;
      const list = this.lookup.get(key);
      if (list) this.lookup.set(key, list.filter((e) => e !== entity));
    }
  }

  addEntity(entity: Entity): void {
    entity.world = this;
    this.entities.push(entity);
    entity.start();
  }

  find<T extends Component>(ctor: ComponentCtor<T>): Entity[] {
    const found: Entity[] = [];
    for (const [lookupType, entities] of this.lookup) {
      if (isSubclass(lookupType, ctor)) found.push(...entities);
    }
    return found;
  }

  findComponents<T extends Component>(ctor: ComponentCtor<T>): T[] {
    const comps: T[] = [];
    for (const e of this.find(ctor)) {
      const c = e.getComponent(ctor);
      if (c !== undefined) comps.push(c);
    }
    return comps;
  }

  findComponent<T extends Component>(ctor: ComponentCtor<T>): T | undefined {
    return this.findComponents(ctor)[0];
  }

  update(): void {
    const ents = [...this.entities];
    for (const e of ents) e.update();
    for (const e of ents) {
      if (!e.alive) {
        e.onDestroy();
        this.removeFromLookup(e);
      }
    }
    this.entities = this.entities.filter((e) => e.alive);
  }
}
