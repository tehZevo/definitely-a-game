import { BuffEffect } from '../buffEffect';
import type { Buff } from '../buff';
import { DOT_TICK_RATE } from '../../constants';
import { Actor } from '../../actor/actor';

export class HealOverTime extends BuffEffect {
  constructor(public amountPerPower = 1) {
    super();
  }

  override apply(_buff: Buff): unknown {
    return 0;
  }

  override update(buff: Buff, state: unknown): unknown {
    let tick = (state as number) + DOT_TICK_RATE;
    while (tick >= DOT_TICK_RATE) {
      const actor = buff.target.getComponent(Actor);
      if (actor) {
        actor.heal(this.amountPerPower * buff.power);
      }
      tick -= DOT_TICK_RATE;
    }
    return tick;
  }
}
