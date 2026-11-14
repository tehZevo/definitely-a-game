import { Component } from '../ecs';
import type { Loadout } from '../items/loadout';

export class LoadoutListener extends Component {
  onLoadoutChanged(_equips: Loadout): void {}
}
