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
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) * 0.3, "抓住小猫", <Phaser.Types.GameObjects.Text.TextStyle>{
      fontSize: '128px',
      fontStyle: 'bold'
    }).setOrigin(0.5, 1)
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) * 0.4, "火焰版", <Phaser.Types.GameObjects.Text.TextStyle>{
      fontSize: '32px',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0)
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) * 0.9, "Powered by 许景智", <Phaser.Types.GameObjects.Text.TextStyle>{
      fontSize: '16px',
    }).setOrigin(0.5, 0)
    
    new Button(this, (CONFIG.width as number) / 2 + 128 , (CONFIG.height as number) * 0.6, {
      radius: 15,
      width: 128, height: 64,
      text: "困难",
      textStyle: {
        fontSize: '24px',
        color: '#FFF'
      },
      buttonStyle: {
        bgColor: 0x871400,
        bgColorHover: 0x610b00
      },
      callback: () => { this.scene.start('Play', {count: 6}) }
    })
    new Button(this, (CONFIG.width as number) / 2 - 128 / 2 , (CONFIG.height as number) * 0.6, {
      radius: 15,
      width: 128, height: 64,
      text: "中等",
      textStyle: {
        fontSize: '24px',
        color: '#FFF'
      },
      buttonStyle: {
        bgColor: 0xd46b08,
        bgColorHover: 0xad4e00
      },
      callback: () => { this.scene.start('Play', {count: 12}) }
    })
    new Button(this, (CONFIG.width as number) / 2 - 128*2 - 20, (CONFIG.height as number) * 0.6, {
      radius: 15,
      width: 128, height: 64,
      text: "简单",
      textStyle: {
        fontSize: '24px',
        color: '#FFF'
      },
      buttonStyle: {
        bgColor: 0x5b8c00,
        bgColorHover: 0x3f6600
      },
      callback: () => { this.scene.start('Play', {count: 20}) }
    })
  }

}