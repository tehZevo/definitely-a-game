import { SkillDef } from '../../skills/skillDef';
import { SelfTarget } from '../../skills/effects/selfTarget';
import { SectorTarget } from '../../skills/effects/sectorTarget';
import { ConsumeHP, UserHPScaling } from '../../skills/effects/hpmp';
import { Damage } from '../../skills/effects/damage';
import { TargetType } from '../../skills/targetType';
import { SkillRank } from '../../skills/skillRank';
import { SkillSlot } from '../../skills/skillSlot';

export const sacrifice = new SkillDef(
  'sacrifice',
  [
    new SelfTarget([new ConsumeHP(10)]),
    new SectorTarget(TargetType.ENEMY, 90, 48, 6, [
      new UserHPScaling((hp) => [new Damage(hp * 100)]),
    ]),
  ],
  true,
  SkillRank.III,
  null,
  100,
  0,
  0.5,
  SkillSlot.BETA,
  'assets/skills/sacrifice.png',
);
