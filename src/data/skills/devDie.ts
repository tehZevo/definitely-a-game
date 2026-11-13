import { SkillDef } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { Damage } from '../../skills/effects/damage';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const devDie = new SkillDef(
  'dev_die',
  new SelfTarget(new Damage(99999999)),
  true,
  SkillRank.IV,
  null,
  0,
  0,
  0.5,
  SkillSlot.OMEGA,
  'assets/skills/dev_die.png',
  'assets/icons/dev.png',
);
