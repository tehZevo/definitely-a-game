import type { Equips } from '../items/equips';

export abstract class EquipsListener {
  abstract onEquipsChanged(equips: Equips): void;
}
