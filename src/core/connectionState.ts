import { Component } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';

export const DISCONNECTED_ICON = 'assets/icons/disconnect.png';
export const CONNECTION_ICON_OFFSET_Y = -16;

export function connectionIconPath(connected: boolean): string | null {
  return connected ? null : DISCONNECTED_ICON;
}

export class ConnectionState extends Component {
  connected: boolean;

  constructor(connected = true) {
    super();
    this.require(Position, Sprite);
    this.connected = connected;
  }

  setConnected(connected: boolean): void {
    this.connected = connected;
  }

  iconPath(): string | null {
    return connectionIconPath(this.connected);
  }
}
