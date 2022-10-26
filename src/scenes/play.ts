/**
 * 开始游戏场景
 */
import { GameObject } from "../consts/config"
import Fire from "../objects/map"
import FireState from "../consts/fireState"
import { ChangeEmitter } from "../emitters"

export default class Play extends Phaser.Scene {
  //private inputKey?: Phaser.Input.Keyboard.Key
  private pp: Array<Array<Fire>> = []
  private container?: Phaser.GameObjects.Container
  private currentFire!: CurrentFire
  private fires: Array<Position> = []
  
  constructor() {
    super('Play')

  }

  create() {
    this.createMapContainer() 
    this.createFire()
    this.initChangeEmitter()
  }

  /**
   * 创建游戏操作框
   */
  createMapContainer() {
    this.container = this.add.container(50, 50)
    for(let i = 0; i <= 10; i++) {
      this.pp[i] = []
      for(let j = 0; j <= 10; j++){
        let x = (j % 2 == 1) ? 25 + (i * GameObject.width * GameObject.scale) + (i * 10) : (i * GameObject.width * GameObject.scale) + (i * 10);
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

  initChangeEmitter() {
    ChangeEmitter.on('click', () => {
      let direction = this.currentFire.direction
      const {x, y} = this.currentFire.position
      const nearMaps = this.pp[x][y].nearMap()
      let times = 0
      while(true) {
        times++
        const newPosition = nearMaps[direction]
        const nextFire = this.pp[newPosition.x][newPosition.y]
        if(nextFire.spriteState == FireState.Brick || nextFire.spriteState == FireState.OnFire) {
          if(times >= 6) break;
          direction = this.getRandom(6)
          continue;
        } else {
          nextFire.changeFire()
          this.currentFire = {
            position: {
              x: newPosition.x,
              y: newPosition.y
            },
            direction
          }
          this.fires.push(newPosition)
          break;
        }
      }
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