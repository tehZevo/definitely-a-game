import { describe, expect, it } from 'vitest';
import { BitmapText } from './bitmapText';

describe('BitmapText', () => {
  it('renders one sprite per character at the scaled glyph size', () => {
    const text = new BitmapText({ text: 'Hi', style: { fontSize: 16 } });

    expect(text.text).toBe('Hi');
    expect(text.width).toBe(2 * 8 * 2);
    expect(text.height).toBe(8 * 2);
  });

  it('updates sprites when the text changes', () => {
    const text = new BitmapText({ text: 'Hi', style: { fontSize: 8 } });
    text.text = 'Hey!';

    expect(text.width).toBe(4 * 8);
  });

  it('lays out newline-separated lines vertically', () => {
    const text = new BitmapText({ text: 'A\nB\nC', style: { fontSize: 8 } });

    expect(text.height).toBe(3 * 8);
  });

  it('wraps words to the configured width', () => {
    const text = new BitmapText({
      text: 'alpha beta gamma',
      style: { fontSize: 8, wordWrap: true, wordWrapWidth: 16 },
    });

    expect(text.height).toBeGreaterThan(2 * 8);
  });

  it('applies the anchor to the content offset', () => {
    const text = new BitmapText({ text: 'AB', style: { fontSize: 8 } });
    text.anchor.set(0.5);

    expect(text.getChildAt(0).x).toBeCloseTo(-8);
  });
});
