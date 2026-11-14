import { BuffEffect } from '../buffEffect';
import type { Buff } from '../buff';
import { Stats } from '../../actor/stats';
import type { Stats as FullStats } from '../../stats/stats';

export class ModifyStats extends BuffEffect {
  constructor(
    public flat: FullStats | null = null,
    public scaling: FullStats | null = null,
  ) {
    super();
  }

  override apply(buff: Buff): unknown {
    const id = `mod_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const stats = buff.target.getComponent(Stats);
    if (!stats) return null;
    if (this.flat) stats.addFlatModifier(id, this.flat);
    if (this.scaling) stats.addScalingModifier(id, this.scaling);
    return id;
  }

  override remove(_buff: Buff, state: unknown): void {
    const stats = _buff.target.getComponent(Stats);
    if (!stats || !state) return;
    stats.removeFlatModifier(state as string);
    stats.removeScalingModifier(state as string);
  }
}
