import { describe, expect, it } from 'vitest';
import { TextField } from './textField';

describe('TextField', () => {
  it('renders the visible tail with a cursor', () => {
    const field = new TextField(() => {}, 'hello world', 5);
    expect(field.displayValue()).toBe('world_');
  });

  it('updates the rendered value when keys are handled', () => {
    const field = new TextField(() => {}, 'hello', 10);
    field.handleKeys(new Set(['Backspace']));
    expect(field.displayValue()).toBe('hell_');
  });

  it('submits the current text on Enter', () => {
    const submitted: string[] = [];
    const field = new TextField((text) => submitted.push(text), 'zevo', 10);
    field.handleKeys(new Set(['Enter']));
    expect(submitted).toEqual(['zevo']);
  });
});
