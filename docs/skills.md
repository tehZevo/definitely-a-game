# Skills

Skills are defined as data and executed as short-lived entities in the world.

## `SkillDef`

`src/skills/skillDef.ts` is the static definition of a skill.

Fields:

- `id`: stable skill identifier.
- `effects`: one or more `SkillEffect` instances.
- `isAttack`: whether the skill counts as an attack.
- `rank`: skill rank.
- `cooldown`: optional cooldown.
- `mpCost`: MP cost.
- `hpCost`: HP cost.
- `useTime`: base use time before weapon speed adjustments.
- `slot`: optional skill slot.
- `icon`: primary icon path.
- `miniIcon`: optional smaller icon path.
- `description`: human-readable description.

## `SkillEffect`

`src/skills/effects/skillEffect.ts` is the base class for individual skill behaviors.

Responsibilities:

- Holds child effects.
- Holds a multiplier.
- Holds a success flag.
- Provides `start`, `update`, and `remove` hooks.
- Spawns child effects when the effect succeeds.

Common effect types:

- `SectorTarget`
- `CircleTarget`
- `SelfTarget`
- `Damage`
- `HpMp`
- `Push`
- `Projectile`
- `ApplyBuff`
- `Sequence`

## `Skill`

`src/skills/skill.ts` is a runtime component attached to a short-lived entity.

Responsibilities:

- Stores the active `SkillEffect`.
- Stores the user and optional parent skill.
- Stores the current target.
- Stores the effective multiplier and success state.
- Starts the effect.
- Updates the effect each frame.
- Removes the entity and calls `remove()` when the effect completes.

## Skill use

`src/skills/useSkill.ts` creates the runtime skill entity.

`src/actions/useSkill.ts` wraps skill use as an actor action. It drains MP and HP,
starts the skill effect, and ends when the skill completes.

## Skill slots

`src/skills/skillSlot.ts` defines skill slots and key bindings.

`src/skills/skillSlots.ts` stores the skills assigned to an actor's skill slots.
`PlayerController` checks pressed skill slot keys and uses the matching skill.

## Skill use time

`src/skills/skillUseTime.ts` calculates the actual attack cooldown from the skill's
`useTime` and the equipped weapon's attack speed.
