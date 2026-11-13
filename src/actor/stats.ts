import { Component } from '../ecs';

export class Stats extends Component {
  constructor(
    public hp: number,
    public maxHp: number,
    public mp = 0,
    public maxMp = 0,
    public physAtt = 100,
    public physDef = 0,
    public critical = 0,
  ) {
    super();
  }

  addHp(amount: number): void {
    this.hp = Math.max(0, Math.min(this.maxHp, this.hp + amount));
  }

  addMp(amount: number): void {
    this.mp = Math.max(0, Math.min(this.maxMp, this.mp + amount));
  }
}
