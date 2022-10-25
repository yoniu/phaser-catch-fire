/**
 * 开始游戏场景
 */
import { GameObject } from "../consts/config";
import Fire from "../objects/map";

export default class Play extends Phaser.Scene {
  //private inputKey?: Phaser.Input.Keyboard.Key
  private pp: Array<Array<Fire>> = []
  private container?: Phaser.GameObjects.Container
  
  constructor() {
    super('Play');

  }

  create() {
    this.createMapContainer() 
    this.createCat()
  }

  createMapContainer() {
    this.container = this.add.container(50, 50)

    for(let i = 0; i <= 11; i++){
      this.pp[i] = []
      for(let j = 0; j <= 11; j++){
        let x = (j % 2 == 1) ? (i * GameObject.width * GameObject.scale) + (i * 10) : 25 + (i * GameObject.width * GameObject.scale) + (i * 10);
        let y = (j * GameObject.height * GameObject.scale) + (j * 5);
        this.pp[i][j] = new Fire(this, {x, y, type: 'grass'})
        this.container.add(this.pp[i][j])
      }
    }
  }
  createCat() {
    this.pp[5][5].changeCat()
  }

  update(): void {
  }

}