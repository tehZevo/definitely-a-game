import { BuffDef } from '../buffDef';
import { ChildBuff } from '../effects/childBuff';
import { healOverTimeBuff } from './healOverTimeBuff';

export const bless = new BuffDef(
  'bless',
  [new ChildBuff(healOverTimeBuff)],
  'assets/buffs/bless.png',
);
