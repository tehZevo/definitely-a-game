import { Container, Text } from 'pixi.js';
import type { Entity } from '../ecs';
import { Stats } from '../actor/stats';
import { DEFAULT_KEY_MAP } from '../core/keyMap';
import { Screen } from './screen';
import type { UIManager } from './uiManager';

export function statsScreenLines(player: Entity): string[] {
  const stats = player.getComponent(Stats);
  if (!stats) return [];
  const base = stats.baseSnapshot();
  const current = stats.snapshot();

  return [
    'Base:',
    `HP: ${base.hp}/${base.maxHp}`,
    `MP: ${base.mp}/${base.maxMp}`,
    `Phys. Att.: ${base.physAtt}`,
    `Phys. Def.: ${base.physDef}`,
    `Mag. Att.: ${base.magAtt}`,
    `Mag. Def.: ${base.magDef}`,
    `Crit: ${base.critical}`,
    '',
    'Current:',
    `HP: ${current.hp}/${current.maxHp}`,
    `MP: ${current.mp}/${current.maxMp}`,
    `Phys. Att.: ${current.physAtt}`,
    `Phys. Def.: ${current.physDef}`,
    `Mag. Att.: ${current.magAtt}`,
    `Mag. Def.: ${current.magDef}`,
    `Crit: ${current.critical}`,
  ];
}

export class StatsScreen extends Screen {
  container = new Container();
  text: Text;

  constructor(player: Entity, uiManager: UIManager) {
    super();
    this.uiManager = uiManager;
    this.text = new Text({
      text: statsScreenLines(player).join('\n'),
      style: {
        fontFamily: 'monospace',
        fontSize: 10,
        fill: 0xffffff,
      },
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
