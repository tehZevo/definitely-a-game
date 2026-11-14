import type { Container } from 'pixi.js';
import { Component } from '../ecs';
import { DEFAULT_KEY_MAP } from '../core/keyMap';
import { Screen } from './screen';

export class UIManager extends Component {
  focusStack: Screen[] = [];

  constructor(private stage: Container) {
    super();
  }

  pop(): void {
    const screen = this.focusStack.pop();
    if (!screen) return;

    if (screen.container?.parent) {
      screen.container.parent.removeChild(screen.container);
    }

    const world = this.entity.world;
    if (!world) return;
    const entity = world.find(Screen).find((e) => e.getComponent(Screen) === screen);
    if (entity) {
      entity.remove();
      world.update(0);
    }
  }

  push(screen: Screen): void {
    this.focusStack.push(screen);
  }

  openScreen(screen: Screen): void {
    screen.uiManager = this;
    this.push(screen);
    if (screen.container) {
      this.stage.addChild(screen.container);
    }
    const world = this.entity.world;
    if (world) {
      world.createEntity([screen]);
    }
  }

  handleKeys(keys: Set<string>): void {
    if (this.focusStack.length > 0 && keys.has(DEFAULT_KEY_MAP.cancel)) {
      this.pop();
    }
    if (this.focusStack.length === 0) return;
    this.focusStack[this.focusStack.length - 1].handleKeys(keys);
  }
}
