import { Component } from '../ecs';
import { Actor } from './actor';
import { Stats } from './stats';
import { MP_RECOVERY_PERCENT, MP_RECOVERY_TIME, DT } from '../constants';

export class MPRecovery extends Component {
  alwaysRecover = false;
  timeSinceLastRecovery = 0;

  override update(dt = DT): void {
    const actor = this.entity.getComponent(Actor);
    const stats = this.entity.getComponent(Stats);
    if (!actor || !stats) return;
    void this.alwaysRecover;

    this.timeSinceLastRecovery += dt;

    if (this.timeSinceLastRecovery > MP_RECOVERY_TIME) {
      this.timeSinceLastRecovery = 0;
      actor.healMp(stats.maxMp * MP_RECOVERY_PERCENT / 100);
    }
  }
}
