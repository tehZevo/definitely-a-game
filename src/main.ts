import './style.css';
import { Application, Container } from 'pixi.js';
import { World } from './ecs';
import { Vector2 } from './utils/vector';
import { Position } from './physics/position';
import { PlayerController } from './actor/playerController';
import { Sprite } from './graphics/sprite';
import { SpriteRenderer } from './graphics/spriteRenderer';
import { TileRenderer } from './graphics/tileRenderer';
import { Camera } from './graphics/camera';
import { KeyboardInput } from './core/input';
import { TouchJoystick } from './core/touchJoystick';
import { CombinedInput } from './core/combinedInput';
import { generateDungeon } from './maps/dfsGenerator';
import { chunkTiles } from './maps/chunkTiles';
import { Tileset } from './tiles/tileset';
import { Tile } from './tiles/tile';
import { TilePhysics } from './tiles/tilePhysics';
import { spawnMob } from './monsters/spawn';
import { greenSlime, slime, redSlime, brownSlime, darkSlime, pinkSlime } from './data/mobs/slimes';
import { Stats } from './actor/stats';
import { Actor } from './actor/actor';
import { Team } from './actor/team';
import { Shadow } from './actor/shadow';
import { Physics } from './physics/physics';
import { defaultAttack } from './data/skills/defaultAttack';
import { fireball } from './data/skills/fireball';
import { quadStrike } from './data/skills/quadStrike';
import { SkillSlots } from './skills/skillSlots';
import { SkillSlot } from './skills/skillSlot';
import { Hud } from './ui/hud';
import { SkillBar } from './ui/skillBar';
import { DamageNumberRenderer } from './ui/damageNumberRenderer';
import { JoystickOverlay } from './ui/joystickOverlay';
import { Stairs } from './tiles/stairs';
import { Chest } from './tiles/chest';
import { woodenShortsword } from './data/items/weapons';
import { cottonRobe } from './data/items/armor';

function dungeonToTileset(tiles: Map<string, import('./tiles/tile').TileType>): Tileset {
  let maxX = 0;
  let maxY = 0;
  for (const key of tiles.keys()) {
    const [x, y] = key.split(',').map(Number);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  const width = maxX + 1;
  const height = maxY + 1;
  const grid: Tile[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => new Tile('', false)),
  );
  for (const [key, tileType] of tiles) {
    const [x, y] = key.split(',').map(Number);
    const img = tileType.startsWith('wall') ? 'assets/tiles/wall.png' : 'assets/tiles/grass.png';
    grid[y][x] = new Tile(img, tileType.startsWith('wall'));
  }
  return new Tileset(width, height, grid);
}

async function boot(): Promise<void> {
  const app = new Application();
  await app.init({
    background: '#1099bb',
    resizeTo: window,
    antialias: false,
    resolution: 1,
  });
  document.getElementById('app')?.appendChild(app.canvas);

  const worldLayer = new Container();
  app.stage.addChild(worldLayer);

  const dungeon = generateDungeon({ roomSize: 8, floorSize: 3 });
  const tileset = dungeonToTileset(dungeon.tiles);
  await TileRenderer.render(tileset, worldLayer);

  const world = new World();
  const chunks = chunkTiles(dungeon.tiles);
  world.createEntity([new TilePhysics(chunks)]);
  const spawnRoom = dungeon.rooms[0];
  const spawnX = spawnRoom.x * 8 + 4;
  const spawnY = spawnRoom.y * 8 + 4;
  const pos = new Position(spawnX * 16, spawnY * 16);
  const keyboard = new KeyboardInput(window);
  const touch = 'ontouchstart' in window
    ? new TouchJoystick(app.canvas)
    : null;
  const input = touch
    ? new CombinedInput(keyboard, touch)
    : keyboard;
  const player = world.createEntity([
    pos,
    new Physics(),
    new PlayerController(input, defaultAttack),
    new Stats(100, 100, 50, 50),
    new Actor(),
    new Team(0),
    new Shadow(),
    new SkillSlots({
      [SkillSlot.ALPHA]: defaultAttack,
      [SkillSlot.BETA]: fireball,
      [SkillSlot.GAMMA]: quadStrike,
    }),
    new Sprite({
      idle: [
        'assets/player/idle_down_body.png',
        'assets/player/idle_down_hair.png',
        'assets/player/idle_down_eyes.png',
      ],
      walk: [
        'assets/player/walk_down_body.png',
        'assets/player/walk_down_hair.png',
        'assets/player/walk_down_eyes.png',
      ],
    }),
  ]);

  const mobRooms = dungeon.rooms.slice(1);
  const mobs = [greenSlime, slime, redSlime, brownSlime, darkSlime, pinkSlime];
  for (let i = 0; i < mobRooms.length; i++) {
    const room = mobRooms[i];
    const mobType = mobs[i % mobs.length];
    spawnMob(world, mobType, room.x * 8 * 16 + 64, room.y * 8 * 16 + 64);
  }

  const lastRoom = dungeon.rooms[dungeon.rooms.length - 1];
  world.createEntity([
    new Position(lastRoom.x * 8 * 16 + 64, lastRoom.y * 8 * 16 + 64),
    new Stairs('plains'),
  ]);

  const midRoom = dungeon.rooms[Math.floor(dungeon.rooms.length / 2)];
  world.createEntity([
    new Position(midRoom.x * 8 * 16 + 32, midRoom.y * 8 * 16 + 32),
    new Chest([woodenShortsword, cottonRobe]),
  ]);

  const spriteRenderer = new SpriteRenderer(worldLayer);
  await spriteRenderer.preload(world);

  const hud = new Hud(app.stage);
  const damageNumbers = new DamageNumberRenderer(app.stage);
  await SkillBar.create(app.stage, player.getComponent(SkillSlots)!, app.screen.height);
  const camera = new Camera(worldLayer);
  const joystickOverlay = touch ? new JoystickOverlay(app.stage) : null;

  let last = performance.now();
  app.ticker.add(() => {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    world.update(dt);
    spriteRenderer.update(world, dt);
    damageNumbers.update(world);
    hud.update(player);
    if (touch && joystickOverlay) joystickOverlay.update(touch);
    camera.follow(
      new Vector2(Math.round(pos.x), Math.round(pos.y)),
      app.screen.width,
      app.screen.height,
    );
  });
}

void boot();
