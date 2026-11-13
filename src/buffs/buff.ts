import { DT } from '../constants';
import type { BuffDef } from './buffDef';
import type { Entity } from '../ecs';

export class Buff {
  effectStates: unknown[] = [];
  time: number;

  constructor(
    public buffdef: BuffDef,
    public power: number,
    public initialTime: number,
    public target: Entity,
    public caster: Entity,
  ) {
    this.time = initialTime;
  }

  apply(): void {
    this.time = this.initialTime;
    this.effectStates = this.buffdef.effects.map((e) => e.apply(this));
  }

  update(dt = DT): void {
    this.time -= dt;
    this.effectStates = this.buffdef.effects.map((e, i) =>
      e.update(this, this.effectStates[i]),
    );
  }

  remove(): void {
    this.buffdef.effects.forEach((e, i) => e.remove(this, this.effectStates[i]));
  }
}
