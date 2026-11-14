import { isPlayerProfile, type PlayerProfile } from './playerProfile';

export interface ClientConfig {
  serverUrl: string | null;
  playerProfile: PlayerProfile | null;
}

export interface GetStorage {
  getItem(key: string): string | null;
}

export interface SetStorage {
  setItem(key: string, value: string): void;
}

export const CLIENT_CONFIG_KEY = 'settings';

export const DEFAULT_CLIENT_CONFIG: ClientConfig = {
  serverUrl: null,
  playerProfile: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseClientConfig(raw: string | null): ClientConfig {
  if (!raw) return DEFAULT_CLIENT_CONFIG;
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return DEFAULT_CLIENT_CONFIG;
    return {
      serverUrl: typeof data.serverUrl === 'string' ? data.serverUrl : null,
      playerProfile:
        isPlayerProfile(data.playerProfile as PlayerProfile) ? (data.playerProfile as PlayerProfile) : null,
    };
  } catch {
    return DEFAULT_CLIENT_CONFIG;
  }
}

export function serializeClientConfig(config: ClientConfig): string {
  return JSON.stringify({
    serverUrl: config.serverUrl,
    playerProfile: config.playerProfile,
  });
}

export function loadClientConfig(storage?: GetStorage): ClientConfig {
  const target = storage ?? (typeof localStorage === 'undefined' ? null : localStorage);
  if (!target) return DEFAULT_CLIENT_CONFIG;
  return parseClientConfig(target.getItem(CLIENT_CONFIG_KEY));
}

export function saveClientConfig(config: ClientConfig, storage?: SetStorage): void {
  const target = storage ?? (typeof localStorage === 'undefined' ? null : localStorage);
  if (!target) return;
  target.setItem(CLIENT_CONFIG_KEY, serializeClientConfig(config));
}
