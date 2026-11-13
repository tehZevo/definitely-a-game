import { SkillDef } from '../../skills/skillDef';
import { CircleTarget } from '../../skills/effects/circleTarget';
import { Damage } from '../../skills/effects/damage';
import { EmitParticles } from '../../skills/effects/emitParticles';
import { TargetType } from '../../skills/targetType';

export const testEnemySkill = new SkillDef(
  'test_enemy_skill',
  new CircleTarget(TargetType.ENEMY, 48, 1, [
    new Damage(75),
    new EmitParticles(),
  ]),
  true,
  undefined,
  null,
  10,
  0,
  1,
);
