class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      this.load.audio('sfx_jump', './assets/jump.wav');
      this.load.audio('sfx_select', './assets/blipSelect.wav');
      this.load.audio('sfx_coin', './assets/pickupCoin.wav');
      this.load.audio('sfx_hit', './assets/hitHurt.wav');
      this.load.audio('sfx_bgm', './assets/best-time-112194.mp3');
      this.load.image('menubackground', './assets/chengshi.png');
      this.load.image('tou', './assets/maomaotou.png');
      this.load.spritesheet('runmaomao', './assets/maomao.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
    }
    create() {
      this.anims.create({
        key: 'runmaomao',
        frames: this.anims.generateFrameNumbers('runmaomao', { start: 0, end: 3, first: 0}),
        frameRate: 5,
        repeat:-1
      });
      this.sfxbgm = this.sound.add('sfx_bgm');
      this.sfxbgm.play();
      this.sfxbgm.volume = 0.1;
      this.sfxbgm.loop = true;

      this.beijing = this.add.tileSprite(0, 0, 640, 400, 'menubackground').setOrigin(0, 0);

      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          //backgroundColor: '#F3B141',
          color: '#fafafa',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0
      }
      this.maomao = new MaoMao(this, game.config.width/20, game.config.height - 64*1.5, 'runmaomao',0).setOrigin(0, 0);
      this.maomao.anims.play('runmaomao');
      
      this.add.image(game.config.width/2, 0 ,"tou").setOrigin(0, 0);
      this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'MIAO MIAO RUN', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use Space to Jump', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
      borderPadding, '(You can use Triple jump)', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 +
      borderPadding*2, 'Chasing Catnip!', menuConfig).setOrigin(0.5);
      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
      this.beijing.tilePositionX += 2;

      if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
        game.settings = {
          gameTimer: 45000,
          xianjing_p: 0.5,
          speed:2
        }
        //this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
    }

}