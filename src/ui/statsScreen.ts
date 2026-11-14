import { Container } from 'pixi.js';
import { BitmapText } from './bitmapText';
import type { Entity } from '../ecs';
import { Stats } from '../actor/stats';
import { DEFAULT_KEY_MAP } from '../core/keyMap';
import { Screen } from './screen';
import type { UIManager } from './uiManager';

export function statsScreenLines(player: Entity): string[] {
  const stats = player.getComponent(Stats);
  if (!stats) return [];
  const s = stats.calculated.secondary;

  return [
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
  ];
}

export class StatsScreen extends Screen {
  container = new Container();
  text: BitmapText;

  constructor(player: Entity, uiManager: UIManager) {
    super();
    this.uiManager = uiManager;
    this.text = new BitmapText({
      text: statsScreenLines(player).join('\n'),
      style: { fontSize: 8, fill: 0xffffff },
    });
    this.container.addChild(this.text);
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
