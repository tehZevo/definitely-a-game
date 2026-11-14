import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Skill } from '../../actor/skill';
import { ParticleSystem } from '../../particles/particleSystem';
import { EmitParticles } from './emitParticles';

describe('EmitParticles', () => {
  it('passes palette to emitted particles', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(50, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const systemEntity = world.createEntity([new Position(0, 0), new ParticleSystem()]);
    const skill = new Skill(new EmitParticles('assets/particles/fire.png', 2, 3, 1, 'none', 0.25, 'ember'), user);
    world.createEntity([new Position(0, 0), skill]);

    world.update(0);

    const system = systemEntity.getComponent(ParticleSystem)!;
    expect(system.particles).toHaveLength(1);
    expect(system.particles[0].palette).toBe('ember');
  });
});
