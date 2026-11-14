import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { IN_COMBAT_TIME } from '../constants';
import { Stats } from './stats';
import { SafeArea } from './safeArea';
import { DamageNumber } from '../ui/damageNumber';
import { DamageNumberType } from '../ui/damageNumberType';
import { Sprite } from '../graphics/sprite';
import { ItemDropper } from '../items/itemDropper';
import type { Action } from '../actions/action';

export class Actor extends Component {
  lookDir = new Vector2(0, -1);
  moveDir = new Vector2(0, -1);
  alive = true;
  inCombat = false;
  combatTimer = 0;
  currentAction: Action | null = null;
  nextAction: Action | null = null;

  get busy(): boolean {
    return this.currentAction !== null && !this.currentAction.interruptible;
  }

  act(action: Action, force = false): void {
    if (force || this.currentAction === null || this.currentAction.interruptible) {
      this.startAction(action);
      return;
    }
    this.nextAction = action;
  }

  override update(dt = 0): void {
    this.updateCombat(dt);

    const stats = this.entity.getComponent(Stats);
    if (this.alive && stats && stats.hp <= 0) {
      this.alive = false;
      this.onDeath();
      return;
    }
    if (!this.alive) return;

    this.updateAction(dt);
  }

  private startAction(action: Action): void {
    this.currentAction = action;
    action.register(this.entity);
    action.start();
  }

  private updateCombat(dt: number): void {
    if (!this.inCombat) return;
    this.combatTimer -= dt;
    if (this.combatTimer <= 0) {
      this.inCombat = false;
      this.combatTimer = 0;
    }
  }

  private updateAction(dt: number): void {
    if (this.currentAction) {
      this.currentAction.update(dt);
      if (!this.currentAction.active) {
        this.currentAction = null;
      }
    }

    if (this.currentAction === null && this.nextAction) {
      const next = this.nextAction;
      this.nextAction = null;
      this.startAction(next);
    }
  }

  enterCombat(): void {
    this.inCombat = true;
    this.combatTimer = IN_COMBAT_TIME;
  }

  damage(amount: number, damageType: DamageNumberType = DamageNumberType.NORMAL): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    if (this.entity.getComponent(SafeArea)?.active) return;
    stats.addHp(-amount);
    this.spawnNumber(amount, damageType);
    if (stats.hp <= 0) {
      this.alive = false;
      this.onDeath();
    }
  }

  private onDeath(): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    const isPlayer = this.entity.getComponent(Sprite)?.frames['default']?.[0]?.includes('player');
    if (world && pos) {
      if (isPlayer) {
        world.createEntity([
          new Position(pos.x, pos.y),
          new Sprite({ default: ['assets/player/ghost.png'] }),
        ]);
      } else {
        world.createEntity([
          new Position(pos.x, pos.y),
          new Sprite({ default: ['assets/player/tombstone.png'] }),
        ]);
        const dropper = this.entity.getComponent(ItemDropper);
        if (dropper) {
          for (const item of dropper.getDropList()) {
            dropper.drop(item, pos);
          }
        }
      }
    }
    this.entity.remove();
  }

  damageHits(hits: Array<[number, boolean]>): void {
    const total = hits.reduce((sum, [amount]) => sum + amount, 0);
    const isCrit = hits.some(([, crit]) => crit);
    this.damage(total, isCrit ? DamageNumberType.CRIT : DamageNumberType.NORMAL);
  }

  private spawnNumber(amount: number, damageType: DamageNumberType): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    if (!world || !pos) return;
    world.createEntity([new Position(pos.x, pos.y), new DamageNumber(amount, damageType)]);
  }

  heal(amount: number): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    stats.addHp(amount);
  }

  healMp(amount: number): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    const before = stats.mp;
    stats.addMp(amount);
    const actual = Math.max(0, Math.round(stats.mp - before));
    if (actual > 0) this.spawnNumber(actual, DamageNumberType.MANA_RESTORE);
  }

  drainMp(amount: number): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    const before = stats.mp;
    stats.addMp(-amount);
    const actual = Math.max(0, Math.round(before - stats.mp));
    if (actual > 0) this.spawnNumber(actual, DamageNumberType.MANA);
  }
}
