import { Component } from '../ecs';
import { Actor } from './actor';
import { Stats } from './stats';

const MP_RECOVERY_PERCENT = 5;
const MP_RECOVERY_TIME = 3;
const DT = 1 / 60;

export class MPRecovery extends Component {
  alwaysRecover = false;
  timeSinceLastRecovery = 0;

  override update(dt = DT): void {
    const actor = this.entity.getComponent(Actor);
    const stats = this.entity.getComponent(Stats);
    if (!actor || !stats) return;

    this.timeSinceLastRecovery += dt;
    if (actor.inCombat && !this.alwaysRecover) return;

    if (this.timeSinceLastRecovery > MP_RECOVERY_TIME) {
      this.timeSinceLastRecovery = 0;
      actor.healMp(stats.maxMp * MP_RECOVERY_PERCENT / 100);
    }
  }
}
