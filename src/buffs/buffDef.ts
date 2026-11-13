import type { BuffEffect } from './buffEffect';

export class BuffDef {
  constructor(
    public id: string,
    public effects: BuffEffect[],
    public icon: string | null = null,
  ) {}
}
