import { Container } from 'pixi.js';
import { BitmapText } from './bitmapText';
import type { Entity } from '../ecs';
import { Stats } from '../actor/stats';
import { DEFAULT_KEY_MAP } from '../core/keyMap';
import { Screen } from './screen';
import type { UIManager } from './uiManager';

export interface StatsScreenColumns {
  left: string[];
  right: string[];
}

export function statsScreenColumns(player: Entity): StatsScreenColumns {
  const stats = player.getComponent(Stats);
  if (!stats) return { left: [], right: [] };
  const s = stats.calculated.secondary;
  const e = stats.calculated.equip;
  const p = stats.calculated.primary;

  return {
    left: [
      'Equip:',
      `PATT: ${e.PATT}`,
      `MATT: ${e.MATT}`,
      `PDEF: ${e.PDEF}`,
      `MDEF: ${e.MDEF}`,
      '',
      'Primary:',
      `STR: ${p.STR}`,
      `VIT: ${p.VIT}`,
      `DEX: ${p.DEX}`,
      `AGI: ${p.AGI}`,
      `INT: ${p.INT}`,
      `WIS: ${p.WIS}`,
    ],
    right: [
      'Secondary:',
      `HP: ${s.hp}`,
      `MP: ${s.mp}`,
      `Phys. Att.: ${s.physAtt}`,
      `Mag. Att.: ${s.magAtt}`,
      `Phys. Def.: ${s.physDef}`,
      `Mag. Def.: ${s.magDef}`,
      `Acc.: ${s.accuracy}`,
      `Eva.: ${s.evasion}`,
      `Move Spd: ${s.moveSpeed}`,
      `Crit: ${s.critical}`,
    ],
  };
}

export function statsScreenLines(player: Entity): string[] {
  return statsScreenColumns(player).right;
}

export class StatsScreen extends Screen {
  container = new Container();
  text: BitmapText;
  rightText: BitmapText;

  constructor(player: Entity, uiManager: UIManager) {
    super();
    this.uiManager = uiManager;
    const columns = statsScreenColumns(player);
    this.text = new BitmapText({
      text: columns.left.join('\n'),
      style: { fontSize: 8, fill: 0xffffff },
    });
    this.rightText = new BitmapText({
      text: columns.right.join('\n'),
      style: { fontSize: 8, fill: 0xffffff },
    });
    this.rightText.x = 112;
    this.container.addChild(this.text);
    this.container.addChild(this.rightText);
    this.container.x = 32;
    this.container.y = 32;
    this.container.zIndex = 900;
    this.container.eventMode = 'none';
  }

  override handleKeys(keys: Set<string>): void {
    if (keys.has(DEFAULT_KEY_MAP.confirm) || keys.has(DEFAULT_KEY_MAP.cancel)) {
      this.uiManager?.pop();
    }
  }

  override onDestroy(): void {
    this.container.destroy({ children: true });
  }
}
