export enum PrimaryStat {
  STR,
  VIT,
  DEX,
  AGI,
  INT,
  WIS,
}

export class PrimaryStats {
  STR: number;
  VIT: number;
  DEX: number;
  AGI: number;
  INT: number;
  WIS: number;

  constructor(str = 0, vit = 0, dex = 0, agi = 0, int = 0, wis = 0) {
    this.STR = str;
    this.VIT = vit;
    this.DEX = dex;
    this.AGI = agi;
    this.INT = int;
    this.WIS = wis;
  }

  add(other: PrimaryStats): PrimaryStats {
    return new PrimaryStats(
      this.STR + other.STR,
      this.VIT + other.VIT,
      this.DEX + other.DEX,
      this.AGI + other.AGI,
      this.INT + other.INT,
      this.WIS + other.WIS,
    );
  }

  multiply(other: PrimaryStats | number): PrimaryStats {
    if (other instanceof PrimaryStats) {
      return new PrimaryStats(
        this.STR * other.STR,
        this.VIT * other.VIT,
        this.DEX * other.DEX,
        this.AGI * other.AGI,
        this.INT * other.INT,
        this.WIS * other.WIS,
      );
    }
    return new PrimaryStats(
      this.STR * other,
      this.VIT * other,
      this.DEX * other,
      this.AGI * other,
      this.INT * other,
      this.WIS * other,
    );
  }

  get(stat: PrimaryStat): number {
    switch (stat) {
      case PrimaryStat.STR: return this.STR;
      case PrimaryStat.VIT: return this.VIT;
      case PrimaryStat.DEX: return this.DEX;
      case PrimaryStat.AGI: return this.AGI;
      case PrimaryStat.INT: return this.INT;
      case PrimaryStat.WIS: return this.WIS;
    }
  }

  asInts(): PrimaryStats {
    return new PrimaryStats(
      Math.floor(this.STR),
      Math.floor(this.VIT),
      Math.floor(this.DEX),
      Math.floor(this.AGI),
      Math.floor(this.INT),
      Math.floor(this.WIS),
    );
  }

  clone(): PrimaryStats {
    return new PrimaryStats(this.STR, this.VIT, this.DEX, this.AGI, this.INT, this.WIS);
  }

  static One(): PrimaryStats {
    return new PrimaryStats(1, 1, 1, 1, 1, 1);
  }

  static Base(): PrimaryStats {
    return new PrimaryStats(10, 10, 10, 10, 10, 10);
  }
}
