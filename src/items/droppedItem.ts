import { Interactable } from '../core/interactable';
import type { Entity } from '../ecs';
import type { ItemDef } from '../items/itemDef';
import type { Weapon } from './weapon';
import type { Armor } from './armor';
import { isSkillItem } from './skillItem';
import { Loadout } from './loadout';
import { ItemDropper } from './itemDropper';
import { Physics } from '../physics/physics';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { Stats } from '../actor/stats';
import { ITEM_PUSH_DISTANCE, ITEM_PUSH_FORCE, TILE_SIZE } from '../constants';
import { Vector2 } from '../utils/vector';

function isWeapon(item: ItemDef): item is Weapon {
  return 'weaponType' in item;
}

function isArmor(item: ItemDef): item is Armor {
  return 'armorSlot' in item;
}

export function pushForce(from: Position, to: Position): Vector2 {
  const delta = new Vector2(from.x - to.x, from.y - to.y);
  const dist = delta.length();
  if (dist === 0) return new Vector2(0, 0);
  return delta.normalize().scale(ITEM_PUSH_FORCE);
}

export function withinPushRange(a: Position, b: Position): boolean {
  return new Vector2(a.x - b.x, a.y - b.y).length() <= ITEM_PUSH_DISTANCE * TILE_SIZE;
}

export class DroppedItem extends Interactable {
  item: ItemDef;

  constructor(item: ItemDef) {
    super();
    this.item = item;
    this.description = item.description;
  }

  override start(): void {
    this.entity.ensureComponent(Sprite);
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.frames = { default: [this.item.icon] };
      sprite.current = 'default';
    }
  }

  override update(): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    const phys = this.entity.getComponent(Physics);
    if (!world || !pos || !phys) return;

    for (const other of world.find(DroppedItem)) {
      if (other === this.entity) continue;
      const otherPos = other.getComponent(Position);
      if (!otherPos || !withinPushRange(pos, otherPos)) continue;
      phys.applyForce(pushForce(pos, otherPos));
    }
  }

  override interact(entity: Entity): void {
    const equips = entity.getComponent(Loadout);
    const dropper = entity.getComponent(ItemDropper);
    const pos = entity.getComponent(Position);
    if (!equips || !dropper || !pos) return;

    let oldEquip: ItemDef | undefined;
    if (isWeapon(this.item)) {
      oldEquip = equips.unequipWeapon(this.item.slot);
      equips.equipWeapon(this.item);
    } else if (isArmor(this.item)) {
      oldEquip = equips.unequipArmor(this.item.armorSlot);
      equips.equipArmor(this.item);
    } else if (isSkillItem(this.item)) {
      oldEquip = equips.unequipSkill(this.item.slot);
      equips.equipSkill(this.item);
    }

    if (oldEquip) {
      dropper.drop(oldEquip, pos);
    }
    entity.getComponent(Stats)?.recalculate(equips);
    this.entity.remove();
  }
}
