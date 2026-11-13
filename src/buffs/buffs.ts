import { Component } from '../ecs';
import { Buff } from './buff';
import type { BuffDef } from './buffDef';
import type { Entity } from '../ecs';
import { DT } from '../constants';

export class Buffs extends Component {
  buffs: Map<BuffDef, Buff> = new Map();
  dirty = false;

  getBuff(buffdef: BuffDef): Buff | undefined {
    return this.buffs.get(buffdef);
  }

  shouldApply(existing: Buff | undefined, power: number, time: number): boolean {
    if (!existing) return true;
    if (power > existing.power) return true;
    if (power === existing.power && time > existing.time) return true;
    return false;
  }

  applyBuff(buffdef: BuffDef, power: number, time: number, caster: Entity): boolean {
    const existing = this.buffs.get(buffdef);
    if (!this.shouldApply(existing, power, time)) return false;
    const buff = new Buff(buffdef, power, time, this.entity, caster);
    if (existing) existing.remove();
    this.buffs.set(buffdef, buff);
    buff.apply();
    this.dirty = true;
    return true;
  }

  removeBuff(buffdef: BuffDef): void {
    const existing = this.buffs.get(buffdef);
    if (existing) {
      existing.remove();
      this.buffs.delete(buffdef);
      this.dirty = true;
    }
  }

  override update(dt = DT): void {
    for (const [def, buff] of [...this.buffs]) {
      buff.update(dt);
      if (buff.time <= 0) {
        buff.remove();
        this.buffs.delete(def);
        this.dirty = true;
      }
    }
    this.dirty = false;
  }
}
