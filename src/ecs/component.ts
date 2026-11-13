import type { Entity } from './entity';

export type ComponentCtor<T extends Component = Component> = new (...args: any[]) => T;

export abstract class Component {
  entity!: Entity;
  requiredComponents: Set<ComponentCtor> = new Set();

  require(...types: ComponentCtor[]): void {
    for (const t of types) this.requiredComponents.add(t);
  }

  getComponent<T extends Component>(ctor: ComponentCtor<T>): T | undefined {
    return this.entity.getComponent(ctor);
  }

  register(entity: Entity): void {
    this.entity = entity;
    for (const rc of this.requiredComponents) {
      if (entity.getComponent(rc) === undefined) {
        entity.addComponent(new rc());
      }
    }
  }

  start(): void {}
  onDestroy(): void {}
  update(_dt = 0): void {}
}
