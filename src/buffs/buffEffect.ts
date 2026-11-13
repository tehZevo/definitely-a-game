import type { Buff } from './buff';

export class BuffEffect {
  apply(buff: Buff): unknown {
    void buff;
    return null;
  }

  update(buff: Buff, state: unknown): unknown {
    void buff;
    return state;
  }

  remove(buff: Buff, state: unknown): void {
    void buff;
    void state;
  }
}
