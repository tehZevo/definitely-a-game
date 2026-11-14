import { EquipStats } from './equipStats';
import { PrimaryStats } from './primaryStats';
import { SecondaryStats } from './secondaryStats';

export class Stats {
  equip: EquipStats;
  primary: PrimaryStats;
  secondary: SecondaryStats;

  constructor(
    equip?: EquipStats,
    primary?: PrimaryStats,
    secondary?: SecondaryStats,
  ) {
    this.equip = equip ?? new EquipStats();
    this.primary = primary ?? new PrimaryStats();
    this.secondary = secondary ?? new SecondaryStats();
  }

  add(other: Stats): Stats {
    return new Stats(
      this.equip.add(other.equip),
      this.primary.add(other.primary),
      this.secondary.add(other.secondary),
    );
  }

  multiply(other: Stats): Stats {
    return new Stats(
      this.equip.multiply(other.equip),
      this.primary.multiply(other.primary),
      this.secondary.multiply(other.secondary),
    );
  }

  asInts(): Stats {
    return new Stats(
      this.equip.asInts(),
      this.primary.asInts(),
      this.secondary.asInts(),
    );
  }

  clone(): Stats {
    return new Stats(
      this.equip.clone(),
      this.primary.clone(),
      this.secondary.clone(),
    );
  }

  static Equip(patt = 0, matt = 0, pdef = 0, mdef = 0): Stats {
    return new Stats(new EquipStats(patt, matt, pdef, mdef));
  }

  static Primary(str = 0, vit = 0, dex = 0, agi = 0, int = 0, wis = 0): Stats {
    return new Stats(undefined, new PrimaryStats(str, vit, dex, agi, int, wis));
  }

  static Secondary(
    hp = 0, mp = 0, physAtt = 0, magAtt = 0,
    physDef = 0, magDef = 0, accuracy = 0, evasion = 0,
    moveSpeed = 0, critical = 0,
  ): Stats {
    return new Stats(undefined, undefined, new SecondaryStats(
      hp, mp, physAtt, magAtt, physDef, magDef, accuracy, evasion, moveSpeed, critical,
    ));
  }

  static get One(): Stats {
    return new Stats(EquipStats.One(), PrimaryStats.One(), SecondaryStats.One());
  }
}
