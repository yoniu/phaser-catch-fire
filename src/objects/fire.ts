import FireStateMachine from '../states/fire'

export default class Fire extends Phaser.GameObjects.Container {
  private mFsm?: FireStateMachine
  private sprite?: Phaser.GameObjects.Sprite

  constructor(scene: Phaser.Scene, options?: any) {
    super(scene, options.x, options.y)

    this.scene = scene

    this.sprite = this.scene.add.sprite(options.x, options.y, 'fire')

    this.add(this.sprite)
    this.scene.add.existing(this.sprite)
    
    this.sprite.anims.create({
      key: 'fire',
      frames: this.sprite.anims.generateFrameNumbers('fire', { frames: [0, 1, 2, 3, 4] }),
      frameRate: 6,
      repeat: -1
    })
    this.sprite.anims.create({
      key: 'grass',
      frames: this.sprite.anims.generateFrameNumbers('grass', { frames: [1] })
    })
    this.sprite.anims.create({
      key: 'brick',
      frames: this.sprite.anims.generateFrameNumbers('grass', { frames: [0] })
    })

    this.sprite.play(options.type)
    this.sprite.setOrigin(0.5, 0.5)

    this.setSize(64, 64)

    this.setInteractive({ cursor: 'pointer' })

    this.on('pointerup', this.change, this)

  }

  change() {
    if (this.sprite?.anims.getName() !== 'fire')
      this.sprite?.play('brick')
  }

}