import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { SkillDef } from '../skills/skillDef';
import { SkillSlots } from '../skills/skillSlots';
import { SkillSlot, SKILL_SLOT_KEYS } from '../skills/skillSlot';
import { skillRankColor, skillRankIcon } from '../skills/skillRank';
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
  private slotsRoot = new Container();
  private slotBg: Texture | null = null;
  private iconCache = new Map<string, Texture>();
  private tooltip: Tooltip | null = null;
  private signature = '';

  private constructor(
    private slots: SkillSlots,
    private screenH: number,
  ) {
    this.container.eventMode = 'dynamic';
    this.container.zIndex = 100;
    this.container.addChild(this.slotsRoot);
  }

  static async create(
    stage: Container,
    slots: SkillSlots,
    screenH: number,
  ): Promise<SkillBar> {
    const bar = new SkillBar(slots, screenH);
    bar.slotBg = await Assets.load<Texture>(assetUrl('assets/ui/slot_bg.png'));
    bar.tooltip = new Tooltip(stage);
    stage.addChild(bar.container);
    await bar.render();
    return bar;
  }

  update(): void {
    if (this.currentSignature() === this.signature) return;
    void this.render();
  }

  private currentSignature(): string {
    return this.slots
      .visibleSlots()
      .map((slot) => `${slot}:${this.slots.get(slot)?.id ?? ''}`)
      .join('|');
  }

  private async render(): Promise<void> {
    this.signature = this.currentSignature();
    this.slotsRoot.removeChildren();

    const defs: [SkillSlot, SkillDef | null][] = this.slots.visibleSlots().map((slot) => [
      slot,
      this.slots.get(slot),
    ]);

    for (const [slot, def] of defs) {
      const { x, y } = slotPos(slot, this.screenH);
      const slotContainer = new Container();
      slotContainer.x = x;
      slotContainer.y = y;
      slotContainer.eventMode = 'static';
      this.slotsRoot.addChild(slotContainer);

      const bg = new PixiSprite(this.slotBg!);
      bg.eventMode = 'none';
      slotContainer.addChild(bg);

      if (!def) continue;

      const icon = await this.loadIcon(def.icon);
      if (icon) {
        const s = new PixiSprite(icon);
        s.eventMode = 'none';
        s.x = 4;
        s.y = 4;
        slotContainer.addChild(s);
      }

      const rank = await this.loadIcon(skillRankIcon(def.rank));
      if (rank) {
        const s = new PixiSprite(rank);
        s.eventMode = 'none';
        s.tint = skillRankColor(def.rank);
        s.x = 16;
        s.y = 16;
        slotContainer.addChild(s);
      }

      const text = def.description ?? this.keyFor(slot);
      slotContainer.on('pointerover', () => this.tooltip?.show(text, x, y - 24));
      slotContainer.on('pointerout', () => this.tooltip?.hide());
    }
  }

  private async loadIcon(path: string | null): Promise<Texture | null> {
    if (!path) return null;
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
