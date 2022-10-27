/**
 * 封装一个按钮
 */
export default class Button extends Phaser.GameObjects.Container {
  private Rect: Phaser.GameObjects.Graphics
  private Text: Phaser.GameObjects.Text
  private buttonWidth: number
  private buttonHeight: number
  private radius: number
  constructor(scene: Phaser.Scene, x: number, y: number, options: ButtonType) {
    super(scene, x, y)

    const { width, height, text, textStyle, radius, callback } = options
    const { bgColor, bgColorHover } = options.buttonStyle

    this.buttonWidth = width
    this.buttonHeight = height
    this.radius = radius
    
    this.setSize(width, height)

    // 背景
    this.Rect = new Phaser.GameObjects.Graphics(scene)
    this.drawBackground(bgColor)
    this.add(this.Rect)

    // 文字
    this.Text = new Phaser.GameObjects.Text(scene, width / 2, height / 2, text, textStyle)
    this.Text.setOrigin(0.5, 0.5)
    this.add(this.Text)
    scene.add.existing(this)

    // 热区
    const hitArea = new Phaser.Geom.Rectangle(width / 2, height / 2, width, height)
    this.setInteractive({ cursor: 'pointer', hitArea, hitAreaCallback: Phaser.Geom.Rectangle.Contains })
    this.on('pointerover', () => {
      this.drawBackground(bgColorHover)
    })
    this.on('pointerout', () => {
      this.drawBackground(bgColor)
    })
    this.on('pointerup', callback)
  }

  drawBackground(color: number) {
    this.Rect.fillStyle(color)
    this.Rect.fillRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, this.radius)
  }
}