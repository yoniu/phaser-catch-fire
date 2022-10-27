/**
 * 开始游戏场景
 */
import { GameObject } from "../consts/config"
import Fire from "../objects/map"
import FireState from "../consts/fireState"
import { ChangeEmitter } from "../emitters"
import Button from "../objects/button"
import State from "../consts/state"

export default class Play extends Phaser.Scene {
  //private inputKey?: Phaser.Input.Keyboard.Key
  private pp: Array<Array<Fire>> = []
  private container?: Phaser.GameObjects.Container
  private currentFire!: CurrentFire
  private fires: Array<Position> = []
  private count!: number
  
  constructor() {
    super('Play')
  }

  init(obj: {count: number}) {
    this.count = obj.count
  }

  create() {
    this.createMapContainer() 
    this.createFire()
    this.createBrick()
    this.initChangeEmitter()

    new Button(this, 750 / 2 + 128 / 2, 676, <ButtonType>{
      radius: 48 / 2,
      width: 128, height: 48,
      text: "重新开始",
      textStyle: {
        fontSize: '16px',
        color: '#000'
      },
      buttonStyle: {
        bgColor: 0xB38E74,
        bgColorHover: 0xdbcabd
      },
      callback: () => { this.scene.restart() }
    })
    new Button(this, 750 / 2 - 128 - 128/2, 676, <ButtonType>{
      radius: 48 / 2,
      width: 128, height: 48,
      text: "返回主页",
      textStyle: {
        fontSize: '16px',
        color: '#000'
      },
      buttonStyle: {
        bgColor: 0xB38E74,
        bgColorHover: 0xdbcabd
      },
      callback: () => { this.scene.start('Index') }
    })
  }

  /**
   * 创建游戏操作框
   */
  createMapContainer() {
    this.container = this.add.container(50, 50)
    for(let i = 0; i <= 10; i++) {
      this.pp[i] = []
      for(let j = 0; j <= 10; j++){
        let x = (j % 2 == 1) ? (GameObject.width * GameObject.scale / 2) + (i * GameObject.width * GameObject.scale) + (i * 10) : (i * GameObject.width * GameObject.scale) + (i * 10);
        let y = (j * GameObject.height * GameObject.scale) + (j * 5);
        this.pp[i][j] = new Fire(this, {
          x, y,
          xx: i,
          yy: j
        })
        this.container.add(this.pp[i][j])
      }
    }
  }
  
  /**
   * 初始化火焰
   */
  createFire() {
    // 设置火焰为全局中心
    this.pp[5][5].changeFire()
    this.currentFire = {
      position: {
        x: 5, y: 5
      },
      direction: this.getRandom(6) // 设置火焰方向
    }
    this.fires.push({
      x: 5, y: 5
    })
  }

  // 创建砖块
  createBrick() {
    for(let i = 1; i <= this.count; i++) {
      const x = this.getRandom(10),
            y = this.getRandom(10)
      if(this.pp[x][y].spriteState == FireState.OnFire || this.pp[x][y].spriteState == FireState.Brick)
        i--
      else
        this.pp[x][y].changeBrick()
    }
  }

  /**
   * 初始化 Emitter
   */
  initChangeEmitter() {
    // 清除 Emitter
    ChangeEmitter.off('click')
    ChangeEmitter.off('gameover')
    // 新建 Emitter
    ChangeEmitter.on('click', () => {
      let direction = this.currentFire.direction
      const {x, y} = this.currentFire.position
      const nearMaps = this.pp[x][y].nearMap()
      let times = 0 // 内循环次数
      if(x == 0 || x == 10 || y == 0 || y == 10)
        ChangeEmitter.emit('gameover', State.Fail, this.count)
      else
        while(true) {
          times++
          const newPosition = nearMaps[direction]
          const nextFire = this.pp[newPosition.x][newPosition.y]
          if(nextFire.spriteState == FireState.Brick || nextFire.spriteState == FireState.OnFire) {
            if(times > 6) {
              ChangeEmitter.emit('gameover', State.Success, this.count)
              break
            }
            for(let i = 0; i < nearMaps.length; i++) {
              const nextFire = this.pp[nearMaps[i].x][nearMaps[i].y]
              if(!(nextFire.spriteState == FireState.Brick || nextFire.spriteState == FireState.OnFire)) {
                direction = i
                break;
              }
            }
            continue
          } else {
            nextFire.changeFire()
            this.pp[x][y].setAlpha(0.6)
            this.currentFire = {
              position: {
                x: newPosition.x,
                y: newPosition.y
              },
              direction
            }
            this.fires.push(newPosition)
            break
          }
        }
    })
    ChangeEmitter.on('gameover', (state: State, count: number) => {
      let core:number = 0
      if(state == State.Success) {
        for(let i = 0; i <= 10; i++)
          for(let j = 0; j <= 10; j++)
            if(this.pp[i][j].spriteState == FireState.Grass)
              core++
      }
      this.scene.start('Gameover', {state, count, core})
    })
  }

  /**
   * 取随机数
   * @param max 最大值（下取整）
   * @returns 
   */
  getRandom (max: integer) {
    return Math.floor(Math.random() * max);
  }

}