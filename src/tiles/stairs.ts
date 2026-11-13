import { TileEntity } from './tileEntity';
import type { MapDef } from '../maps/dfsGenerator';

export class Stairs extends TileEntity {
  constructor(public mapdef: MapDef | string) {
    super();
  }
}
