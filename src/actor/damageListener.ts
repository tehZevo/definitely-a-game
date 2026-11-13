export abstract class DamageListener {
  abstract onDamage(attacker: import('../ecs').Entity, amount: number): void;
}
