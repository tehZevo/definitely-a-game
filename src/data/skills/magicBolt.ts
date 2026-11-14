import { SkillDef, weaponFilterFor } from '../../skills/skillDef';
import { Projectile } from '../../skills/effects/projectile';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';
import { CAN_CAST_MAGIC_PRIMARIES } from '../../items/slots';

export const magicBolt = new SkillDef(
  'magic_bolt',
  new Projectile(
    TargetType.ENEMY,
    'assets/skills/magic_bolt.png',
    [new Damage(80, 1, true)],
    [],
    0.5,
    32,
    8 * 16,
    3,
  ),
  true,
  SkillRank.I,
  null,
  20,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/magic_bolt.png',
  null,
  'Fires a bolt of arcane energy at an enemy.',
  weaponFilterFor(CAN_CAST_MAGIC_PRIMARIES),
);
