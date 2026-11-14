import { Target } from './target';
import type { SkillEffect } from './skillEffect';
import { TargetType } from '../targetType';
import { distanceFilter, teamFilter, angleFilter } from '../targetFilters';

export class SectorTarget extends Target {
  constructor(
    targetType: TargetType,
    angle = 360,
    radius = 32,
    maxTargets = 1,
    children: SkillEffect | SkillEffect[] = [],
    multiplier = 1,
  ) {
    super(
      [distanceFilter(radius), teamFilter(targetType), angleFilter(angle)],
      maxTargets,
      children,
      multiplier,
    );
  }
}
