import { describe, it, expect } from 'vitest';
import { SkillItem } from './skillItem';
import { Loadout } from './loadout';
import { SkillDef } from '../skills/skillDef';
import { SkillRank } from '../skills/skillRank';
import { SkillSlot } from '../skills/skillSlot';
import { Rarity } from './rarity';
import { Damage } from '../skills/effects/damage';
import { SectorTarget } from '../skills/effects/sectorTarget';
import { TargetType } from '../skills/targetType';

const slash = new SkillDef(
  'slash',
  new SectorTarget(TargetType.ENEMY, 180, 32, 1, [new Damage(50, 2)]),
  true,
  SkillRank.I,
  null,
  10,
  0,
  0.5,
  SkillSlot.ALPHA,
  'assets/skills/slash.png',
  null,
  'A basic sword swing.',
);

describe('SkillItem', () => {
  it('inherits its icon, id, and slot from the skill definition', () => {
    const item = new SkillItem({ skilldef: slash, rarity: Rarity.RARE });
    expect(item.id).toBe('slash');
    expect(item.icon).toBe('assets/skills/slash.png');
    expect(item.description).toBe('A basic sword swing.');
    expect(item.slot).toBe(SkillSlot.ALPHA);
    expect(item.rarity).toBe(Rarity.RARE);
  });

  it('allows overriding the id, icon, and slot', () => {
    const item = new SkillItem({
      skilldef: slash,
      id: 'master_slash',
      icon: 'assets/unknown.png',
      slot: SkillSlot.GAMMA,
    });
    expect(item.id).toBe('master_slash');
    expect(item.icon).toBe('assets/unknown.png');
    expect(item.slot).toBe(SkillSlot.GAMMA);
  });
});

describe('Loadout skill slots', () => {
  it('equips a skill item into its own slot', () => {
    const loadout = new Loadout();
    const item = new SkillItem({ skilldef: slash });
    loadout.equipSkill(item);
    expect(loadout.getSkill(SkillSlot.ALPHA)).toBe(item);
  });

  it('replaces and returns the previously equipped skill', () => {
    const loadout = new Loadout();
    const first = new SkillItem({ skilldef: slash });
    const second = new SkillItem({ skilldef: slash, id: 'heavy_slash' });

    loadout.equipSkill(first);
    const replaced = loadout.unequipSkill(SkillSlot.ALPHA);
    loadout.equipSkill(second);

    expect(replaced).toBe(first);
    expect(loadout.getSkill(SkillSlot.ALPHA)).toBe(second);
  });

  it('round-trips skills through save and load', () => {
    const source = new Loadout();
    const item = new SkillItem({ skilldef: slash });
    source.equipSkill(item);

    const target = new Loadout();
    target.load(source.save());

    expect(target.getSkill(SkillSlot.ALPHA)).toBe(item);
  });

  it('counts skill items as equipped for ids and sets', () => {
    const loadout = new Loadout();
    loadout.equipSkill(new SkillItem({ skilldef: slash, id: 'slash', set: 'sword' }));
    expect(loadout.itemIds()).toContain('slash');
    expect(loadout.itemSets()).toEqual({ sword: 1 });
  });
});
