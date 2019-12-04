import { BASE_URL, PATH_URL } from '@/const'
export default class Main extends Phaser.Scene {
  items: any
  words: any
  nextWord: any
  wordText: any
  correctSound: any // 成功的声音
  wrongSound: any // 失败的声音
  constructor() {
    super('mainScene')
  }

  init() {
    this.words = [
      {
        key: 'building',
        setXY: {
          x: 100,
          y: 240
        },
        spanish: '建筑'
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
        spanish: '房子'
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
        spanish: '车'
      },
      {
        key: 'tree',
        setXY: {
          x: 550,
          y: 250
        },
        spanish: '树'
      }
    ]
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
    this.wordText = this.add.text(30, 20, '', {
      font: '28px Open Sans',
      fill: '#ffffff'
    })
    this.showQuestionList()
    this.correctSound = this.sound.add('correct')
    this.wrongSound = this.sound.add('wrong')
    this.showNextQuestion()
  }

  // 设置题目
  showQuestionList() {
    this.items = this.add.group(this.words)

    this.items.setDepth(1)

    const items = this.items.getChildren()

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      item.setInteractive()
      item.correctTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        paused: true,
        yoyo: true,
        ease: 'Quad.easeInOut'
      })

      item.wrongTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        angle: 90,
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
      item.on('pointerdown', () => {
        const result = this.processAnswer(this.words[i].spanish)
        if (result) {
          console.log('success..')
          item.correctTween.play() // TODO restart 这个版本无效
        } else {
          console.log('wrong..')
          item.wrongTween.play() // TODO restart 这个版本无效
        }

        this.showNextQuestion()
      })
      item.on('pointerover', function() {
        item.alphaTween.play() // TODO restart 这个版本无效
      })
      item.on('pointerout', function() {
        item.alphaTween.stop()
        item.setAlpha(1)
      })

      this.words[i].sound = this.sound.add(this.words[i].key + 'Audio')
    }
  }

  showNextQuestion() {
    this.nextWord = Phaser.Math.RND.pick(this.words)
    this.nextWord.sound.play()
    this.wordText.setText(this.nextWord.spanish)
  }

  processAnswer(userResponse: any) {
    if (userResponse === this.nextWord.spanish) {
      this.correctSound.play()
      console.log('回答正确')
      return true
    } else {
      this.wrongSound.play()
      console.log('回答错误')
      return false
    }
  }
}
