import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { MobAI } from './mobAI';
import { MobDef } from './mobdef';
import { Stats } from '../actor/stats';
import { Actor } from '../actor/actor';
import { Team } from '../actor/team';
import { Shadow } from '../actor/shadow';
import { Physics } from '../physics/physics';
import { Equips } from '../items/equips';
import { SkillSlots } from '../skills/skillSlots';
import { SkillSlot } from '../skills/skillSlot';
import { defaultAttack } from '../data/skills/defaultAttack';
import { Weapon } from '../items/weapon';
import { Armor } from '../items/armor';

export function spawnMob(
  world: World,
  def: MobDef,
  x: number,
  y: number,
  team = 1,
): Entity {
  const components: import('../ecs').Component[] = [
    new Position(x, y),
    new Physics(),
    new Sprite({ default: [def.sprite] }),
    new MobAI(),
    new Stats(def.maxHp, def.maxHp, def.maxMp, def.maxMp),
    new Actor(),
    new Team(team),
    new Shadow(),
  ];

  const equips = new Equips();
  for (const drop of def.drops) {
    if (drop instanceof Weapon) {
      equips.equipWeapon(drop);
    } else if (drop instanceof Armor) {
      equips.equipArmor(drop);
    }
  }
  components.push(equips);

  const skillSlots = new SkillSlots({ [SkillSlot.ALPHA]: defaultAttack });
  for (const skill of def.skills) {
    skillSlots.set(SkillSlot.ALPHA, skill);
  }
  components.push(skillSlots);

  return world.createEntity(components);
}
