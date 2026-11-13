import { BuffEffect } from '../buffEffect';
import type { Buff } from '../buff';
import { Stats } from '../../actor/stats';

export interface FlatStats {
  hp?: number;
  mp?: number;
  physAtt?: number;
  physDef?: number;
  critical?: number;
}

export class ModifyStats extends BuffEffect {
  constructor(
    public flat: FlatStats | null = null,
    public scaling: FlatStats | null = null,
  ) {
    super();
  }

  override apply(buff: Buff): unknown {
    const id = `mod_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const stats = buff.target.getComponent(Stats);
    if (!stats) return null;
    if (this.flat) {
      if (this.flat.physAtt) stats.physAtt += this.flat.physAtt;
      if (this.flat.physDef) stats.physDef += this.flat.physDef;
      if (this.flat.critical) stats.critical += this.flat.critical;
    }
    return id;
  }

  override remove(_buff: Buff, state: unknown): void {
    const stats = _buff.target.getComponent(Stats);
    if (!stats || !state) return;
    if (this.flat) {
      if (this.flat.physAtt) stats.physAtt -= this.flat.physAtt;
      if (this.flat.physDef) stats.physDef -= this.flat.physDef;
      if (this.flat.critical) stats.critical -= this.flat.critical;
    }
  }
}
