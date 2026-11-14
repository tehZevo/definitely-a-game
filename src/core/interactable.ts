import { Component } from '../ecs';

export class Interactable extends Component {
  solid = false;

  interact(_entity: import('../ecs').Entity): void {
    void _entity;
  }
}
