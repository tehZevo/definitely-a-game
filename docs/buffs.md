# Buffs

Buffs are timed effects applied to actors. They are defined as data and tracked as runtime
instances.

## `BuffDef`

`src/buffs/buffDef.ts` is the static definition of a buff.

Fields:

- `id`: stable buff identifier.
- `effects`: one or more `BuffEffect` instances.
- `icon`: optional icon path.

## `BuffEffect`

`src/buffs/buffEffect.ts` is the base class for buff behavior.

Responsibilities:

- `apply(buff)` creates initial effect state.
- `update(buff, state)` updates and returns effect state.
- `remove(buff, state)` cleans up effect state.

Buff effects are stateless. Any state they need is returned from `apply`, passed back into
`update`, and returned again for later calls.

## `Buff`

`src/buffs/buff.ts` is a runtime instance of a `BuffDef`.

Fields:

- `buffdef`: the buff definition being applied.
- `power`: the buff power used when applied.
- `initialTime`: the buff duration.
- `time`: remaining duration.
- `target`: the actor receiving the buff.
- `caster`: the actor that applied the buff.
- `effectStates`: per-effect state returned by each `BuffEffect`.

Responsibilities:

- Applies the buff effects.
- Ticks down duration.
- Updates each effect.
- Removes expired effects.

## `Buffs`

`src/buffs/buffs.ts` is the component that stores an actor's active buffs.

Responsibilities:

- Stores one active `Buff` per `BuffDef`.
- Decides whether a new buff should replace an existing buff.
- Applies new buffs when they are stronger or last longer.
- Updates active buffs each frame.
- Removes expired buffs.
- Marks itself dirty when the buff list changes.

## Replacement rules

A new buff replaces an existing buff when:

- There is no existing buff.
- The new buff has higher power.
- The new buff has equal power and longer remaining time.

Otherwise the new buff is ignored.
