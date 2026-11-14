import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { SkillDef } from '../skills/skillDef';
import { SkillSlots } from '../skills/skillSlots';
import { SkillSlot, SKILL_SLOT_KEYS } from '../skills/skillSlot';
import { skillRankIcon } from '../skills/skillRank';
import { Tooltip } from './tooltip';

const SLOT = 24;
const GAP = 2;
const BASE_X = 2;
const BASE_Y = 10;

function slotPos(slot: SkillSlot, screenH: number): { x: number; y: number } {
  const row = slot + 1;
  return { x: BASE_X, y: screenH - BASE_Y - row * (SLOT + GAP) };
}

export class SkillBar {
  private container = new Container();
  private slotBg: Texture | null = null;
  private iconCache = new Map<string, Texture>();
  private children: PixiSprite[] = [];
  private tooltip: Tooltip | null = null;

  private constructor(
    private slots: SkillSlots,
    private screenH: number,
  ) {
    this.container.eventMode = 'dynamic';
  }

  static async create(
    stage: Container,
    slots: SkillSlots,
    screenH: number,
  ): Promise<SkillBar> {
    const bar = new SkillBar(slots, screenH);
    bar.slotBg = await Assets.load<Texture>(assetUrl('assets/ui/slot_bg.png'));
    bar.tooltip = new Tooltip(stage);
    const defs: [SkillSlot, SkillDef | null][] = bar.slots.visibleSlots().map((s) => [
      s,
      bar.slots.get(s),
    ]);
    for (const [slot, def] of defs) {
      const { x, y } = slotPos(slot, bar.screenH);
      const slotContainer = new Container();
      slotContainer.x = x;
      slotContainer.y = y;
      slotContainer.eventMode = 'static';
      bar.container.addChild(slotContainer);

      const bg = new PixiSprite(bar.slotBg);
      bg.eventMode = 'none';
      slotContainer.addChild(bg);
      bar.children.push(bg);

      if (def) {
        if (def.icon) {
          const icon = await bar.loadIcon(def.icon);
          if (icon) {
            const s = new PixiSprite(icon);
            s.eventMode = 'none';
            s.x = 4;
            s.y = 4;
            slotContainer.addChild(s);
            bar.children.push(s);
          }
        }
        const rank = await bar.loadIcon(skillRankIcon(def.rank));
        if (rank) {
          const s = new PixiSprite(rank);
          s.eventMode = 'none';
          s.x = 16;
          s.y = 16;
          slotContainer.addChild(s);
          bar.children.push(s);
        }

        const text = def.description ?? bar.keyFor(slot);
        slotContainer.on('pointerover', () => bar.tooltip?.show(text, x, y - 24));
        slotContainer.on('pointerout', () => bar.tooltip?.hide());
      }
    }
    bar.container.zIndex = 100;
    stage.addChild(bar.container);
    return bar;
  }

  private async loadIcon(path: string): Promise<Texture | null> {
    const cached = this.iconCache.get(path);
    if (cached) return cached;
    try {
      const tex = await Assets.load<Texture>(assetUrl(path));
      this.iconCache.set(path, tex);
      return tex;
    } catch {
      return null;
    }
  }

  keyFor(slot: SkillSlot): string {
    return SKILL_SLOT_KEYS[slot];
  }
}
