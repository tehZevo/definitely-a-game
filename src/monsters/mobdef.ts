import type { ItemDef } from '../items/itemDef';
import type { SkillDef } from '../skills/skillDef';
import type { Weapon } from '../items/weapon';
import type { ArchetypeFn } from './archetypes';
import { createMonsterWeapon } from '../items/monsterItems';

export class MobDef {
  weapon: Weapon;

  constructor(
    public id: string,
    public sprite: string,
    public difficulty: number = 5,
    public maxHp: number = 10,
    public maxMp: number = 0,
    public drops: ItemDef[] = [],
    public skills: SkillDef[] = [],
    public magAtt: number = 100,
    public magDef: number = 0,
    public archetypes: ArchetypeFn[] = [],
  ) {
    this.weapon = createMonsterWeapon(difficulty, archetypes);
  }
}
