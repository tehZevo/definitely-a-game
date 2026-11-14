import { Interactable } from '../core/interactable';
import type { Entity } from '../ecs';
import type { ItemDef } from '../items/itemDef';
import type { Weapon } from './weapon';
import type { Armor } from './armor';
import { Equips } from './equips';
import { ItemDropper } from './itemDropper';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { Stats } from '../actor/stats';

function isWeapon(item: ItemDef): item is Weapon {
  return 'weaponType' in item;
}

function isArmor(item: ItemDef): item is Armor {
  return 'armorSlot' in item;
}

export class DroppedItem extends Interactable {
  item: ItemDef;

  constructor(item: ItemDef) {
    super();
    this.item = item;
  }

  override start(): void {
    this.entity.ensureComponent(Sprite);
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.frames = { default: [this.item.icon] };
      sprite.current = 'default';
    }
  }

  override interact(entity: Entity): void {
    const equips = entity.getComponent(Equips);
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
    }

    if (oldEquip) {
      dropper.drop(oldEquip, pos);
    }
    entity.getComponent(Stats)?.recalculate(equips);
    this.entity.remove();
  }
}
