import { Axis, InputSource } from './input';

export class CombinedInput implements InputSource {
  constructor(
    private primary: InputSource,
    private secondary: InputSource,
  ) {}

  getAxis(): Axis {
    const a = this.primary.getAxis();
    if (a.x !== 0 || a.y !== 0) return a;
    return this.secondary.getAxis();
  }

  isPressed(code: string): boolean {
    return this.primary.isPressed(code) || this.secondary.isPressed(code);
  }
}
