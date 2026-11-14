import { Equip, type EquipOptions } from './equip';
import { ArmorSlot } from './slots';

export class Armor extends Equip {
  armorSlot: ArmorSlot;
  hideHair: boolean;

  constructor(opts: EquipOptions & { armorSlot: ArmorSlot; hideHair?: boolean }) {
    super(opts);
    this.armorSlot = opts.armorSlot;
    this.hideHair = opts.hideHair ?? false;
  }
}
