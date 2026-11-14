import { describe, it, expect } from 'vitest';
import {
  BUFF_ICON_SPACING,
  buffIconPosition,
  buffTimeRemaining,
  buffTimerFrameCount,
  buffTimerFrameIndex,
} from './buffIcons';
import { Buff } from '../buffs/buff';
import { healOverTimeBuff } from '../buffs/data/healOverTimeBuff';
import { Entity } from '../ecs';

describe('buffTimerFrameIndex', () => {
  const frames = buffTimerFrameCount(232);

  it('splits the timer sheet into 8px frames', () => {
    expect(frames).toBe(29);
  });

  it('shows the full frame at the start of a buff', () => {
    expect(buffTimerFrameIndex(1, frames)).toBe(0);
  });

  it('shows the empty frame once a buff has run out', () => {
    expect(buffTimerFrameIndex(0, frames)).toBe(frames - 1);
  });

  it('advances halfway through the buff duration', () => {
    expect(buffTimerFrameIndex(0.5, frames)).toBe(14);
  });

  it('clamps out of range durations', () => {
    expect(buffTimerFrameIndex(1.5, frames)).toBe(0);
    expect(buffTimerFrameIndex(-1, frames)).toBe(frames - 1);
  });
});

describe('buffTimeRemaining', () => {
  it('is the ratio of remaining to initial time', () => {
    const buff = new Buff(healOverTimeBuff, 1, 10, new Entity(), new Entity());
    buff.time = 5;
    expect(buffTimeRemaining(buff)).toBe(0.5);
  });

  it('is zero for zero-length buffs', () => {
    const buff = new Buff(healOverTimeBuff, 1, 0, new Entity(), new Entity());
    expect(buffTimeRemaining(buff)).toBe(0);
  });
});

describe('buffIconPosition', () => {
  it('lays buffs out in a single row with a 1px gap', () => {
    expect(buffIconPosition(0)).toEqual({ x: 32, y: 32 });
    expect(buffIconPosition(1)).toEqual({ x: 32 + BUFF_ICON_SPACING, y: 32 });
  });
});
