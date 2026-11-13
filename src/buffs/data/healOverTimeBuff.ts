import { BuffDef } from '../buffDef';
import { HealOverTime } from '../effects/healOverTime';

export const healOverTimeBuff = new BuffDef(
  'heal_over_time_buff',
  [new HealOverTime(10)],
  'assets/buffs/heal_over_time.png',
);
