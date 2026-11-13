import { Component } from '../ecs';
import { Particle } from './particle';
import { DT } from '../constants';

export class ParticleSystem extends Component {
  particles: Particle[] = [];

  add(particle: Particle): void {
    this.particles.push(particle);
  }

  override update(dt = DT): void {
    for (const p of this.particles) {
      p.update(dt);
    }
    this.particles = this.particles.filter((p) => p.alive);
  }
}
