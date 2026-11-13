import type { Component, ComponentCtor } from './component';
import type { World } from './world';

export class Entity {
  world?: World;
  components: Map<Function, Component> = new Map();
  alive = true;

  start(): void {
    for (const c of [...this.components.values()]) c.start();
  }

  remove(): void {
    this.alive = false;
  }

  onDestroy(): void {
    for (const c of this.components.values()) c.onDestroy();
  }

  addComponent(component: Component): void {
    this.components.set(component.constructor, component);
    component.register(this);
  }

  ensureComponent<T extends Component>(ctor: ComponentCtor<T>): T {
    const existing = this.getComponent(ctor);
    if (existing !== undefined) return existing;
    const created = new ctor();
    this.addComponent(created);
    return created;
  }

  removeComponent(component: Component): void {
    for (const [key, value] of [...this.components]) {
      if (value === component) this.components.delete(key);
    }
  }

  find<T extends Component>(ctor: ComponentCtor<T>): T[] {
    const out: T[] = [];
    for (const c of this.components.values()) {
      if (c instanceof ctor) out.push(c as T);
    }
    return out;
  }

  getComponent<T extends Component>(ctor: ComponentCtor<T>): T | undefined {
    for (const c of this.components.values()) {
      if (c instanceof ctor) return c as T;
    }
    return undefined;
  }

  get<T extends Component>(ctor: ComponentCtor<T>): T | undefined {
    return this.getComponent(ctor);
  }

  update(dt = 0): void {
    for (const c of this.components.values()) c.update(dt);
  }

  *[Symbol.iterator](): IterableIterator<Component> {
    for (const c of this.components.values()) yield c;
  }
}
