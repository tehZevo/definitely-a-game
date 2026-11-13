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
import { grassFloor } from './data/maps/grassFloor';
import { spawnMob } from './monsters/spawn';
import { greenSlime, slime, redSlime } from './data/mobs/slimes';

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

  await TileRenderer.render(grassFloor(), worldLayer);

  const world = new World();
  const pos = new Position(160, 160);
  world.createEntity([
    pos,
    new PlayerController(new KeyboardInput(window)),
    new Sprite([
      'assets/player/idle_down_body.png',
      'assets/player/idle_down_hair.png',
      'assets/player/idle_down_eyes.png',
    ]),
  ]);
  spawnMob(world, greenSlime, 120, 120);
  spawnMob(world, slime, 200, 140);
  spawnMob(world, redSlime, 180, 220);
  const spriteRenderer = new SpriteRenderer(worldLayer);
  await spriteRenderer.preload(world);

  const camera = new Camera(worldLayer);

  let last = performance.now();
  app.ticker.add(() => {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    world.update(dt);
    spriteRenderer.update(world);
    camera.follow(
      new Vector2(Math.round(pos.x), Math.round(pos.y)),
      app.screen.width,
      app.screen.height,
    );
  });
}

void boot();
