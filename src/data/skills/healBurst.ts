import { SkillDef, weaponFilterFor } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { ApplyBuff } from '../../skills/effects/applyBuff';
import { EmitParticles } from '../../skills/effects/emitParticles';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';
import { healOverTimeBuff } from '../../buffs/data/healOverTimeBuff';
import { CAN_CAST_MAGIC_PRIMARIES } from '../../items/slots';

export const healBurst = new SkillDef(
  'heal_burst',
  [
    new SelfTarget([new ApplyBuff(healOverTimeBuff, 1, 10)]),
    new EmitParticles(),
  ],
  true,
  SkillRank.II,
  5,
  50,
  0,
  0.5,
  SkillSlot.GAMMA,
  'assets/skills/heal_burst.png',
  null,
  null,
  weaponFilterFor(CAN_CAST_MAGIC_PRIMARIES),
);
