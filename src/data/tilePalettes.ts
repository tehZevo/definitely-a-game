const t = (x: string) => `assets/tiles/${x}.png`;

export class TilePalette {
  constructor(
    public floors: [string, string],
    public walls: [string, string],
  ) {}

  static Floors(floors: string, accent: string): TilePalette {
    return new TilePalette([t(floors), t(accent)], ['', '']);
  }

  static Walls(walls: string, accent: string): TilePalette {
    return new TilePalette(['', ''], [t(walls), t(accent)]);
  }

  add(other: TilePalette): TilePalette {
    return new TilePalette(
      this.floors[0] ? this.floors : other.floors,
      this.walls[0] ? this.walls : other.walls,
    );
  }
}

export const grassFloors = TilePalette.Floors('grass', 'dirt');
export const grassWalls = TilePalette.Walls('grass', 'dirt');
export const stoneFloors = TilePalette.Floors('stone', 'sand');
export const stoneWalls = TilePalette.Walls('stone', 'stone');
export const sandFloors = TilePalette.Floors('sand', 'grass');
export const sandWalls = TilePalette.Walls('sand', 'grass');
export const forestFloors = TilePalette.Floors('dark_forest', 'grass');
export const forestWalls = TilePalette.Walls('dark_forest', 'grass');
export const dirtFloors = TilePalette.Floors('dirt', 'dark_dirt');
export const dirtWalls = TilePalette.Walls('dirt', 'dark_dirt');
