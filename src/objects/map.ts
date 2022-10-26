/**
 * 火焰贴图精灵对象
 */
import { GameObject } from "../consts/config"
import FireState from "../consts/fireState"
import NearMapPosition from "../consts/nearMap"
import { ChangeEmitter } from "../emitters"

export default class Map extends Phaser.GameObjects.Sprite {
  private position?: Position
  public spriteState: FireState = FireState.Grass
  constructor(scene: Phaser.Scene, options?: any) {
    super(scene, options.x, options.y, 'fire')

    // 添加精灵动画：火焰
    this.anims.create({
      key: FireState.OnFire,
      frames: this.anims.generateFrameNumbers('fire', { frames: [0, 1, 2, 3, 4] }),
      frameRate: 6,
      repeat: -1
    })
    // 添加精灵动画：草地
    this.anims.create({
      key: FireState.Grass,
      frames: this.anims.generateFrameNumbers('grassDiff', { frames: [0] })
    })
    // 添加精灵动画：土地
    this.anims.create({
      key: FireState.Brick,
      frames: this.anims.generateFrameNumbers('grass', { frames: [0] })
    })
    // 播放精灵动画
    this.play(this.spriteState)

    // 设置精灵可操作区域
    const circle = new Phaser.Geom.Circle(GameObject.width / 2, GameObject.height / 2, GameObject.width / 2)
    this.setInteractive({ cursor: 'pointer', hitArea: circle, hitAreaCallback: Phaser.Geom.Circle.Contains })

    // 设置精灵大小、原点位置
    this.setOrigin(0.5, 0.5)
    this.setSize(GameObject.width, GameObject.height)
    this.scale = GameObject.scale

    // 设置精灵点击事件
    this.on('pointerup', this.change, this)
    scene.add.existing(this)

    // 设置位置
    this.position = {
      x: options.xx,
      y: options.yy
    }

  }

  change() {
    // 精灵点击事件Callback
    if (this.spriteState == FireState.Grass) {
      this.play(FireState.Brick)
      this.spriteState = FireState.Brick
      ChangeEmitter.emit('click')
    }
  }
  changeFire() {
    // 设置为火焰
    this.play(FireState.OnFire)
    this.spriteState = FireState.OnFire
  }
  changeBrick() {
    // 设置为火焰
    this.play(FireState.Brick)
    this.spriteState = FireState.Brick
  }
  nearMap(): NearMap[] {
    let maps: NearMap[] = []
    if(this.position?.x && this.position?.y) {
      maps[NearMapPosition.Left] = { // 左
        x: this.position.x - 1,
        y: this.position.y
      }
      maps[NearMapPosition.Right] = { // 右
        x: this.position.x + 1,
        y: this.position.y
      }
      if(this.position.y % 2 === 0) {
        maps[NearMapPosition.TopLeft] = { // 左上
          x: this.position.x - 1,
          y: this.position.y - 1
        }
        maps[NearMapPosition.TopRight] = { // 右上
          x: this.position.x,
          y: this.position.y - 1
        }
        maps[NearMapPosition.BottomLeft] = { // 左下
          x: this.position.x - 1,
          y: this.position.y + 1
        }
        maps[NearMapPosition.BottomRight] = { // 右下
          x: this.position.x,
          y: this.position.y + 1
        }
      } else {
        maps[NearMapPosition.TopLeft] = { // 左上
          x: this.position.x,
          y: this.position.y - 1
        }
        maps[NearMapPosition.TopRight] = { // 右上
          x: this.position.x + 1,
          y: this.position.y - 1
        }
        maps[NearMapPosition.BottomLeft] = { // 左下
          x: this.position.x,
          y: this.position.y + 1
        }
        maps[NearMapPosition.BottomRight] = { // 右下
          x: this.position.x + 1,
          y: this.position.y + 1
        }
      }
    }
    return maps
  }
}