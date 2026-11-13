import { Assets, Texture } from 'pixi.js';
import { assetUrl } from '../assets';

const cache = new Map<string, Texture>();

export async function loadImage(path: string): Promise<Texture> {
  const url = assetUrl(path);
  if (cache.has(url)) return cache.get(url)!;
  const texture = await Assets.load<Texture>(url);
  texture.source.scaleMode = 'nearest';
  cache.set(url, texture);
  return texture;
}

export function getCachedImage(path: string): Texture | undefined {
  return cache.get(assetUrl(path));
}

export function clearImageCache(): void {
  cache.clear();
}
