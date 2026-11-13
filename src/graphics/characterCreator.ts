export const GENDERS = ['male', 'female'] as const;
export type Gender = (typeof GENDERS)[number];

export const SKIN_TONES = ['pale', 'light', 'tan', 'dark'] as const;
export type SkinTone = (typeof SKIN_TONES)[number];

export const EYE_COLORS = ['blue', 'green', 'brown', 'red'] as const;
export type EyeColor = (typeof EYE_COLORS)[number];

export const HAIR_COLORS = ['brown', 'green', 'blue', 'red', 'black', 'white'] as const;
export type HairColor = (typeof HAIR_COLORS)[number];

export const NUM_HAIR_STYLES = 2;

export const GENDER_EYES: Record<Gender, string> = {
  male: 'male_eyes.png',
  female: 'female_eyes.png',
};

export const GENDER_HAIR_STYLES: Record<Gender, string[]> = {
  male: ['male_hair_1.png', 'male_hair_2.png'],
  female: ['female_hair_1.png', 'female_hair_2.png'],
};

export const SKIN_TONE_COLORS: Record<SkinTone, [number, number, number]> = {
  pale: [242, 210, 179],
  light: [238, 195, 154],
  tan: [204, 147, 98],
  dark: [87, 60, 39],
};

export const EYE_COLOR_VALUES: Record<EyeColor, [number, number, number]> = {
  green: [107, 181, 33],
  blue: [4, 116, 191],
  brown: [87, 42, 23],
  red: [177, 19, 19],
};

export const HAIR_COLOR_VALUES: Record<HairColor, [number, number, number]> = {
  green: [46, 94, 2],
  blue: [21, 42, 172],
  brown: [87, 42, 23],
  red: [177, 19, 19],
  black: [26, 26, 26],
  white: [224, 224, 224],
};

export interface FaceConfig {
  gender: Gender;
  skinTone: SkinTone;
  hairStyle: number;
  hairColor: HairColor;
  eyeColor: EyeColor;
}

export function getFaceImagePaths(config: FaceConfig): string[] {
  const faceDir = 'assets/player/face/';
  return [
    faceDir + 'skin.png',
    faceDir + GENDER_EYES[config.gender],
    faceDir + 'pupils.png',
    faceDir + GENDER_HAIR_STYLES[config.gender][config.hairStyle],
  ];
}
