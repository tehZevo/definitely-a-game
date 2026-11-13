import { Component } from '../ecs';
import { TeamManager, Disposition } from '../actor/teamManager';
import type { MapDef } from '../maps/dfsGenerator';

export class GameMaster extends Component {
  constructor(
    public mapdef: MapDef | string,
  ) {
    super();
  }

  override start(): void {
    const teams = this.entity.getComponent(TeamManager);
    if (teams) {
      teams.setDisposition('player', 'enemy', Disposition.ENEMY);
      teams.setDisposition('player', 'player', Disposition.ALLY);
    }
  }
}
