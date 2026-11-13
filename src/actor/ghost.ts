import { Component } from '../ecs';
import { Sprite } from '../graphics/sprite';

export class Ghost extends Component {
  override start(): void {
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.setAnimation('idle');
    }
  }
}
