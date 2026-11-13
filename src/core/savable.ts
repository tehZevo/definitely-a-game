import { Component } from '../ecs';

export abstract class Savable extends Component {
  abstract saveKeys(): string[];

  save(): Record<string, unknown> {
    const data: Record<string, unknown> = {};
    for (const key of this.saveKeys()) {
      data[key] = (this as Record<string, unknown>)[key];
    }
    return data;
  }

  load(data: Record<string, unknown>): void {
    Object.assign(this, data);
  }
}
