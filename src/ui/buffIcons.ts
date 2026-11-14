import { Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { loadImage } from '../utils/imageCache';
import type { Entity } from '../ecs';
import { Buffs } from '../buffs/buffs';
import type { Buff } from '../buffs/buff';

export const BUFF_ICON_SIZE = 8;
export const BUFF_ICON_SPACING = 9;
export const BUFF_ICON_ORIGIN_X = 32;
export const BUFF_ICON_ORIGIN_Y = 32;
export const BUFF_TIMER_WIDTH = 8;

const BUFF_BG = 'assets/ui/buff_bg.png';
const BUFF_TIMER = 'assets/ui/buff_timer.png';

export function buffIconPosition(index: number): { x: number; y: number } {
  return {
    x: BUFF_ICON_ORIGIN_X + index * BUFF_ICON_SPACING,
    y: BUFF_ICON_ORIGIN_Y,
  };
}

export function buffTimerFrameCount(sheetWidth: number): number {
  return Math.floor(sheetWidth / BUFF_TIMER_WIDTH);
}

export function buffTimerFrameIndex(remaining: number, frameCount: number): number {
  const elapsed = 1 - Math.max(0, Math.min(1, remaining));
  return Math.max(0, Math.min(frameCount - 1, Math.floor(elapsed * frameCount)));
}

export function buffTimeRemaining(buff: Buff): number {
  if (buff.initialTime <= 0) return 0;
  return Math.max(buff.time / buff.initialTime, 0);
}

export function iconBuffs(player: Entity): Buff[] {
  const buffs = player.getComponent(Buffs);
  if (!buffs) return [];
  return [...buffs.buffs.values()].filter((buff) => buff.buffdef.icon !== null);
}

export class BuffIcons {
  private root = new Container();
  private bg: Texture;
  private timerSheet: Texture;
  private timerFrames: Texture[] = [];
  private icons = new Map<string, Texture>();

  private constructor(bg: Texture, timerSheet: Texture) {
    this.bg = bg;
    this.timerSheet = timerSheet;
    this.root.zIndex = 100;
    this.root.eventMode = 'none';
  }

  static async create(stage: Container): Promise<BuffIcons> {
    const [bg, timerSheet] = await Promise.all([
      loadImage(BUFF_BG),
      loadImage(BUFF_TIMER),
    ]);
    const icons = new BuffIcons(bg, timerSheet);
    stage.addChild(icons.root);
    return icons;
  }

  private frame(index: number): Texture {
    const cached = this.timerFrames[index];
    if (cached) return cached;
    const texture = new Texture({
      source: this.timerSheet.source,
      frame: new Rectangle(index * BUFF_TIMER_WIDTH, 0, BUFF_TIMER_WIDTH, this.timerSheet.height),
    });
    this.timerFrames[index] = texture;
    return texture;
  }

  update(player: Entity): void {
    this.root.removeChildren();
    const buffs = iconBuffs(player);
    for (let i = 0; i < buffs.length; i++) {
      const buff = buffs[i];
      const { x, y } = buffIconPosition(i);
      const slot = new Container();
      slot.x = x;
      slot.y = y;

      slot.addChild(new Sprite(this.bg));
      const icon = buff.buffdef.icon as string;
      const cached = this.icons.get(icon);
      if (cached) {
        slot.addChild(new Sprite(cached));
      } else {
        void loadImage(icon).then((texture) => this.icons.set(icon, texture));
      }

      const frameCount = buffTimerFrameCount(this.timerSheet.width);
      const index = buffTimerFrameIndex(buffTimeRemaining(buff), frameCount);
      slot.addChild(new Sprite(this.frame(index)));

      this.root.addChild(slot);
    }
  }
}
