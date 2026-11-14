import type { FaceConfig } from '../graphics/characterCreator';
import type { StatsData } from '../actor/stats';
import type { LoadoutData } from '../items/loadout';
import { Loadout } from '../items/loadout';

export interface PlayerProfile {
  name: string;
  face: FaceConfig;
  baseStats: StatsData;
  stats: StatsData;
  equips: LoadoutData;
}

export const DEFAULT_STATS: StatsData = {
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  physAtt: 100,
  physDef: 0,
  critical: 0,
  magAtt: 100,
  magDef: 0,
};

export const DEFAULT_LOADOUT: LoadoutData = new Loadout().save();

export function makePlayerProfile(
  face: FaceConfig,
  name = 'Player',
  stats: StatsData = DEFAULT_STATS,
  equips: LoadoutData = DEFAULT_LOADOUT,
  baseStats: StatsData = DEFAULT_STATS,
): PlayerProfile {
  return { name, face, baseStats, stats, equips };
}

export function isPlayerProfile(value: PlayerProfile | FaceConfig): value is PlayerProfile {
  return 'baseStats' in value && 'stats' in value && 'equips' in value;
}

export function resolvePlayerProfile(
  input: PlayerProfile | FaceConfig,
  existing: PlayerProfile | null = null,
): PlayerProfile {
  if (isPlayerProfile(input)) return input;
  if (existing && existing.face === input) return existing;
  return makePlayerProfile(input);
}
