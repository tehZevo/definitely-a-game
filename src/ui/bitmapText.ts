import { Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { assetUrl } from '../assets';

const GLYPH_SIZE = 8;
const GRID = 16;

let glyphs: Texture[] | null = null;

export async function preloadBitmapFont(): Promise<void> {
  if (glyphs) return;
  const tex = await Assets.load<Texture>(assetUrl('assets/ui/font.png'));
  tex.source.scaleMode = 'nearest';
  const list: Texture[] = [];
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      list.push(
        new Texture({
          source: tex.source,
          frame: new Rectangle(col * GLYPH_SIZE, row * GLYPH_SIZE, GLYPH_SIZE, GLYPH_SIZE),
        }),
      );
    }
  }
  glyphs = list;
}

export function setBitmapFontTextures(list: Texture[]): void {
  glyphs = list;
}

export function glyphTexture(char: string): Texture {
  if (!glyphs) throw new Error('Bitmap font not loaded; call preloadBitmapFont() first');
  const code = Math.min(255, char.charCodeAt(0) || 32);
  return glyphs[Math.floor(code / GRID) * GRID + (code % GRID)];
}

export interface BitmapTextStyle {
  fontSize?: number;
  fill?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
}

export class BitmapText extends Container {
  private _text: string;
  private _fontSize: number;
  private _fill: number;
  private _wordWrap: boolean;
  private _wordWrapWidth: number;
  private _anchorX = 0;
  private _anchorY = 0;
  private readonly content = new Container();

  constructor(opts: { text?: string; style?: BitmapTextStyle } = {}) {
    super();
    this._text = opts.text ?? '';
    this._fontSize = opts.style?.fontSize ?? 8;
    this._fill = opts.style?.fill ?? 0xffffff;
    this._wordWrap = opts.style?.wordWrap ?? false;
    this._wordWrapWidth = opts.style?.wordWrapWidth ?? 0;
    this.addChild(this.content);
    this.layout();
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this.layout();
  }

  get fill(): number {
    return this._fill;
  }

  set fill(value: number) {
    this._fill = value;
    this.layout();
  }

  get tint(): number {
    return this._fill;
  }

  set tint(value: number) {
    this._fill = value;
    this.layout();
  }

  get fontSize(): number {
    return this._fontSize;
  }

  set fontSize(value: number) {
    this._fontSize = value;
    this.layout();
  }

  get anchor(): { x: number; y: number; set: (x: number, y?: number) => void } {
    return {
      x: this._anchorX,
      y: this._anchorY,
      set: (x: number, y?: number) => {
        this._anchorX = x;
        this._anchorY = y ?? x;
        this.layout();
      },
    };
  }

  get width(): number {
    const lines = this.wrapLines(this._text, this.glyphScale);
    return Math.max(0, ...lines.map((line) => line.length * GLYPH_SIZE * this.glyphScale));
  }

  get height(): number {
    const lines = this.wrapLines(this._text, this.glyphScale);
    return lines.length * GLYPH_SIZE * this.glyphScale;
  }

  private get glyphScale(): number {
    return Math.max(1, Math.round(this._fontSize / GLYPH_SIZE));
  }

  private wrapLines(text: string, s: number): string[] {
    const source = text.split('\n');
    if (!this._wordWrap || this._wordWrapWidth <= 0) return source;
    const maxChars = Math.max(1, Math.floor(this._wordWrapWidth / (GLYPH_SIZE * s)));
    const out: string[] = [];
    for (const line of source) {
      let current = '';
      for (const word of line.split(' ')) {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > maxChars && current) {
          out.push(current);
          current = word;
        } else {
          current = candidate;
        }
      }
      out.push(current);
    }
    return out;
  }

  private layout(): void {
    this.content.removeChildren();
    const s = this.glyphScale;
    const lines = this.wrapLines(this._text, s);
    const maxWidth = Math.max(0, ...lines.map((line) => line.length * GLYPH_SIZE * s));
    const totalHeight = lines.length * GLYPH_SIZE * s;
    lines.forEach((line, lineIndex) => {
      const lineWidth = line.length * GLYPH_SIZE * s;
      const lineOffsetX = (maxWidth - lineWidth) / 2;
      for (let i = 0; i < line.length; i++) {
        const sprite = new Sprite(glyphTexture(line[i]));
        sprite.scale.set(s);
        sprite.tint = this._fill;
        sprite.x = lineOffsetX + i * GLYPH_SIZE * s;
        sprite.y = lineIndex * GLYPH_SIZE * s;
        this.content.addChild(sprite);
      }
    });
    this.content.x = -maxWidth * this._anchorX;
    this.content.y = -totalHeight * this._anchorY;
  }
}
