import { describe, expect, it } from 'vitest';
import { Equips } from '../items/equips';
import { woodenLongsword } from '../data/items/weapons';
import { defaultAttack } from '../data/skills/defaultAttack';
import { SkillDef } from './skillDef';
import { SectorTarget } from './effects/sectorTarget';
import { TargetType } from './targetType';
import { getSkillUseTime } from './skillUseTime';

describe('getSkillUseTime', () => {
  it('uses the base use time when no primary weapon is equipped', () => {
    expect(getSkillUseTime(defaultAttack, new Equips())).toBe(defaultAttack.useTime);
  });

  it('applies the equipped primary weapon speed modifier to attacks', () => {
    const equips = new Equips();
    equips.equipWeapon(woodenLongsword);

    expect(getSkillUseTime(defaultAttack, equips)).toBeCloseTo(defaultAttack.useTime * 1.1);
  });

  it('does not apply weapon speed to non-attack skills', () => {
    const skill = new SkillDef('test_non_attack', new SectorTarget(TargetType.ENEMY, 90, 16, 1), false);
    const equips = new Equips();
    equips.equipWeapon(woodenLongsword);

    expect(getSkillUseTime(skill, equips)).toBe(skill.useTime);
  });
});
