import { describe, expect, it } from 'vitest';
import { Carousel } from './carousel';

describe('Carousel', () => {
  it('shows the selected label', () => {
    const carousel = new Carousel(['alpha', 'beta'], 1);
    expect(carousel.displayValue()).toBe('beta');
  });

  it('wraps selection and updates the displayed value', () => {
    const carousel = new Carousel(['a', 'bb', 'ccc'], 2);
    carousel.handleKeys(new Set(['ArrowRight']));
    expect(carousel.selection).toBe(0);
    expect(carousel.displayValue()).toBe('a');
  });

  it('truncates labels to the carousel size', () => {
    const carousel = new Carousel(['abcdef'], 0, 3);
    expect(carousel.displayValue()).toBe('abc');
  });
});
