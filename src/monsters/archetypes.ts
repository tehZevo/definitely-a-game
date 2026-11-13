export type ArchetypeFn = (equip: number, primary: number) => [number, number];

export function MOOK(equip: number, primary: number): [number, number] {
  return [equip * 0.1, primary * 0.1];
}

export function TANK(equip: number, primary: number): [number, number] {
  return [equip * 0.5, primary * 0.2];
}

export function GLASS_CANNON(equip: number, primary: number): [number, number] {
  return [equip * 0.05, primary * 0.8];
}

export function MAGIC(equip: number, primary: number): [number, number] {
  return [equip * 0.3, primary * 0.6];
}

export function PHYSICAL(equip: number, primary: number): [number, number] {
  return [equip * 0.6, primary * 0.4];
}

export function BOSS(equip: number, primary: number): [number, number] {
  return [equip * 1.0, primary * 1.0];
}
