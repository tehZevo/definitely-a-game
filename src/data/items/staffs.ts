import { Weapon } from '../../items/weapon';
import { WeaponType } from '../../items/slots';
import { EquipGrade } from '../../items/equipGrade';
import { Rarity } from '../../items/rarity';
import { heal } from '../skills/heal';

export const woodenStaff = new Weapon({
  id: 'wooden_staff',
  weaponType: WeaponType.STAFF,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/weapons/staffs/wooden_staff.png',
  description: 'A plain staff, good enough for leaning on.',
});

export const staffOfHealing = new Weapon({
  id: 'staff_of_healing',
  weaponType: WeaponType.STAFF,
  grade: EquipGrade.D,
  rarity: Rarity.EPIC,
  icon: 'assets/items/weapons/staffs/staff_of_healing.png',
  description: 'A staff that channels healing magic.',
  attackSkill: heal,
});
