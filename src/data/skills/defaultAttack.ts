import { SkillDef } from '../../skills/skillDef';
import { SkillRank } from '../../skills/skillRank';
import { SectorTarget } from '../../skills/effects/sectorTarget';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';

export const defaultAttack = new SkillDef(
  'default_attack',
  new SectorTarget(TargetType.ENEMY, 180, 32, 1, [new Damage(100)]),
  true,
  SkillRank.I,
  null,
  0,
  0,
  0.5,
  null,
  null,
  null,
  'A basic attack that strikes enemies in front of you.',
);
