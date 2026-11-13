import type { TileType } from '../tiles/tile';

export interface Room {
  x: number;
  y: number;
  north: boolean;
  south: boolean;
  east: boolean;
  west: boolean;
}

export class MapDef {
  constructor(
    public id: string,
    public palette: string,
    public generator: string,
  ) {}
}

export interface DungeonResult {
  rooms: Room[];
  tiles: Map<string, TileType>;
}

export interface DFSOptions {
  roomSize?: number;
  floorSize?: number;
  doorWidth?: number;
  accent?: number;
}

const DEFAULTS: Required<DFSOptions> = {
  roomSize: 8,
  floorSize: 3,
  doorWidth: 2,
  accent: 0.1,
};

function oob(x: number, y: number, size: number): boolean {
  return x < 0 || y < 0 || x >= size || y >= size;
}

export function buildDFS(opts: Partial<DFSOptions> = {}): Room[] {
  const { floorSize } = { ...DEFAULTS, ...opts };
  const grid: (number | null)[][] = Array.from({ length: floorSize }, () =>
    Array.from({ length: floorSize }, () => null),
  );
  const queue: [number, number][] = [];
  const visited = new Set<string>();
  const dirs: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const startX = Math.floor(Math.random() * floorSize);
  const startY = Math.floor(Math.random() * floorSize);
  queue.push([startX, startY]);

  while (queue.length > 0) {
    const pos = queue[queue.length - 1];
    visited.add(`${pos[0]},${pos[1]}`);
    grid[pos[0]][pos[1]] = queue.length;

    const dirs2 = [...dirs].sort(() => Math.random() - 0.5);
    let validDirFound = false;
    for (const dir of dirs2) {
      const newPos: [number, number] = [pos[0] + dir[0], pos[1] + dir[1]];
      if (visited.has(`${newPos[0]},${newPos[1]}`)) continue;
      if (oob(newPos[0], newPos[1], floorSize)) continue;
      queue.push(newPos);
      validDirFound = true;
      break;
    }
    if (!validDirFound) {
      queue.pop();
    }
  }

  const rooms: Room[] = [];
  for (let y = 0; y < floorSize; y++) {
    for (let x = 0; x < floorSize; x++) {
      const center = grid[x][y] ?? 0;
      const north = oob(x, y - 1, floorSize)
        ? false
        : Math.abs((grid[x][y - 1] ?? 0) - center) === 1;
      const south = oob(x, y + 1, floorSize)
        ? false
        : Math.abs((grid[x][y + 1] ?? 0) - center) === 1;
      const east = oob(x + 1, y, floorSize)
        ? false
        : Math.abs((grid[x + 1][y] ?? 0) - center) === 1;
      const west = oob(x - 1, y, floorSize)
        ? false
        : Math.abs((grid[x - 1][y] ?? 0) - center) === 1;
      rooms.push({ x, y, north, south, east, west });
    }
  }
  return rooms;
}

export function roomsToTiles(
  rooms: Room[],
  roomSize = 8,
  doorWidth = 2,
  accent = 0.1,
): Map<string, TileType> {
  const tiles = new Map<string, TileType>();

  const isNotDoorway = (u: number, v: number, n: number, exit: boolean): boolean => {
    if (u === n) {
      if (exit) return v < doorWidth || v >= roomSize - doorWidth;
      return true;
    }
    return false;
  };

  const isWall = (
    x: number,
    y: number,
    north: boolean,
    south: boolean,
    east: boolean,
    west: boolean,
  ): boolean => {
    return (
      isNotDoorway(x, y, 0, west) ||
      isNotDoorway(x, y, roomSize - 1, east) ||
      isNotDoorway(y, x, 0, north) ||
      isNotDoorway(y, x, roomSize - 1, south)
    );
  };

  for (const room of rooms) {
    for (let tx = 0; tx < roomSize; tx++) {
      for (let ty = 0; ty < roomSize; ty++) {
        let tileType: TileType;
        if (isWall(tx, ty, room.north, room.south, room.east, room.west)) {
          tileType =
            Math.random() < accent ? 'wall_accent' : 'wall';
        } else {
          tileType =
            Math.random() < accent ? 'floor_accent' : 'floor';
        }
        const x = room.x * roomSize + tx;
        const y = room.y * roomSize + ty;
        tiles.set(`${x},${y}`, tileType);
      }
    }
  }
  return tiles;
}

export function generateDungeon(opts: Partial<DFSOptions> = {}): DungeonResult {
  const rooms = buildDFS(opts);
  const tiles = roomsToTiles(rooms, opts.roomSize ?? 8, opts.doorWidth ?? 2, opts.accent ?? 0.1);
  return { rooms, tiles };
}
