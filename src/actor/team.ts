import { Component } from '../ecs';

export class Team extends Component {
  constructor(public team = 0) {
    super();
  }
}
