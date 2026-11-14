import { SkillDef } from '../../skills/skillDef';
import { SectorTarget } from '../../skills/effects/sectorTarget';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const quadStrike = new SkillDef(
  'quad_strike',
  new SectorTarget(TargetType.ENEMY, 180, 32, 3, [new Damage(70, 4)]),
  true,
  SkillRank.II,
  null,
  30,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/quad_strike.png',
  null,
  'Strikes four times in a wide arc.',
);
