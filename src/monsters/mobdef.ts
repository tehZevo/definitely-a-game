import type { ItemDef } from '../items/itemDef';
import type { SkillDef } from '../skills/skillDef';

export class MobDef {
  constructor(
    public id: string,
    public sprite: string,
    public difficulty: number = 5,
    public maxHp: number = 10,
    public maxMp: number = 0,
    public drops: ItemDef[] = [],
    public skills: SkillDef[] = [],
  ) {}
}
