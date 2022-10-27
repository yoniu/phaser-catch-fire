/**
 * 开始游戏场景
 */

import CONFIG from "../consts/config";

import Button from "../objects/button";

export default class Index extends Phaser.Scene {
  
  constructor() {
    super('Index');
  }

  create() {
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) / 2, "抓住小猫")
            .setOrigin(0.5, 0.5)
    
    new Button(this, 10, 10, {
      radius: 15,
      width: 256, height: 64,
      text: "开始游戏",
      textStyle: {
        fontSize: '24px',
        color: '#000'
      },
      buttonStyle: {
        bgColor: 0xffff00,
        bgColorHover: 0xff0000
      },
      callback: () => { this.scene.start('Play') }
    })
  }

}