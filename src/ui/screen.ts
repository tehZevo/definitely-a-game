import type { Container } from 'pixi.js';
import { Component } from '../ecs';
import type { UIManager } from './uiManager';

export class Screen extends Component {
  uiManager: UIManager | null = null;
  container: Container | null = null;

  handleKeys(_keys: Set<string>): void {
    void _keys;
  }
}
