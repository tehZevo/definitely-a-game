import { SkillDef } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { CircleTarget } from '../../skills/effects/circleTarget';
import { Rush } from '../../skills/effects/rush';
import { Damage } from '../../skills/effects/damage';
import { Push } from '../../skills/effects/push';
import { EmitParticles } from '../../skills/effects/emitParticles';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const devRush = new SkillDef(
  'dev_rush',
  [
    new SelfTarget(new Rush(5000)),
    new CircleTarget(TargetType.ENEMY, 80, 6, [
      new Damage(100),
      new Push(5000),
      new EmitParticles(),
    ]),
  ],
  true,
  SkillRank.IV,
  null,
  10,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/dev_rush.png',
  'assets/icons/dev.png',
);
