import { Component } from '../ecs';
import { TeamManager, Disposition } from '../actor/teamManager';
import type { MapDef } from '../maps/dfsGenerator';
import type { Game } from './game';

export class GameMaster extends Component {
  game?: Game;

  constructor(
    public mapdef: MapDef | string,
    game?: Game,
  ) {
    super();
    this.game = game;
  }

  override start(): void {
    const teams = this.entity.getComponent(TeamManager);
    if (teams) {
      teams.setDisposition('player', 'enemy', Disposition.ENEMY);
      teams.setDisposition('player', 'player', Disposition.ALLY);
    }
  }

  transition(mapdef: MapDef | string = this.mapdef): void {
    this.game?.transition(mapdef);
  }
}
