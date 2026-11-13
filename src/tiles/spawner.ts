import { TileEntity } from './tileEntity';
import type { Entity } from '../ecs';
import { DT } from '../constants';
import { Position } from '../physics/position';
import { spawnMob } from '../monsters/spawn';
import type { MobDef } from '../monsters/mobdef';

export class Spawner extends TileEntity {
  spawned: Entity[] = [];
  remainingWaveTime = 0;

  constructor(
    public mobdef: MobDef,
    public waveTime = 2,
    public waveCount = 3,
    public radius = 4,
    public spawnMax = 10,
  ) {
    super();
  }

  private spawn(world: import('../ecs').World): void {
    const pos = this.entity.getComponent(Position);
    if (!pos) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * this.radius;
    const sx = pos.x + Math.cos(angle) * dist;
    const sy = pos.y + Math.sin(angle) * dist;
    const entity = spawnMob(world, this.mobdef, sx, sy);
    this.spawned.push(entity);
  }

  private spawnWave(world: import('../ecs').World): void {
    for (let i = 0; i < this.waveCount; i++) {
      if (this.spawned.length >= this.spawnMax) break;
      this.spawn(world);
    }
  }

  override update(dt = DT): void {
    const world = this.entity.world;
    if (!world) return;
    this.remainingWaveTime -= dt;
    if (this.remainingWaveTime <= 0) {
      this.spawnWave(world);
      this.remainingWaveTime = this.waveTime;
    }
    this.spawned = this.spawned.filter((e) => e.alive);
  }
}
