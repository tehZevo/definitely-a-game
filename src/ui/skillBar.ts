import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { SkillDef } from '../skills/skillDef';
import { SkillSlots } from '../skills/skillSlots';
import { SkillSlot, SKILL_SLOTS, SKILL_SLOT_KEYS } from '../skills/skillSlot';
import { skillRankIcon } from '../skills/skillRank';

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

  private constructor(
    private slots: SkillSlots,
    private screenH: number,
  ) {}

  static async create(
    stage: Container,
    slots: SkillSlots,
    screenH: number,
  ): Promise<SkillBar> {
    const bar = new SkillBar(slots, screenH);
    bar.slotBg = await Assets.load<Texture>(assetUrl('assets/ui/slot_bg.png'));
    const defs: [SkillSlot, SkillDef | null][] = SKILL_SLOTS.map((s) => [
      s,
      bar.slots.get(s),
    ]);
    for (const [slot, def] of defs) {
      const { x, y } = slotPos(slot, bar.screenH);
      const bg = new PixiSprite(bar.slotBg);
      bg.x = x;
      bg.y = y;
      bar.container.addChild(bg);
      bar.children.push(bg);
      if (def) {
        if (def.icon) {
          const icon = await bar.loadIcon(def.icon);
          if (icon) {
            const s = new PixiSprite(icon);
            s.x = x + 4;
            s.y = y + 4;
            bar.container.addChild(s);
            bar.children.push(s);
          }
        }
        const rank = await bar.loadIcon(skillRankIcon(def.rank));
        if (rank) {
          const s = new PixiSprite(rank);
          s.x = x + 16;
          s.y = y + 16;
          bar.container.addChild(s);
          bar.children.push(s);
        }
      }
    }
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
