import State from "../consts/state"
import CONFIG from "../consts/config"
import Button from "../objects/button"

export default class Gameover extends Phaser.Scene {
  private gameState?: State
  private count!: number
  private core!: number
  constructor() {
    super('Gameover')
  }
  init(obj: {state: State, count: number, core?: number}) {
    this.gameState = obj.state
    this.count = obj.count
    if('core' in obj) this.core = <number>obj.core
  }

  create() {
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) * 0.3, "游戏结束", <Phaser.Types.GameObjects.Text.TextStyle>{
      fontSize: '128px',
      fontStyle: 'bold'
    }).setOrigin(0.5, 1)

    if(this.gameState == State.Fail) {
      this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) * 0.5, "游戏失败", <Phaser.Types.GameObjects.Text.TextStyle>{
        fontSize: '32px',
        fontStyle: 'bold'
      }).setOrigin(0.5, 0.5)
    } else {
      this.core *= (1 / (120 - this.count)) * 100
      this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) * 0.5, `游戏得分：${this.core}`, <Phaser.Types.GameObjects.Text.TextStyle>{
        fontSize: '32px',
        fontStyle: 'bold'
      }).setOrigin(0.5, 0.5)
    }

    new Button(this, (CONFIG.width as number) / 2 - 128 - 20, (CONFIG.height as number) * 0.7, {
      radius: 15,
      width: 128, height: 64,
      text: "重新开始",
      textStyle: {
        fontSize: '24px',
        color: '#000'
      },
      buttonStyle: {
        bgColor: 0xB38E74,
        bgColorHover: 0xdbcabd
      },
      callback: () => { this.scene.start('Play', {count: this.count}) }
    })

    new Button(this, (CONFIG.width as number) / 2 + 20, (CONFIG.height as number) * 0.7, {
      radius: 15,
      width: 128, height: 64,
      text: "返回主页",
      textStyle: {
        fontSize: '24px',
        color: '#000'
      },
      buttonStyle: {
        bgColor: 0xB38E74,
        bgColorHover: 0xdbcabd
      },
      callback: () => { this.scene.start('Index') }
    })
  }
}