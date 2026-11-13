import { describe, it, expect } from 'vitest';
import { World, Entity, Component } from './index';

class Position extends Component {
  x = 0;
  y = 0;
}
class Updater extends Component {
  updates = 0;
  override update(): void {
    this.updates += 1;
  }
}
class Destroyed extends Component {
  destroyed = false;
  override onDestroy(): void {
    this.destroyed = true;
  }
}
class RequiresPosition extends Component {
  constructor() {
    super();
    this.require(Position);
  }
}
class NetPosition extends Position {}

describe('World / Entity / Component', () => {
  it('creates an entity and finds it by component', () => {
    const world = new World();
    const pos = new Position();
    const e = world.createEntity([pos]);
    expect(world.find(Position)).toContain(e);
    expect(world.findComponent(Position)).toBe(pos);
    expect(e.getComponent(Position)).toBe(pos);
  });

  it('auto-adds required components on register', () => {
    const world = new World();
    const e = world.createEntity([new RequiresPosition()]);
    expect(e.getComponent(RequiresPosition)).toBeDefined();
    expect(e.getComponent(Position)).toBeDefined();
  });

  it('calls update on components each tick', () => {
    const world = new World();
    const updater = new Updater();
    world.createEntity([updater]);
    world.update();
    world.update();
    expect(updater.updates).toBe(2);
  });

  it('destroys and removes dead entities on update', () => {
    const world = new World();
    const d = new Destroyed();
    const e = world.createEntity([d]);
    e.remove();
    world.update();
    expect(d.destroyed).toBe(true);
    expect(world.entities).not.toContain(e);
  });

  it('getComponent matches subclasses', () => {
    const world = new World();
    const net = new NetPosition();
    const e = world.createEntity([net]);
    expect(e.getComponent(Position)).toBe(net);
    expect(world.find(Position)).toContain(e);
  });

  it('ensureComponent adds only once', () => {
    const e = new Entity();
    const first = e.ensureComponent(Position);
    const second = e.ensureComponent(Position);
    expect(second).toBe(first);
  });

  it('findComponents returns components across entities', () => {
    const world = new World();
    const a = new Position();
    const b = new Position();
    world.createEntity([a]);
    world.createEntity([b]);
    expect(new Set(world.findComponents(Position))).toEqual(new Set([a, b]));
  });
});
