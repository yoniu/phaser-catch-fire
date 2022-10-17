import CONFIG from "../consts/config";

/**
 * 开始游戏场景
 */
export default class Index extends Phaser.Scene {

  constructor() {
    super('Index');
  }

  preload() {

  }

  create() {
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) / 2, "please keydown [ENTER]")
            .setOrigin(0.5, 0.5)
  }

  update(): void {
      
  }

}