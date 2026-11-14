import type { FaceConfig } from '../graphics/characterCreator';
import type { StatsData } from '../actor/stats';
import type { EquipsData } from '../items/equips';
import { Equips } from '../items/equips';

export interface PlayerProfile {
  face: FaceConfig;
  stats: StatsData;
  equips: EquipsData;
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

export const DEFAULT_EQUIPS: EquipsData = new Equips().save();

export function makePlayerProfile(
  face: FaceConfig,
  stats: StatsData = DEFAULT_STATS,
  equips: EquipsData = DEFAULT_EQUIPS,
): PlayerProfile {
  return { face, stats, equips };
}

export function isPlayerProfile(value: PlayerProfile | FaceConfig): value is PlayerProfile {
  return 'stats' in value && 'equips' in value;
}

export function resolvePlayerProfile(
  input: PlayerProfile | FaceConfig,
  existing: PlayerProfile | null = null,
): PlayerProfile {
  if (isPlayerProfile(input)) return input;
  if (existing && existing.face === input) return existing;
  return makePlayerProfile(input);
}
