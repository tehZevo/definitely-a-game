import type { MapDef } from '../maps/dfsGenerator';
import type { MobDef } from '../monsters/mobdef';
import type { SkillDef } from '../skills/skillDef';
import type { BuffDef } from '../buffs/buffDef';
import type { ItemDef } from '../items/itemDef';

const maps = new Map<string, MapDef>();
const mobs = new Map<string, MobDef>();
const skills = new Map<string, SkillDef>();
const buffs = new Map<string, BuffDef>();
const items = new Map<string, ItemDef>();

export function registerMap(id: string, mapdef: MapDef): void {
  maps.set(id, mapdef);
}

export function registerMob(id: string, mobdef: MobDef): void {
  mobs.set(id, mobdef);
}

export function registerSkill(id: string, skilldef: SkillDef): void {
  skills.set(id, skilldef);
}

export function registerBuff(id: string, buffdef: BuffDef): void {
  buffs.set(id, buffdef);
}

export function registerItem(id: string, itemdef: ItemDef): void {
  items.set(id, itemdef);
}

export function getMap(id: string): MapDef | undefined {
  return maps.get(id);
}

export function getMob(id: string): MobDef | undefined {
  return mobs.get(id);
}

export function getSkill(id: string): SkillDef | undefined {
  return skills.get(id);
}

export function getBuff(id: string): BuffDef | undefined {
  return buffs.get(id);
}

export function getItem(id: string): ItemDef | undefined {
  return items.get(id);
}
