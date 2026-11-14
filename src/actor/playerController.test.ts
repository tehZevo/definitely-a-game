import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Physics } from '../physics/physics';
import { FakeInput } from '../core/input';
import { PlayerController } from './playerController';
import { PLAYER_MOVE_SPEED, PLAYER_MOVE_SPEED_SCALE, TILE_SIZE } from '../constants';
import { Actor } from './actor';
import { Stats } from './stats';
import { Sprite } from '../graphics/sprite';
import { Equips } from '../items/equips';
import { Skill } from '../actor/skill';
import { SkillSlot, SKILL_SLOT_KEYS } from '../skills/skillSlot';
import { SkillSlots } from '../skills/skillSlots';
import { woodenLongsword } from '../data/items/weapons';
import { defaultAttack } from '../data/skills/defaultAttack';

describe('PlayerController', () => {
  it('uses the Python physics terminal move speed', () => {
    expect(new PlayerController(new FakeInput(0, 0)).speed).toBe(
      PLAYER_MOVE_SPEED * PLAYER_MOVE_SPEED_SCALE * TILE_SIZE,
    );
  });

  it('moves by speed along the input axis', () => {
    const world = new World();
    const pos = new Position(0, 0);
    const ctrl = new PlayerController(new FakeInput(1, 0));
    world.createEntity([pos, ctrl, new Actor(), new Physics()]);
    world.update(1);
    expect(pos.x).toBeCloseTo(ctrl.speed);
    expect(pos.y).toBeCloseTo(0);
  });

  it('normalizes diagonal so it is not faster', () => {
    const world = new World();
    const pos = new Position(0, 0);
    const ctrl = new PlayerController(new FakeInput(1, 1));
    world.createEntity([pos, ctrl, new Actor(), new Physics()]);
    world.update(1);
    expect(Math.hypot(pos.x, pos.y)).toBeCloseTo(ctrl.speed);
  });

  it('does not move with no input', () => {
    const world = new World();
    const pos = new Position(5, 7);
    world.createEntity([pos, new PlayerController(new FakeInput(0, 0)), new Actor(), new Physics()]);
    world.update(1);
    expect(pos.x).toBe(5);
    expect(pos.y).toBe(7);
  });

  it('sets walk animation while moving', () => {
    const world = new World();
    const sprite = new Sprite({ idle: ['i.png'], walk: ['w.png'] }, 'idle');
    world.createEntity([
      new Position(0, 0),
      new PlayerController(new FakeInput(1, 0)),
      new Actor(),
      new Physics(),
      sprite,
    ]);
    world.update(1);
    expect(sprite.current).toBe('walk');
  });

  it('sets idle animation when not moving', () => {
    const world = new World();
    const sprite = new Sprite({ idle: ['i.png'], walk: ['w.png'] }, 'walk');
    world.createEntity([
      new Position(0, 0),
      new PlayerController(new FakeInput(0, 0)),
      new Actor(),
      new Physics(),
      sprite,
    ]);
    world.update(1);
    expect(sprite.current).toBe('idle');
  });

  it('uses the equipped weapon speed for attack cooldowns', () => {
    const world = new World();
    const equips = new Equips();
    equips.equipWeapon(woodenLongsword);
    const controller = new PlayerController(new FakeInput(0, 0, true), defaultAttack);
    world.createEntity([new Position(0, 0), controller, new Actor(), new Physics(), new Stats(100, 100, 100, 100), equips]);

    world.update(0.1);

    expect((controller as unknown as { attackTimer: number }).attackTimer).toBeCloseTo(0.55);
  });

  it('uses the skill assigned to a pressed skill slot key', () => {
    const world = new World();
    const slots = new SkillSlots({ [SkillSlot.ALPHA]: defaultAttack });
    const controller = new PlayerController(new FakeInput(0, 0, false, [SKILL_SLOT_KEYS[SkillSlot.ALPHA]]));
    world.createEntity([new Position(0, 0), controller, new Actor(), new Physics(), new Stats(100, 100, 100, 100), slots]);

    world.update(0.1);

    expect(world.find(Skill).length).toBe(1);
  });
});
