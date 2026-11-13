import { SkillDef } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { ApplyBuff } from '../../skills/effects/applyBuff';
import { EmitParticles } from '../../skills/effects/emitParticles';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';
import { bless as blessBuff } from '../../buffs/data/bless';

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
);
