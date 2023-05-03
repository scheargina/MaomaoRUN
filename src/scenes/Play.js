class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
      this.load.image('maobohe', './assets/maobohe.png');
      this.load.image('maolingshi', './assets/maolingshi.png');
      this.load.image('chengshi', './assets/chengshi.png');
      this.load.image('shenling', './assets/shenling.png');
      this.load.image('zhangai1', './assets/zhangai1.png');
      this.load.image('zhangai2', './assets/zhangai2.png');
      this.load.image('zhadan', './assets/zhadan.png');
      this.load.spritesheet('maomao', './assets/maomao.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
      this.load.spritesheet('yunshi', './assets/yunshi.png', {frameWidth: 120, frameHeight: 96, startFrame: 0, endFrame: 1});
    }
    
    create() {
      this.chengshi = this.add.tileSprite(0, 0, 640, 400, 'chengshi').setOrigin(0, 0);
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x3131F3).setOrigin(0, 0);
      this.MaoMao = new MaoMao(this, game.config.width/20, game.config.height - 64*1.5, 'maomao').setOrigin(0,0);
      this.xianjing01 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai1').setOrigin(0,0);
      this.xianjing02 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai1').setOrigin(0,0);
      this.xianjing03 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai2').setOrigin(0,0);
      this.xianjing04 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai2').setOrigin(0,0);
      this.anims.create({
        key: 'maomao',
        frames: this.anims.generateFrameNumbers('maomao', { start: 0, end: 3, first: 0}),
        frameRate: 5,
        repeat:-1
      });
      //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'aspaceship', 0, 30).setOrigin(0, 0);
      //this.ship04 = new liteSpaceship(this, game.config.width + borderUISize*9, borderUISize*4, 'kaiwen01', 0, 100).setOrigin(0, 0);
      this.MaoMao.anims.play('maomao');


      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      
      this.Score = 0;
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.Score, scoreConfig);
      this.bestp = this.add.text(borderUISize + borderPadding + scoreConfig.fixedWidth *1.5 , borderUISize + borderPadding*2, config.bestpoint, scoreConfig);
      this.clockRight = this.add.text(-borderUISize + game.config.width - borderPadding - scoreConfig.fixedWidth, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      this.gameOver = false;
      scoreConfig.fixedWidth = 0;
          //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          //this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);

      delete scoreConfig.backgroundColor ;
      scoreConfig.color = "#fafafa";
      this.tiao = this.add.text(game.config.width/2 - scoreConfig.fixedWidth/2, borderUISize + borderPadding*2, 'jump!', scoreConfig);
      this.tiao.visible = false;
    }
    update() {
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyJUMP)) {
        this.scene.restart();
      }
      // if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      //   this.scene.start("menuScene");
      // }

      if (!this.gameOver) {               
        this.MaoMao.update();
        this.chengshi.tilePositionX += game.settings.speed;
        this.xianjing01.update(); 
        this.xianjing02.update();
        this.xianjing03.update();
        this.xianjing04.update();           
        this.clockRight.text = Math.floor((this.time.now - this.time.startTime)/1000);
        if(this.time.now - this.time.startTime >=15000 && game.settings.speed == this.xianjing01.moveSpeed){
          this.xianjing01.moveSpeed += 2;
          this.xianjing02.moveSpeed += 2;
          this.xianjing03.moveSpeed += 2;
          this.xianjing04.moveSpeed += 2;
          game.settings.speed += 1;
        }
      }   

      // if (this.checkCollision(this.p1Rocket, this.ship02)) {
      //   this.p1Rocket.reset();
      //   this.shipExplode(this.ship02);
      //   this.addTime();  
      // }



      
    }
    checkCollision(rocket, ship) {
      if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
        return true;
      } else {
        return false;
      }
    }
    shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0;
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');             // play explode animation
      boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
      });      
      this.p1Score += ship.points;
      this.scoreLeft.text = this.p1Score;
      let index = Math.floor(Math.random()*5);
      let sound_dict = ['sfx_explosion','sfx_explosiona','sfx_explosionb','sfx_explosionc','sfx_explosiond'];
      this.sound.play(sound_dict[index]);     
    }
  }