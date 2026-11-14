import { Component } from '../ecs';
import { PrimaryStats } from '../stats/primaryStats';
import { EquipStats } from '../stats/equipStats';
import { Stats as FullStats } from '../stats/stats';
import { calculateStats } from '../stats/calculator';
import { sumScaledArchetypeStats } from '../items/equipStatsCalculator';
import type { Loadout } from '../items/loadout';
import { WeaponType } from '../items/slots';

export interface StatsData {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  physAtt: number;
  physDef: number;
  critical: number;
  magAtt: number;
  magDef: number;
}

export class Stats extends Component {
  primary: PrimaryStats;
  equip: EquipStats;
  basePrimary: PrimaryStats;
  baseEquip: EquipStats;
  flatModifiers: Record<string, FullStats> = {};
  scalingModifiers: Record<string, FullStats> = {};
  private _calculated: FullStats;

  constructor(
    public hp: number,
    public maxHp: number,
    public mp = 0,
    public maxMp = 0,
    public physAtt = 100,
    public physDef = 0,
    public critical = 0,
    public magAtt = 100,
    public magDef = 0,
    primary?: PrimaryStats,
    equip?: EquipStats,
  ) {
    super();
    this.basePrimary = primary ?? PrimaryStats.Base();
    this.baseEquip = equip ?? EquipStats.One();
    this.primary = this.basePrimary.clone();
    this.equip = this.baseEquip.clone();
    this._calculated = new FullStats(this.equip, this.primary);
  }

  get calculated(): FullStats {
    return this._calculated;
  }

  addFlatModifier(id: string, modifier: FullStats): void {
    this.flatModifiers[id] = modifier;
    this.recalculate();
  }

  addScalingModifier(id: string, modifier: FullStats): void {
    this.scalingModifiers[id] = modifier;
    this.recalculate();
  }

  removeFlatModifier(id: string): void {
    delete this.flatModifiers[id];
    this.recalculate();
  }

  removeScalingModifier(id: string): void {
    delete this.scalingModifiers[id];
    this.recalculate();
  }

  addHp(amount: number): void {
    this.hp = Math.max(0, Math.min(this.maxHp, this.hp + amount));
  }

  addMp(amount: number): void {
    this.mp = Math.max(0, Math.min(this.maxMp, this.mp + amount));
  }

  snapshot(): StatsData {
    return {
      hp: this.hp,
      maxHp: this.maxHp,
      mp: this.mp,
      maxMp: this.maxMp,
      physAtt: this.physAtt,
      physDef: this.physDef,
      critical: this.critical,
      magAtt: this.magAtt,
      magDef: this.magDef,
    };
  }

  baseSnapshot(): StatsData {
    return {
      hp: this.hp,
      maxHp: this.maxHp,
      mp: this.mp,
      maxMp: this.maxMp,
      physAtt: this.physAtt,
      physDef: this.physDef,
      critical: this.critical,
      magAtt: this.magAtt,
      magDef: this.magDef,
    };
  }

  basePrimaryStats(): PrimaryStats {
    return this.basePrimary.clone();
  }

  baseEquipStats(): EquipStats {
    return this.baseEquip.clone();
  }

  load(data: StatsData): void {
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    this.mp = data.mp;
    this.maxMp = data.maxMp;
    this.physAtt = data.physAtt;
    this.physDef = data.physDef;
    this.critical = data.critical;
    this.magAtt = data.magAtt;
    this.magDef = data.magDef;
  }

  setBase(primary: PrimaryStats, equip: EquipStats): void {
    this.basePrimary = primary.clone();
    this.baseEquip = equip.clone();
    this.primary = primary.clone();
    this.equip = equip.clone();
    this.recalculate();
  }

  recalculate(equips?: Loadout): void {
    const flat = this.sumFlatModifiers();
    const scaling = this.sumScalingModifiers();
    const weaponType = equips?.primaryWeapon?.weaponType ?? WeaponType.SHORTSWORD;
    const archetypeStats = equips ? sumScaledArchetypeStats(equips) : new FullStats();

    this.primary = this.basePrimary.add(archetypeStats.primary);
    this.equip = this.baseEquip.add(archetypeStats.equip);

    const result = calculateStats(
      this.basePrimary,
      this.baseEquip,
      archetypeStats.primary,
      archetypeStats.equip,
      flat,
      scaling,
      weaponType,
    );

    this._calculated = result;
    this.maxHp = result.secondary.hp;
    this.maxMp = result.secondary.mp;
    this.physAtt = result.secondary.physAtt;
    this.magAtt = result.secondary.magAtt;
    this.physDef = result.secondary.physDef;
    this.magDef = result.secondary.magDef;
    this.critical = result.secondary.critical;
    this.hp = Math.min(this.hp, this.maxHp);
    this.mp = Math.min(this.mp, this.maxMp);
  }

  private sumFlatModifiers(): FullStats {
    let total = new FullStats();
    for (const mod of Object.values(this.flatModifiers)) {
      total = total.add(mod);
    }
    return total;
  }

  private sumScalingModifiers(): FullStats {
    let total = FullStats.One;
    for (const mod of Object.values(this.scalingModifiers)) {
      total = total.multiply(mod);
    }
    return total;
  }
}
