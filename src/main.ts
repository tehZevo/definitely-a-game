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
import { Stats } from './actor/stats';
import { Actor } from './actor/actor';
import { Team } from './actor/team';
import { defaultAttack } from './data/skills/defaultAttack';
import { SkillSlots } from './skills/skillSlots';
import { SkillSlot } from './skills/skillSlot';
import { Hud } from './ui/hud';
import { SkillBar } from './ui/skillBar';
import { DamageNumberRenderer } from './ui/damageNumberRenderer';

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
  const player = world.createEntity([
    pos,
    new PlayerController(new KeyboardInput(window), defaultAttack),
    new Stats(100, 100, 50, 50),
    new Actor(),
    new Team(0),
    new SkillSlots({ [SkillSlot.ALPHA]: defaultAttack }),
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
  spawnMob(world, greenSlime, 120, 120);
  spawnMob(world, slime, 200, 140);
  spawnMob(world, redSlime, 180, 220);
  const spriteRenderer = new SpriteRenderer(worldLayer);
  await spriteRenderer.preload(world);

  const hud = new Hud(app.stage);
  const damageNumbers = new DamageNumberRenderer(app.stage);
  await SkillBar.create(app.stage, player.getComponent(SkillSlots)!, app.screen.height);
  const camera = new Camera(worldLayer);

  let last = performance.now();
  app.ticker.add(() => {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    world.update(dt);
    spriteRenderer.update(world, dt);
    damageNumbers.update(world);
    hud.update(player);
    camera.follow(
      new Vector2(Math.round(pos.x), Math.round(pos.y)),
      app.screen.width,
      app.screen.height,
    );
  });
}

void boot();
