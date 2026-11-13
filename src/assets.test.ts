import { describe, it, expect } from 'vitest';
import { assetUrl } from './assets';

describe('assetUrl', () => {
  it('prefixes the base url', () => {
    expect(assetUrl('assets/player/idle_down_body.png')).toBe(
      `${import.meta.env.BASE_URL}assets/player/idle_down_body.png`,
    );
  });

  it('strips leading slashes', () => {
    expect(assetUrl('/foo.png')).toBe(`${import.meta.env.BASE_URL}foo.png`);
  });
});
