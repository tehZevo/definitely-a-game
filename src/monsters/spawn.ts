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
import { Loadout } from '../items/loadout';
import { ItemDropper } from '../items/itemDropper';
import { SkillSlots } from '../skills/skillSlots';
import { SkillSlot } from '../skills/skillSlot';
import { defaultAttack } from '../data/skills/defaultAttack';

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
    new MobAI(def),
    new Stats(def.maxHp, def.maxHp, def.maxMp, def.maxMp, 100, 0, 0, def.magAtt, def.magDef),
    new Actor(),
    new Team(team),
    new Shadow(),
  ];

  const equips = new Loadout();
  equips.equipWeapon(def.weapon);
  components.push(equips);

  const dropper = new ItemDropper();
  dropper.setItems(def.drops);
  components.push(dropper);

  const skillSlots = new SkillSlots({ [SkillSlot.ALPHA]: defaultAttack });
  for (const skill of def.skills) {
    skillSlots.set(SkillSlot.ALPHA, skill);
  }
  components.push(skillSlots);

  return world.createEntity(components);
}
