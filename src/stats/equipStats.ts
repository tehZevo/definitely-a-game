export enum EquipStat {
  PATT,
  MATT,
  PDEF,
  MDEF,
}

export class EquipStats {
  PATT: number;
  MATT: number;
  PDEF: number;
  MDEF: number;

  constructor(patt = 0, matt = 0, pdef = 0, mdef = 0) {
    this.PATT = patt;
    this.MATT = matt;
    this.PDEF = pdef;
    this.MDEF = mdef;
  }

  add(other: EquipStats): EquipStats {
    return new EquipStats(
      this.PATT + other.PATT,
      this.MATT + other.MATT,
      this.PDEF + other.PDEF,
      this.MDEF + other.MDEF,
    );
  }

  multiply(other: EquipStats | number): EquipStats {
    if (other instanceof EquipStats) {
      return new EquipStats(
        this.PATT * other.PATT,
        this.MATT * other.MATT,
        this.PDEF * other.PDEF,
        this.MDEF * other.MDEF,
      );
    }
    return new EquipStats(
      this.PATT * other,
      this.MATT * other,
      this.PDEF * other,
      this.MDEF * other,
    );
  }

  get(stat: EquipStat): number {
    switch (stat) {
      case EquipStat.PATT: return this.PATT;
      case EquipStat.MATT: return this.MATT;
      case EquipStat.PDEF: return this.PDEF;
      case EquipStat.MDEF: return this.MDEF;
    }
  }

  asInts(): EquipStats {
    return new EquipStats(
      Math.floor(this.PATT),
      Math.floor(this.MATT),
      Math.floor(this.PDEF),
      Math.floor(this.MDEF),
    );
  }

  clone(): EquipStats {
    return new EquipStats(this.PATT, this.MATT, this.PDEF, this.MDEF);
  }

  static One(): EquipStats {
    return new EquipStats(1, 1, 1, 1);
  }
}
