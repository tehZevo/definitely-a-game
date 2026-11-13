import { Component } from '../ecs';

export class Interactable extends Component {
  interact(_entity: import('../ecs').Entity): void {
    void _entity;
  }
}
