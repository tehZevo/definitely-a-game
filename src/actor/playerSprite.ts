import { Sprite } from '../graphics/sprite';

export const PLAYER_SPAWN_ANIMATION = 'focus';

export function createPlayerSprite(facePaths: string[]): Sprite {
  return new Sprite(
    {
      idle: facePaths,
      walk: facePaths,
      focus: facePaths,
    },
    PLAYER_SPAWN_ANIMATION,
  );
}
