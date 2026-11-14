import { Rarity, rarityDropRate } from './rarity';

export const BASE_DROP_RATE = 0.5;

export interface ItemDefOptions {
  id?: string;
  rarity?: Rarity;
  icon?: string;
  miniIcon?: string;
  description?: string | null;
  buffs?: string[];
  set?: string | null;
}

export class ItemDef {
  id: string;
  icon: string;
  miniIcon: string | null;
  rarity: Rarity;
  description: string | null;
  buffs: string[];
  set: string | null;

  constructor(opts: ItemDefOptions = {}) {
    this.id = opts.id ?? '';
    this.icon = opts.icon ?? 'assets/unknown.png';
    this.miniIcon = opts.miniIcon ?? null;
    this.rarity = opts.rarity ?? Rarity.COMMON;
    this.description = opts.description ?? null;
    this.buffs = opts.buffs ?? [];
    this.set = opts.set ?? null;
  }

  calcDropRate(): number {
    return BASE_DROP_RATE * rarityDropRate(this.rarity);
  }
}
