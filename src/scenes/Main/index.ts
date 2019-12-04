import { BASE_URL, PATH_URL } from '@/const'
export default class Main extends Phaser.Scene {
  items: any
  words: any
  constructor() {
    super('mainScene')
  }

  preload() {
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)
    this.load.image('background', 'images/background-city.png')
    this.load.image('building', 'images/building.png')
    this.load.image('car', 'images/car.png')
    this.load.image('house', 'images/house.png')
    this.load.image('tree', 'images/tree.png')

    this.load.audio('treeAudio', 'audio/arbol.mp3')
    this.load.audio('carAudio', 'audio/auto.mp3')
    this.load.audio('houseAudio', 'audio/casa.mp3')
    this.load.audio('buildingAudio', 'audio/edificio.mp3')
    this.load.audio('correct', 'audio/correct.mp3')
    this.load.audio('wrong', 'audio/wrong.mp3')
  }

  create() {
    this.add.sprite(0, 0, 'background').setOrigin(0, 0)
    // const soundSample = this.sound.add('correct')
    // soundSample.play()
    // soundSample.stop()
    // soundSample.pause()
    // soundSample.resume()
    this.words = [
      {
        key: 'building',
        setXY: {
          x: 100,
          y: 240
        },
        spanish: 'edificio'
      },
      {
        key: 'house',
        setXY: {
          x: 240,
          y: 280
        },
        setScale: {
          x: 0.8,
          y: 0.8
        },
        spanish: 'casa'
      },
      {
        key: 'car',
        setXY: {
          x: 400,
          y: 300
        },
        setScale: {
          x: 0.8,
          y: 0.8
        },
        spanish: 'automovil'
      },
      {
        key: 'tree',
        setXY: {
          x: 550,
          y: 250
        },
        spanish: 'arbol'
      }
    ]
    this.items = this.add.group(this.words)

    this.items.setDepth(1)

    const items = this.items.getChildren()

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      item.setInteractive()
      item.resizeTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        paused: true,
        yoyo: true,
        ease: 'Quad.easeInOut'
      })
      item.alphaTween = this.tweens.add({
        targets: item,
        alpha: 0.7,
        duration: 200,
        paused: true
      })
      item.on(
        'pointerdown',
        function(pointer: any) {
          console.log('you clicked' + item.texture.key, pointer)
          item.resizeTween.start()
          // this.showNextQuestion()
        },
        this
      )
      item.on(
        'pointerover',
        function(pointer: any) {
          // console.log('you clicked' + item.texture.key, pointer)
          // item.alphaTween.start()
        },
        this
      )
      item.on(
        'pointerout',
        function(pointer: any) {
          // console.log('you clicked' + item.texture.key, pointer)
          // item.alphaTween.stop()
          // item.setAlpha(1)
        },
        this
      )
    }
    // items.forEach((item: any, index: any) => {})
  }

  showNextQuestion() {}
}
