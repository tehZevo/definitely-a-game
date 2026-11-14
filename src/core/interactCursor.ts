import { Component } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';

export const INTERACT_CURSOR_SPRITE = 'assets/ui/cursor_16.png';
export const INTERACT_CURSOR_Z_INDEX = 100000;

export class InteractCursor extends Component {
  constructor() {
    super();
    this.require(Position, Sprite);
  }

  override start(): void {
    this.entity.getComponent(Sprite)?.setSprite(INTERACT_CURSOR_SPRITE);
  }
}
