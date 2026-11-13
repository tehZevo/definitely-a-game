import { BuffEffect } from '../buffEffect';
import type { Buff } from '../buff';
import { Buffs } from '../buffs';

export class ChildBuff extends BuffEffect {
  constructor(
    public buffdef: import('../buffDef').BuffDef,
    public powerScale = 1,
  ) {
    super();
  }

  override apply(buff: Buff): unknown {
    const buffsComp = buff.target.getComponent(Buffs);
    if (!buffsComp) return false;
    const power = buff.power * this.powerScale;
    return buffsComp.applyBuff(this.buffdef, power, buff.time, buff.caster);
  }

  override remove(buff: Buff, state: unknown): void {
    if (!state) return;
    const buffsComp = buff.target.getComponent(Buffs);
    if (buffsComp) {
      buffsComp.removeBuff(this.buffdef);
    }
  }
}
