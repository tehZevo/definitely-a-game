import { Container, Graphics } from 'pixi.js';
import { Entity } from '../ecs';
import { Stats } from '../actor/stats';

const BAR_W = 120;
const BAR_H = 10;
const PAD = 8;
const BG = 0x1a1a1a;
const HP = 0xff3b30;
const MP = 0x2f7bff;

export function barWidth(
  current: number,
  max: number,
  maxWidth: number,
): number {
  if (max <= 0) return 0;
  const ratio = Math.max(0, Math.min(1, current / max));
  return Math.round(ratio * maxWidth);
}

export class Hud {
  private hpFill = new Graphics();
  private mpFill = new Graphics();

  constructor(stage: Container) {
    stage.addChild(
      new Graphics().rect(PAD, PAD, BAR_W, BAR_H).fill(BG),
      new Graphics().rect(PAD, PAD + BAR_H + 4, BAR_W, BAR_H).fill(BG),
      this.hpFill,
      this.mpFill,
    );
  }

  update(player: Entity): void {
    const stats = player.getComponent(Stats);
    if (!stats) return;
    this.hpFill
      .clear()
      .rect(PAD, PAD, barWidth(stats.hp, stats.maxHp, BAR_W), BAR_H)
      .fill(HP);
    this.mpFill
      .clear()
      .rect(PAD, PAD + BAR_H + 4, barWidth(stats.mp, stats.maxMp, BAR_W), BAR_H)
      .fill(MP);
  }
}
