import { SkillDef } from '../../skills/skillDef';
import { Projectile } from '../../skills/effects/projectile';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const fireball = new SkillDef(
  'fireball',
  new Projectile(
    TargetType.ENEMY,
    'assets/skills/fireball.png',
    [new Damage(100, 1, true)],
    [],
    0.5,
    32,
    8 * 16,
    6,
  ),
  true,
  SkillRank.II,
  null,
  30,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/fireball.png',
  null,
  'Launches a fiery projectile that detonates on impact.',
);
