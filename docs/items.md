# Items

Items are data definitions used by the world and by actors. They are not entities by
themselves; entities can reference item definitions through components such as `Equips`,
`Chest`, and dropped item components.

## `ItemDef`

`src/items/itemDef.ts` is the base item definition.

Fields:

- `id`: stable identifier for the item.
- `icon`: primary icon path.
- `miniIcon`: optional smaller icon path.
- `rarity`: item rarity.
- `description`: human-readable description.

`ItemDef.calcDropRate()` combines the base drop rate with the rarity drop rate.

## Item categories

The TypeScript port currently models these item categories:

- `Weapon` in `src/items/weapon.ts`
- `Armor` in `src/items/armor.ts`
- `SkillItem` in `src/items/skillItem.ts`

## `Equip`

`src/items/equip.ts` is the shared base for equippable items.

Fields:

- `grade`: equip grade (`E`, `D`, `C`, `B`, `A`, `S`, `SS`, or `UNKNOWN`).
- `stats`: raw equip stats such as HP, MP, physical attack, physical defense, magic attack,
  and magic defense.

`Weapon` and `Armor` extend `Equip` and add slot information.

## `Weapon`

`src/items/weapon.ts` represents weapons.

Responsibilities:

- Stores the `weaponType`.
- Derives the weapon slot from the weapon type.
- Participates in equip stat calculation and skill use time calculation.

## `Armor`

`src/items/armor.ts` represents armor.

Responsibilities:

- Stores the `armorSlot`.
- Participates in equip stat calculation.

## `Equips`

`src/items/equips.ts` stores the weapons and armor currently equipped by an actor.

Responsibilities:

- Stores equipped weapons by weapon slot.
- Stores equipped armor by armor slot.
- Loads and saves equipped item definitions.
- Triggers stat recalculation when equipment changes.

## Equip stat calculation

`src/items/equipStatsCalculator.ts` converts base stats plus equipped items into the
actor's current stats.

The calculation uses:

- Part multipliers for weapon and armor slots.
- Grade multipliers for equip grades.
- Scaled equip stats summed across all equipped items.
