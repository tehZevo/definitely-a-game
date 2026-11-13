import { SkillDef } from '../../skills/skillDef';
import { SectorTarget } from '../../skills/effects/sectorTarget';
import { StealHP } from '../../skills/effects/hpmp';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const sanguineStrike = new SkillDef(
  'sanguine_strike',
  new SectorTarget(TargetType.ENEMY, 180, 32, 3, [
    new StealHP(100),
    new Damage(100),
  ]),
  true,
  SkillRank.II,
  null,
  40,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/sanguine_strike.png',
);
