import { Application, Graphics } from 'pixi.js';

async function boot(): Promise<void> {
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });
  document.getElementById('app')?.appendChild(app.canvas);

  const square = new Graphics().rect(50, 50, 100, 100).fill(0xffffff);
  app.stage.addChild(square);
}

void boot();
