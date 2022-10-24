import CONFIG from "../consts/config";
import Fire from "../objects/fire";

/**
 * 开始游戏场景
 */
export default class Index extends Phaser.Scene {
  private inputKey?: Phaser.Input.Keyboard.Key
  private pp1?: Fire
  private pp2!: Fire
  private pp3!: Fire
  
  constructor() {
    super('Index');
  }

  create() {
    this.add.text((CONFIG.width as number) / 2, (CONFIG.height as number) / 2, "please keydown [ENTER]")
            .setOrigin(0.5, 0.5)

    this.inputKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    
    this.pp1 = new Fire(this, {x: 50, y: 50, type: 'fire'})
    this.pp2 = new Fire(this, {x: 150, y: 50, type: 'grass'})
    this.pp3 = new Fire(this, {x: 250, y: 50, type: 'brick'})
    
    //this.pp1.body.gameObject.setInteractive({ cursor: 'pointer' })
    
  }

  update(): void {
    if(this.inputKey?.isDown) 
      console.log(123)
  }

}