import { Component } from '../ecs';
import type { Screen } from './screen';

export class UIManager extends Component {
  focusStack: Screen[] = [];

  pop(): void {
    this.focusStack.pop();
  }

  push(screen: Screen): void {
    this.focusStack.push(screen);
  }

  openScreen(screen: Screen): void {
    this.push(screen);
    const world = this.entity.world;
    if (world) {
      world.createEntity([screen]);
    }
  }

  handleKeys(keys: Set<string>): void {
    if (this.focusStack.length > 0 && keys.has('Escape')) {
      this.pop();
    }
    if (this.focusStack.length === 0) return;
    this.focusStack[this.focusStack.length - 1].handleKeys(keys);
  }
}
