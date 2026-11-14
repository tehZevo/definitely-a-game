import { SkillDef, weaponFilterFor } from '../../skills/skillDef';
import { SectorTarget } from '../../skills/effects/sectorTarget';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';
import { SWINGABLE_PRIMARIES } from '../../items/slots';

export const heavySlash = new SkillDef(
  'heavy_slash',
  new SectorTarget(TargetType.ENEMY, 180, 32, 3, [new Damage(50)]),
  true,
  SkillRank.I,
  null,
  15,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/heavy_slash.png',
  null,
  null,
  weaponFilterFor(SWINGABLE_PRIMARIES),
);
