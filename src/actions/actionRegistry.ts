import { Action } from './action';
import { Move } from './move';
import { UseSkill } from './useSkill';
import { Attack } from './attack';
import { Interact } from './interact';
import { Vector2 } from '../utils/vector';
import { getSkill } from '../data/registry';

const actionRegistry: Record<string, (data: Record<string, unknown>) => Action> = {
  Move: (data) => {
    const dir = data.dir as { x: number; y: number } | null;
    return new Move(dir ? new Vector2(dir.x, dir.y) : null);
  },
  UseSkill: (data) => {
    const skilldef = getSkill(data.skilldef as string);
    if (!skilldef) throw new Error(`Unknown skill: ${data.skilldef}`);
    return new UseSkill(skilldef);
  },
  Attack: () => new Attack(),
  Interact: () => new Interact(),
};

export function getActionRegistry(): Record<string, (data: Record<string, unknown>) => Action> {
  return actionRegistry;
}

export function deserializeAction(type: string, data: Record<string, unknown>): Action {
  const factory = actionRegistry[type];
  if (!factory) throw new Error(`Unknown action type: ${type}`);
  return factory(data);
}
