import type { Stats } from './stats';

export abstract class StatsListener {
  abstract onStatsChanged(stats: Stats): void;
}
