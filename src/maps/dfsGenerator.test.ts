import { describe, it, expect } from "vitest";
import { generateDungeon } from "./dfsGenerator";

describe('generateDungeon spawners', () => {
  it('places spawners at room centers in tile space', () => {
    const result = generateDungeon({ roomSize: 8, floorSize: 1, spawnerChance: 1 });
    expect(result.spawners.length).toBe(result.rooms.length);
    for (const spawner of result.spawners) {
      expect(Number.isInteger(spawner.x)).toBe(true);
    }
  });

  it('places no spawners when chance is zero', () => {
    const result = generateDungeon({ spawnerChance: 0 });
    expect(result.spawners.length).toBe(0);
  });
});
