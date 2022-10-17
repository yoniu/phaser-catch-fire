/**
 * 程序入口文件
 */
import './style.css'
import 'phaser'

// 引用常量
import CONFIG from './consts/config'

// 引用场景
import Index from './scenes'

const Game = new Phaser.Game(CONFIG)

Game.scene.add('Index', Index)
Game.scene.start('Index')
