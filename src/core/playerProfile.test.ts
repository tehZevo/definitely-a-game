import { describe, expect, it } from 'vitest';
import { DEFAULT_STATS, makePlayerProfile, resolvePlayerProfile } from './playerProfile';
import type { FaceConfig } from '../graphics/characterCreator';

const face: FaceConfig = {
  gender: 'male',
  skinTone: 'light',
  hairStyle: 0,
  hairColor: 'brown',
  eyeColor: 'blue',
};

describe('player profile', () => {
  it('creates a default profile from a face', () => {
    const profile = makePlayerProfile(face);

    expect(profile.face).toBe(face);
    expect(profile.stats).toBe(DEFAULT_STATS);
  });

  it('reuses an existing profile when the face matches', () => {
    const profile = makePlayerProfile(face);

    expect(resolvePlayerProfile(face, profile)).toBe(profile);
  });

  it('creates a new profile when the face changes', () => {
    const profile = makePlayerProfile(face);
    const otherFace: FaceConfig = { ...face, hairColor: 'white' };

    const resolved = resolvePlayerProfile(otherFace, profile);

    expect(resolved).not.toBe(profile);
    expect(resolved.face).toBe(otherFace);
  });
});
