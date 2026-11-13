import { Component } from '../ecs';

export class Sprite extends Component {
  constructor(public textures: string[]) {
    super();
  }
}
