/**
 * 程序入口文件
 */
import './style.css'
import 'phaser'

// 引用常量
import CONFIG from './consts/config'

// 引用场景
import Index from './scenes'
import Loader from './scenes/loader'

const Game = new Phaser.Game(CONFIG)

Game.scene.add('Index', Index, false)
Game.scene.add('Loader', Loader, true)
