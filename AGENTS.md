# AGENTS.md

## Project
- `definitely-a-game`: TypeScript port of [a-game-maybe](https://github.com/tehZevo/a-game-maybe) (Python/pygame top-down 2D action-RPG).
- Goal: run natively in the browser, deploy via GitHub Pages. No pygbag.
- The Python repo is the reference; read it via `gh api repos/tehZevo/a-game-maybe/...` (not vendored here).

## Stack
- Vite + TypeScript.
- Renderer: PixiJS v8 (use the WebGL renderer; WebGPU still experimental).
- Tests: Vitest.
- Live site: https://tehzevo.github.io/definitely-a-game/ (deployed from `master` via GitHub Actions).

## Git rules
- Default branch is `master` (NOT `main`).
- Commit author: `tehZevo <tehZevo@users.noreply.github.com>`.
- Never commit directly to `master` except the initial commit.
- All work: branch -> PR -> squash-merge into `master`.
- Every PR needs tests + green CI before merge.
- Never merge a change that breaks the build or the live site; `master` must always run.

## Build approach
- Build iteratively: one focused change per PR.
- First PR: scaffold (Vite + TS + PixiJS + Vitest) + GitHub Actions (test + deploy to Pages).
- Then port systems in order: ECS core -> renderer -> input/movement -> actors/stats -> skills/items -> world gen -> UI.
