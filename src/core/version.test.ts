import { describe, it, expect } from 'vitest';
import { APP_NAME, VERSION } from './version';

describe('version', () => {
  it('exposes the app name', () => {
    expect(APP_NAME).toBe('definitely-a-game');
  });

  it('uses a semver-style version', () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
