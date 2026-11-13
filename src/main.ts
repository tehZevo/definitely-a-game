import { Application } from 'pixi.js';
import { World } from './ecs';
import { Position } from './physics/position';
import { PlayerController } from './actor/playerController';
import { Sprite } from './graphics/sprite';
import { SpriteRenderer } from './graphics/spriteRenderer';
import { KeyboardInput } from './core/input';

async function boot(): Promise<void> {
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });
  document.getElementById('app')?.appendChild(app.canvas);

  const world = new World();
  world.createEntity([
    new Position(100, 100),
    new PlayerController(new KeyboardInput(window)),
    new Sprite([
      'assets/player/idle_down_body.png',
      'assets/player/idle_down_hair.png',
      'assets/player/idle_down_eyes.png',
    ]),
  ]);

  const renderer = new SpriteRenderer(app.stage);
  await renderer.preload(world);

  let last = performance.now();
  app.ticker.add(() => {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    world.update(dt);
    renderer.update(world);
  });
}

void boot();
