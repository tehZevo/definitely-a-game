export class SecondaryStats {
  hp: number;
  mp: number;
  physAtt: number;
  magAtt: number;
  physDef: number;
  magDef: number;
  accuracy: number;
  evasion: number;
  moveSpeed: number;
  critical: number;

  constructor(
    hp = 0,
    mp = 0,
    physAtt = 0,
    magAtt = 0,
    physDef = 0,
    magDef = 0,
    accuracy = 0,
    evasion = 0,
    moveSpeed = 0,
    critical = 0,
  ) {
    this.hp = hp;
    this.mp = mp;
    this.physAtt = physAtt;
    this.magAtt = magAtt;
    this.physDef = physDef;
    this.magDef = magDef;
    this.accuracy = accuracy;
    this.evasion = evasion;
    this.moveSpeed = moveSpeed;
    this.critical = critical;
  }

  add(other: SecondaryStats): SecondaryStats {
    return new SecondaryStats(
      this.hp + other.hp,
      this.mp + other.mp,
      this.physAtt + other.physAtt,
      this.magAtt + other.magAtt,
      this.physDef + other.physDef,
      this.magDef + other.magDef,
      this.accuracy + other.accuracy,
      this.evasion + other.evasion,
      this.moveSpeed + other.moveSpeed,
      this.critical + other.critical,
    );
  }

  multiply(other: SecondaryStats | number): SecondaryStats {
    if (other instanceof SecondaryStats) {
      return new SecondaryStats(
        this.hp * other.hp,
        this.mp * other.mp,
        this.physAtt * other.physAtt,
        this.magAtt * other.magAtt,
        this.physDef * other.physDef,
        this.magDef * other.magDef,
        this.accuracy * other.accuracy,
        this.evasion * other.evasion,
        this.moveSpeed * other.moveSpeed,
        this.critical * other.critical,
      );
    }
    return new SecondaryStats(
      this.hp * other,
      this.mp * other,
      this.physAtt * other,
      this.magAtt * other,
      this.physDef * other,
      this.magDef * other,
      this.accuracy * other,
      this.evasion * other,
      this.moveSpeed * other,
      this.critical * other,
    );
  }

  asInts(): SecondaryStats {
    return new SecondaryStats(
      Math.floor(this.hp),
      Math.floor(this.mp),
      Math.floor(this.physAtt),
      Math.floor(this.magAtt),
      Math.floor(this.physDef),
      Math.floor(this.magDef),
      Math.floor(this.accuracy),
      Math.floor(this.evasion),
      Math.floor(this.moveSpeed),
      Math.floor(this.critical),
    );
  }

  clone(): SecondaryStats {
    return new SecondaryStats(
      this.hp, this.mp, this.physAtt, this.magAtt,
      this.physDef, this.magDef, this.accuracy, this.evasion,
      this.moveSpeed, this.critical,
    );
  }

  static Base(): SecondaryStats {
    return new SecondaryStats(0, 0, 0, 0, 0, 0, 0, 0, 100, 0);
  }

  static One(): SecondaryStats {
    return new SecondaryStats(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
  }
}
