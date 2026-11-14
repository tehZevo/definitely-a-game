import { describe, expect, it } from 'vitest';
import {
  DEFAULT_CLIENT_CONFIG,
  loadClientConfig,
  parseClientConfig,
  saveClientConfig,
  serializeClientConfig,
} from './clientConfig';
import { makePlayerProfile } from './playerProfile';
import type { FaceConfig } from '../graphics/characterCreator';

const face: FaceConfig = {
  gender: 'female',
  skinTone: 'tan',
  hairStyle: 1,
  hairColor: 'red',
  eyeColor: 'green',
};

describe('client config', () => {
  it('parses a saved player profile', () => {
    const config = parseClientConfig(
      JSON.stringify({
        serverUrl: 'wss://example.test',
        playerProfile: makePlayerProfile(face, 'Zevo'),
      }),
    );

    expect(config.serverUrl).toBe('wss://example.test');
    expect(config.playerProfile?.name).toBe('Zevo');
  });

  it('falls back to defaults for invalid JSON', () => {
    expect(parseClientConfig('{')).toBe(DEFAULT_CLIENT_CONFIG);
  });

  it('loads and saves through a storage object', () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    };
    const config = {
      serverUrl: null,
      playerProfile: makePlayerProfile(face, 'Player'),
    };

    saveClientConfig(config, storage);
    expect(store.get('settings')).toBe(serializeClientConfig(config));
    expect(loadClientConfig(storage).playerProfile?.face).toStrictEqual(face);
  });
});
