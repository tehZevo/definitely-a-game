import { BuffDef } from '../buffDef';
import { ModifyStats } from '../effects/modifyStats';
import { ChildBuff } from '../effects/childBuff';
import { healOverTimeBuff } from './healOverTimeBuff';
import { Stats } from '../../stats/stats';

export const bless = new BuffDef(
  'bless',
  [
    new ModifyStats(Stats.Primary(0, 20, 0, 0, 0, 20)),
    new ChildBuff(healOverTimeBuff),
  ],
  'assets/buffs/bless.png',
);
