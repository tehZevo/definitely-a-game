import { Component } from '../ecs';
import { Team } from '../actor/team';
import { PLAYER_TEAM } from '../constants';

export class Player extends Component {
  override start(): void {
    const team = this.entity.getComponent(Team);
    if (team) team.team = PLAYER_TEAM;
  }
}
