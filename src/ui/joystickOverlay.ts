import { Container, Graphics } from 'pixi.js';
import { TouchJoystick } from '../core/touchJoystick';

const BASE_RADIUS = 40;
const KNOB_RADIUS = 16;

export class JoystickOverlay {
  private container: Container;
  private base: Graphics;
  private knob: Graphics;
  private visible = false;

  constructor(stage: Container) {
    this.container = new Container();
    this.base = new Graphics();
    this.base.circle(0, 0, BASE_RADIUS).fill({ color: 0xffffff, alpha: 0.15 });
    this.base.circle(0, 0, BASE_RADIUS).stroke({ width: 2, color: 0xffffff, alpha: 0.4 });
    this.knob = new Graphics();
    this.knob.circle(0, 0, KNOB_RADIUS).fill({ color: 0xffffff, alpha: 0.5 });
    this.container.addChild(this.base, this.knob);
    this.container.visible = false;
    stage.addChild(this.container);
  }

  update(joystick: TouchJoystick): void {
    const origin = joystick.getMoveOrigin();
    const knob = joystick.getMoveKnob();
    if (origin && knob) {
      this.container.visible = true;
      this.base.x = origin.x;
      this.base.y = origin.y;
      this.knob.x = knob.x;
      this.knob.y = knob.y;
    } else if (this.visible) {
      this.container.visible = false;
    }
    this.visible = this.container.visible;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
