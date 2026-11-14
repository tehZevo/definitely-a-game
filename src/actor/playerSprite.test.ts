import { describe, it, expect } from 'vitest';
import { createPlayerSprite, PLAYER_SPAWN_ANIMATION } from './playerSprite';

describe('createPlayerSprite', () => {
  it('spawns players in the focus animation', () => {
    const sprite = createPlayerSprite(['assets/player/idle_down_body.png']);
    expect(sprite.current).toBe(PLAYER_SPAWN_ANIMATION);
    expect(sprite.frames.focus).toEqual(['assets/player/idle_down_body.png']);
  });
});
