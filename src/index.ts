import * as scenes from '@/scenes'

const scene = []
for (let i in scenes) {
  scene.push(scenes[i])
}

const config: any = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    parent: 'app',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 360,
    min: { width: 640, height: 360 },
    max: {
      width: 640,
      height: 360
    }
  },
  scene,
  title: '西班牙教学游戏',
  pixelArt: false
}

window.game = new Phaser.Game(config)
