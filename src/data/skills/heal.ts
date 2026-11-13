import { SkillDef } from '../../skills/skillDef';
import { CircleTarget } from '../../skills/effects/circleTarget';
import { Heal } from '../../skills/effects/heal';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const heal = new SkillDef(
  'heal',
  new CircleTarget(TargetType.ALLY, 64, 4, [new Heal(100)]),
  true,
  SkillRank.II,
  null,
  20,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/heal.png',
);
