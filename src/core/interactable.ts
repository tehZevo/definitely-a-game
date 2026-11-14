import { Component } from '../ecs';

export class Interactable extends Component {
  solid = false;
  description: string | null = null;

  interact(_entity: import('../ecs').Entity): void {
    void _entity;
  }
}
