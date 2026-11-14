import { Team } from '../actor/team';
import { PLAYER_TEAM, PLAYER_INVULN_TIME } from '../constants';
import { DamageListener } from './damageListener';
import { Invulnerable } from './invulnerable';
import type { Entity } from '../ecs';

export class Player extends DamageListener {
  override start(): void {
    const team = this.entity.getComponent(Team);
    if (team) team.team = PLAYER_TEAM;
  }

  override onDamage(_attacker: Entity, _amount: number): void {
    if (!this.entity.getComponent(Invulnerable)) {
      this.entity.addComponent(new Invulnerable(PLAYER_INVULN_TIME));
    }
  }
}
