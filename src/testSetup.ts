import { Texture } from 'pixi.js';
import { setBitmapFontTextures } from './ui/bitmapText';

setBitmapFontTextures(Array.from({ length: 256 }, () => Texture.EMPTY));
