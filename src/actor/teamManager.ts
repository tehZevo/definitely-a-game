import { Component } from '../ecs';

export enum Disposition {
  NEUTRAL,
  ALLY,
  ENEMY,
}

function makeKey(a: string, b: string): string {
  return [a, b].sort().join(':');
}

export class TeamManager extends Component {
  team: string | null;
  dispositions: Map<string, Disposition> = new Map();

  constructor(team: string | null = null) {
    super();
    this.team = team;
  }

  setDisposition(a: string, b: string, disposition: Disposition): void {
    if (!a || !b) throw new Error('Both teams must be non-null');
    this.dispositions.set(makeKey(a, b), disposition);
  }

  getDisposition(a: string, b: string): Disposition {
    return this.dispositions.get(makeKey(a, b)) ?? Disposition.NEUTRAL;
  }
}
