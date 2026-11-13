import { Target } from './target';
import type { SkillEffect } from './skillEffect';
import { TargetType } from '../targetType';
import { distanceFilter, teamFilter } from '../targetFilters';

export class CircleTarget extends Target {
  constructor(
    targetType: TargetType,
    radius = 32,
    maxTargets = 1,
    children: SkillEffect | SkillEffect[] = [],
  ) {
    super([distanceFilter(radius), teamFilter(targetType)], maxTargets, children);
  }
}
