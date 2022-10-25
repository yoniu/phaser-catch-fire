/**
 * Phaser 配置项
 */

export const GameWidth = 800;
export const GameHeight = 800;
export const GameObject = {
  width: 64,
  height: 64,
  scale: 0.8
}

const CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GameWidth,
  height: GameHeight,
  backgroundColor: '#8C6346',
  parent: 'app',
  title: 'yoniu-catch-fire',
  version: '0.1.0',
};
export default CONFIG;
