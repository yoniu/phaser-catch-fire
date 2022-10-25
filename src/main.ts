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
import Play from './scenes/play'

const Game = new Phaser.Game(CONFIG)

// 场景加载
Game.scene.add('Loader', Loader, true)
Game.scene.add('Index', Index, false)
Game.scene.add('Play', Play, false)
