import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import { Position } from '../../physics/position';
import { ParticleSystem } from '../../particles/particleSystem';
import { Particle, type FlipMode } from '../../particles/particle';
import { Vector2 } from '../../utils/vector';

const FLIP_OPTIONS: FlipMode[] = ['none', 'x', 'y', 'both'];

function randomFlip(): FlipMode {
  return FLIP_OPTIONS[Math.floor(Math.random() * FLIP_OPTIONS.length)];
}

function randomDirection(): Vector2 {
  const angle = Math.random() * Math.PI * 2;
  return new Vector2(Math.cos(angle), Math.sin(angle));
}

export class EmitParticles extends SkillEffect {
  constructor(
    public particlePath = 'assets/particles/fire.png',
    public minVel = 2,
    public maxVel = 3,
    public perTick = 10,
    public flip: FlipMode | 'random' = 'none',
    public particleLife = 0.25,
  ) {
    super();
  }

  override start(skill: Skill): unknown {
    const world = skill.entity.world;
    if (!world) return null;
    const pos = skill.entity.getComponent(Position);
    if (!pos) return null;

    const system = world.findComponent(ParticleSystem);
    if (!system) return null;

    const origin = new Vector2(pos.x + 0.5, pos.y + 0.5);
    for (let i = 0; i < this.perTick; i++) {
      const dir = randomDirection();
      const speed = this.minVel + Math.random() * (this.maxVel - this.minVel);
      const flip = this.flip === 'random' ? randomFlip() : this.flip;
      system.add(
        new Particle({
          path: this.particlePath,
          pos: origin,
          vel: dir.scale(speed),
          life: this.particleLife,
          flip,
        }),
      );
    }
    return null;
  }
}
