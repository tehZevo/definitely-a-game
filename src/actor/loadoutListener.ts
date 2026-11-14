import type { Loadout } from '../items/loadout';

export abstract class LoadoutListener {
  abstract onLoadoutChanged(equips: Loadout): void;
}
