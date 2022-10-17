/**
 * Phaser 配置项
 */

export const GameWidth = 800;
export const GameHeight = 600;

const CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  title: 'yoniu-catch-fire',
  version: '0.1.0',
};
export default CONFIG;
