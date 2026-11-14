import { Component } from '../ecs';

export interface StatsData {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  physAtt: number;
  physDef: number;
  critical: number;
  magAtt: number;
  magDef: number;
}

export class Stats extends Component {
  moveSpeed = 120;
  moveSpeedMultiplier = 1;

  constructor(
    public hp: number,
    public maxHp: number,
    public mp = 0,
    public maxMp = 0,
    public physAtt = 100,
    public physDef = 0,
    public critical = 0,
    public magAtt = 100,
    public magDef = 0,
  ) {
    super();
  }

  addHp(amount: number): void {
    this.hp = Math.max(0, Math.min(this.maxHp, this.hp + amount));
  }

  addMp(amount: number): void {
    this.mp = Math.max(0, Math.min(this.maxMp, this.mp + amount));
  }

  snapshot(): StatsData {
    return {
      hp: this.hp,
      maxHp: this.maxHp,
      mp: this.mp,
      maxMp: this.maxMp,
      physAtt: this.physAtt,
      physDef: this.physDef,
      critical: this.critical,
      magAtt: this.magAtt,
      magDef: this.magDef,
    };
  }

  load(data: StatsData): void {
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    this.mp = data.mp;
    this.maxMp = data.maxMp;
    this.physAtt = data.physAtt;
    this.physDef = data.physDef;
    this.critical = data.critical;
    this.magAtt = data.magAtt;
    this.magDef = data.magDef;
  }
}
