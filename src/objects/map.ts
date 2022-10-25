/**
 * 火焰贴图精灵对象
 */
import { GameObject } from "../consts/config"

export default class Map extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, options?: any) {
    super(scene, options.x, options.y, 'fire')

    // 添加精灵动画：火焰
    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('fire', { frames: [0, 1, 2, 3, 4] }),
      frameRate: 6,
      repeat: -1
    })
    // 添加精灵动画：草地
    this.anims.create({
      key: 'grass',
      frames: this.anims.generateFrameNumbers('grassDiff', { frames: [0] })
    })
    // 添加精灵动画：土地
    this.anims.create({
      key: 'brick',
      frames: this.anims.generateFrameNumbers('grass', { frames: [0] })
    })
    // 播放精灵动画
    this.play(options.type)

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

  }

  change() {
    // 精灵点击事件Callback
    if (this.anims.getName() !== 'fire')
      this.play('brick')
  }
  changeCat() {
    this.play('fire')
  }
}