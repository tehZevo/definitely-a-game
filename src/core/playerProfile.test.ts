import { describe, expect, it } from 'vitest';
import { DEFAULT_LOADOUT, DEFAULT_STATS, makePlayerProfile, resolvePlayerProfile } from './playerProfile';
import { Loadout } from '../items/loadout';
import { ArmorSlot } from '../items/slots';
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

    expect(profile.name).toBe('Player');
    expect(profile.face).toBe(face);
    expect(profile.baseStats).toBe(DEFAULT_STATS);
    expect(profile.stats).toBe(DEFAULT_STATS);
  });

  it('starts with a cotton robe equipped', () => {
    const loadout = new Loadout();
    loadout.load(DEFAULT_LOADOUT);

    expect(loadout.getArmor(ArmorSlot.SUIT)?.id).toBe('cotton_robe');
  });

  it('uses a provided character name', () => {
    const profile = makePlayerProfile(face, 'Zevo');

    expect(profile.name).toBe('Zevo');
  });

  it('reuses an existing profile when the face matches', () => {
    const profile = makePlayerProfile(face, 'Zevo');

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
