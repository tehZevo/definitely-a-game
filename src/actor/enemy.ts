import { Component } from '../ecs';
import type { MobDef } from '../monsters/mobdef';
import { Team } from '../actor/team';
import { ENEMY_TEAM } from '../constants';

export class Enemy extends Component {
  target: import('../ecs').Entity | null = null;
  attackDist = 2;

  constructor(public mobdef: MobDef | null = null) {
    super();
  }

  override start(): void {
    const team = this.entity.getComponent(Team);
    if (team) team.team = ENEMY_TEAM;
  }
}
