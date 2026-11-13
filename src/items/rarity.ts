export enum Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
}

export function rarityColor(rarity: Rarity): number {
  switch (rarity) {
    case Rarity.COMMON:
      return 0xe6e6e6;
    case Rarity.RARE:
      return 0x64a0e6;
    case Rarity.EPIC:
      return 0xa000ff;
    case Rarity.LEGENDARY:
      return 0xe69632;
  }
}

export function rarityDropRate(rarity: Rarity): number {
  switch (rarity) {
    case Rarity.COMMON:
      return 1;
    case Rarity.RARE:
      return 1 / 2;
    case Rarity.EPIC:
      return 1 / 4;
    case Rarity.LEGENDARY:
      return 1 / 8;
  }
}
