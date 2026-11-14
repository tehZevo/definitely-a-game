import { SkillDef, weaponFilterFor } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { ApplyBuff } from '../../skills/effects/applyBuff';
import { EmitParticles } from '../../skills/effects/emitParticles';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';
import { bless as blessBuff } from '../../buffs/data/bless';
import { CAN_CAST_MAGIC_PRIMARIES } from '../../items/slots';

export const bless = new SkillDef(
  'bless',
  [
    new SelfTarget([new ApplyBuff(blessBuff, 1, 10)]),
    new EmitParticles(),
  ],
  true,
  SkillRank.II,
  null,
  50,
  0,
  0.5,
  SkillSlot.GAMMA,
  'assets/skills/bless.png',
  null,
  null,
  weaponFilterFor(CAN_CAST_MAGIC_PRIMARIES),
);
