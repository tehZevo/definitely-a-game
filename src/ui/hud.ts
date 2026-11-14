import { Assets, Container, Graphics, Sprite as PixiSprite, Texture } from 'pixi.js';
import { assetUrl } from '../assets';
import { Entity } from '../ecs';
import { Stats } from '../actor/stats';
import { Loadout } from '../items/loadout';
import { barWidth } from './barWidth';
import { equipGradeColor, equipGradeIcon } from '../items/equipGrade';
import { rarityColor } from '../items/rarity';
import type { Equip } from '../items/equip';
import { loadImage } from '../utils/imageCache';
import { Tooltip } from './tooltip';
import {
  ITEM_SLOT_LAYOUT,
  itemForSlot,
  itemSlotLabel,
  itemSlotPosition,
  type ItemSlotKind,
} from './itemSlot';

const BAR_W = 120;
const BAR_H = 10;
const PAD = 8;
const BG = 0x1a1a1a;
const HP = 0xff3b30;
const MP = 0x2f7bff;

const SLOT_BG = 'assets/ui/slot_bg.png';
const SLOT_BORDER = 'assets/ui/slot_border.png';
const RANK_BG = 'assets/ui/rank_bg.png';
const RANK_BORDER = 'assets/ui/rank_border.png';

interface SlotTextures {
  slotBg: Texture;
  slotBorder: Texture;
  rankBg: Texture;
  rankBorder: Texture;
}

interface GearSlotView {
  kind: ItemSlotKind;
  index: number;
  root: Container;
  border: PixiSprite;
  icon: PixiSprite;
  rankBg: PixiSprite;
  rankBorder: PixiSprite;
  rankIcon: PixiSprite;
  itemId: string | null;
}

export class Hud {
  private root = new Container();
  private hpBg = new Graphics().rect(PAD, PAD, BAR_W, BAR_H).fill(BG);
  private mpBg = new Graphics().rect(PAD, PAD + BAR_H + 4, BAR_W, BAR_H).fill(BG);
  private hpFill = new Graphics();
  private mpFill = new Graphics();
  private gearRow = new Container();
  private slots: GearSlotView[] = [];
  private tooltip: Tooltip;
  private player: Entity | null = null;

  private constructor(
    private stage: Container,
    private screenH: number,
    textures: SlotTextures,
  ) {
    this.root.zIndex = 100;
    this.root.addChild(this.hpBg, this.mpBg, this.hpFill, this.mpFill, this.gearRow);
    stage.addChild(this.root);
    this.tooltip = new Tooltip(this.stage);

    ITEM_SLOT_LAYOUT.forEach((kind, index) => {
      const { x, y } = itemSlotPosition(index, screenH);
      const root = new Container();
      root.x = x;
      root.y = y;
      root.eventMode = 'static';

      const bg = new PixiSprite(textures.slotBg);
      const border = new PixiSprite(textures.slotBorder);
      const icon = new PixiSprite();
      icon.x = 4;
      icon.y = 4;
      const rankBg = new PixiSprite(textures.rankBg);
      rankBg.x = 14;
      rankBg.y = -2;
      const rankBorder = new PixiSprite(textures.rankBorder);
      rankBorder.x = 14;
      rankBorder.y = -2;
      const rankIcon = new PixiSprite();
      rankIcon.x = 16;
      rankIcon.y = 0;

      for (const sprite of [bg, border, icon, rankBg, rankBorder, rankIcon]) {
        sprite.eventMode = 'none';
      }
      root.addChild(bg, border, icon, rankBg, rankBorder, rankIcon);
      this.gearRow.addChild(root);

      const view: GearSlotView = {
        kind,
        index,
        root,
        border,
        icon,
        rankBg,
        rankBorder,
        rankIcon,
        itemId: null,
      };
      this.slots.push(view);
      root.on('pointerover', () => this.showTooltip(view));
      root.on('pointerout', () => this.tooltip.hide());
    });
  }

  static async create(stage: Container, screenH: number): Promise<Hud> {
    const [slotBg, slotBorder, rankBg, rankBorder] = await Promise.all([
      Assets.load<Texture>(assetUrl(SLOT_BG)),
      Assets.load<Texture>(assetUrl(SLOT_BORDER)),
      Assets.load<Texture>(assetUrl(RANK_BG)),
      Assets.load<Texture>(assetUrl(RANK_BORDER)),
    ]);
    return new Hud(stage, screenH, { slotBg, slotBorder, rankBg, rankBorder });
  }

  update(player: Entity): void {
    this.player = player;

    const stats = player.getComponent(Stats);
    if (stats) {
      this.hpFill
        .clear()
        .rect(PAD, PAD, barWidth(stats.hp, stats.maxHp, BAR_W), BAR_H)
        .fill(HP);
      this.mpFill
        .clear()
        .rect(PAD, PAD + BAR_H + 4, barWidth(stats.mp, stats.maxMp, BAR_W), BAR_H)
        .fill(MP);
    }

    const loadout = player.getComponent(Loadout);
    if (!loadout) return;
    for (const slot of this.slots) {
      const item = itemForSlot(loadout, slot.kind);
      const id = item?.id ?? null;
      if (slot.itemId === id) continue;
      slot.itemId = id;
      void this.renderItem(slot, item);
    }
  }

  private async renderItem(slot: GearSlotView, item: Equip | undefined): Promise<void> {
    slot.icon.texture = Texture.EMPTY;
    slot.rankIcon.texture = Texture.EMPTY;
    slot.rankBg.visible = false;
    slot.rankBorder.visible = false;
    if (!item) {
      slot.border.tint = 0xffffff;
      return;
    }

    slot.border.tint = rarityColor(item.rarity);
    const icon = await loadImage(item.icon);
    if (slot.itemId !== item.id) return;
    slot.icon.texture = icon;

    const gradeIcon = equipGradeIcon(item.grade);
    if (!gradeIcon) return;
    slot.rankBg.visible = true;
    slot.rankBorder.visible = true;
    slot.rankBorder.tint = rarityColor(item.rarity);
    const grade = await loadImage(gradeIcon);
    if (slot.itemId !== item.id) return;
    slot.rankIcon.texture = grade;
    slot.rankIcon.tint = equipGradeColor(item.grade);
  }

  private showTooltip(slot: GearSlotView): void {
    const loadout = this.player?.getComponent(Loadout);
    const item = loadout ? itemForSlot(loadout, slot.kind) : undefined;
    const label = item ? itemLabel(item) : itemSlotLabel(slot.kind);
    const { x, y } = itemSlotPosition(slot.index, this.screenH);
    this.tooltip.show(label, x, y - 24);
  }
}

function itemLabel(item: Equip): string {
  return item.id.replace(/_/g, ' ');
}
