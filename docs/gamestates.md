# Game States

The TypeScript client uses a small state machine to separate app-level screens from
in-game play.

## `Game`

`src/core/game.ts` owns the active state and the current world.

Responsibilities:

- Stores the active `GameState` in `currentState`.
- Calls `exit()` on the old state and `enter()` on the new state in `setState()`.
- Updates the world and active state from the app loop.
- Stores the current `PlayerProfile` and `ClientConfig`.
- Routes map transitions through `transition()` and `onTransition`.
- Prevents overlapping transitions with an internal `transitioning` flag.

## `GameState`

`src/core/gameState.ts` is the abstract contract for every screen.

```ts
abstract enter(app: Application, world: World, worldLayer: Container): void;
abstract update(dt: number): void;
abstract exit(): void;
```

States are responsible for creating and destroying their own Pixi containers.

## `MainMenuState`

`src/core/mainMenuState.ts` is the first screen shown by `src/main.ts`.

Responsibilities:

- Shows the title and start options.
- Starts a saved profile when one exists.
- Opens `CharCreateState` when no saved profile exists.
- Can skip character creation and start with the default face.

## `CharCreateState`

`src/core/charCreateState.ts` is the character creator screen.

Responsibilities:

- Lets the player choose face options.
- Lets the player set the character name.
- Builds a `PlayerProfile` from the selected face and name.
- Confirms the profile back to `main.ts`, which starts the game and saves it.

## `PlayState`

`src/core/playState.ts` is the active gameplay screen.

Responsibilities:

- Holds the per-frame update callback installed by `main.ts`.
- Runs world updates, sprite updates, damage numbers, HUD, joystick, camera, and profile saving.
- Clears its update callback when exited.

## Map transitions

`GameMaster` is the world component that knows the current `MapDef` and `Game`.

When the player uses stairs:

1. `Stairs` finds the `GameMaster` component.
2. `GameMaster.transition()` calls `Game.transition()`.
3. `Game.transition()` calls the `onTransition` callback installed by `main.ts`.
4. `main.ts` starts a new world and installs a new `PlayState`.
