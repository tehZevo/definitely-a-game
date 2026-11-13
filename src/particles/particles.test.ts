import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Particle } from '../particles/particle';
import { ParticleSystem } from '../particles/particleSystem';
import { Vector2 } from '../utils/vector';
import { Skill } from '../skills/skill';
import { EmitParticles } from '../skills/effects/emitParticles';
import { Actor } from '../actor/actor';
import { Stats } from '../actor/stats';

describe('Particle', () => {
  it('moves with velocity', () => {
    const p = new Particle({
      path: 'assets/particles/fire.png',
      pos: new Vector2(0, 0),
      vel: new Vector2(10, 0),
      life: 1,
    });
    p.update(0.5);
    expect(p.pos.x).toBeCloseTo(5);
  });

  it('decrements life', () => {
    const p = new Particle({
      path: 'assets/particles/fire.png',
      pos: new Vector2(0, 0),
      life: 1,
    });
    p.update(0.3);
    expect(p.life).toBeCloseTo(0.7);
  });

  it('dies when life reaches 0', () => {
    const p = new Particle({
      path: 'assets/particles/fire.png',
      pos: new Vector2(0, 0),
      life: 0.5,
    });
    p.update(0.6);
    expect(p.alive).toBe(false);
  });

  it('progress goes from 0 to 1', () => {
    const p = new Particle({
      path: 'assets/particles/fire.png',
      pos: new Vector2(0, 0),
      life: 2,
    });
    expect(p.progress).toBe(0);
    p.update(1);
    expect(p.progress).toBeCloseTo(0.5);
  });
});

describe('ParticleSystem', () => {
  it('adds and updates particles', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new ParticleSystem()]);
    const system = entity.getComponent(ParticleSystem)!;
    system.add(new Particle({
      path: 'assets/particles/fire.png',
      pos: new Vector2(0, 0),
      vel: new Vector2(10, 0),
      life: 1,
    }));
    expect(system.particles.length).toBe(1);
    world.update(0.5);
    expect(system.particles[0].pos.x).toBeCloseTo(5);
  });

  it('removes dead particles', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new ParticleSystem()]);
    const system = entity.getComponent(ParticleSystem)!;
    system.add(new Particle({
      path: 'assets/particles/fire.png',
      pos: new Vector2(0, 0),
      life: 0.1,
    }));
    world.update(0.2);
    expect(system.particles.length).toBe(0);
  });
});

describe('EmitParticles', () => {
  it('adds particles to system', () => {
    const world = new World();
    const systemEntity = world.createEntity([new Position(0, 0), new ParticleSystem()]);
    const user = world.createEntity([
      new Position(5, 5),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(10, 10),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const effect = new EmitParticles('assets/particles/fire.png', 2, 3, 5, 'none', 0.25);
    const skill = new Skill(effect, user, undefined, target);
    world.createEntity([new Position(5, 5), skill]);
    world.update(0);
    const system = systemEntity.getComponent(ParticleSystem)!;
    expect(system.particles.length).toBe(5);
  });

  it('does nothing without ParticleSystem', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(1, 1),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const effect = new EmitParticles();
    const skill = new Skill(effect, user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    expect(() => world.update(0)).not.toThrow();
  });
});
