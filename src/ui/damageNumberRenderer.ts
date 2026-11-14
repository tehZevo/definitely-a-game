import { Container } from 'pixi.js';
import { BitmapText } from './bitmapText';
import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { DamageNumber, DAMAGE_NUMBER_TIME } from './damageNumber';
import { damageNumberColor } from './damageNumberType';

export class DamageNumberRenderer {
  private views = new Map<Entity, BitmapText>();

  constructor(private stage: Container) {}

  update(world: World): void {
    for (const entity of world.find(DamageNumber)) {
      const comp = entity.getComponent(DamageNumber);
      const pos = entity.getComponent(Position);
      if (!comp || !pos) continue;
      let text = this.views.get(entity);
      if (!text) {
        text = new BitmapText({
          text: comp.number,
          style: { fontSize: 16 },
        });
        this.views.set(entity, text);
        this.stage.addChild(text);
      }
      text.text = comp.number;
      text.x = Math.round(pos.x);
      text.y = Math.round(pos.y);
      text.alpha = comp.delay > 0 ? 0 : Math.max(0, 1 - comp.time / DAMAGE_NUMBER_TIME);
      text.tint = damageNumberColor(comp.damageType);
    }
    const dead: Entity[] = [];
    for (const [entity, text] of this.views) {
      if (!entity.alive) {
        text.destroy();
        dead.push(entity);
      }
    }
    for (const e of dead) this.views.delete(e);
  }
}
