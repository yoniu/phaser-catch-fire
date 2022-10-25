/**
 * 开始游戏场景
 */

import CONFIG from "../consts/config";

export default class Index extends Phaser.Scene {
  private inputKey?: Phaser.Input.Keyboard.Key
  
  constructor() {
    super('Index');
  }

  create() {
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) / 2, "please keydown [ENTER]")
            .setOrigin(0.5, 0.5)

    this.inputKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    
  }

  update(): void {
    if(this.inputKey?.isDown) 
      this.scene.start('Play')
  }

}