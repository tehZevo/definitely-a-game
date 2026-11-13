import { SkillDef } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { RestoreHealth, RestoreMana } from '../../skills/effects/restore';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const devHeal = new SkillDef(
  'dev_heal',
  new SelfTarget([new RestoreHealth(), new RestoreMana()]),
  true,
  SkillRank.IV,
  null,
  0,
  0,
  0.5,
  SkillSlot.OMEGA,
  'assets/skills/dev_heal.png',
  'assets/icons/dev.png',
);
