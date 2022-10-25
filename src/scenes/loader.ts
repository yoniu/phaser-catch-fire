/**
 * 资源加载场景
 */
export default class Loader extends Phaser.Scene {

  constructor() {
    super('Loader');
  }

  preload() {
    this.load.setPath('assets/');
    this.load.spritesheet('fire', 
        'CampFireFinished.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet('grass',
        'forestCircle.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet('grassDiff',
        'grassDiff.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.once('complete', () => {
      console.log('资源加载完毕')
      this.scene.stop('Loader')
      this.scene.start('Index')
    })
  }

}