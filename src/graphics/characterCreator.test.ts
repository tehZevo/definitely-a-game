import { describe, it, expect } from 'vitest';
import { getFaceImagePaths, type FaceConfig } from './characterCreator';

const face: FaceConfig = {
  gender: 'male',
  skinTone: 'light',
  hairStyle: 1,
  hairColor: 'red',
  eyeColor: 'blue',
};

describe('getFaceImagePaths', () => {
  it('includes hair by default', () => {
    expect(getFaceImagePaths(face)).toContain('assets/player/face/male_hair_2.png');
  });

  it('omits hair when hidden', () => {
    expect(getFaceImagePaths(face, { hideHair: true })).toEqual([
      'assets/player/face/skin.png',
      'assets/player/face/male_eyes.png',
      'assets/player/face/pupils.png',
    ]);
  });
});
