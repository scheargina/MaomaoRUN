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
      this.load.image('xukong', './assets/xikong.png');
      this.load.spritesheet('maomao', './assets/maomao.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
      this.load.spritesheet('yunshi', './assets/yunshi.png', {frameWidth: 120, frameHeight: 96, startFrame: 0, endFrame: 1});
    }
    
    create() {
      this.chengshi = this.add.tileSprite(0, 0, 640, 400, 'chengshi').setOrigin(0, 0);
      this.shenling = this.add.tileSprite(0, 0, 640, 400, 'shenling').setOrigin(0, 0);
      this.shenling.visible = false;
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x3131F3).setOrigin(0, 0);
      this.MaoMao = new MaoMao(this, game.config.width/20, game.config.height - 64*1.5, 'maomao').setOrigin(0,0);
      this.xianjing01 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai1').setOrigin(0,0);
      this.xianjing02 = new xianjing(this, game.config.width, game.config.height - 64*1.1, 'xukong').setOrigin(0,0);
      this.xianjing03 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai2').setOrigin(0,0);
      this.xianjing04 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai2').setOrigin(0,0);
      this.anims.create({
        key: 'maomao',
        frames: this.anims.generateFrameNumbers('maomao', { start: 0, end: 3, first: 0}),
        frameRate: 5,
        repeat:-1
      });
      this.anims.create({
        key: 'yunshi',
        frames: this.anims.generateFrameNumbers('yunshi', { start: 0, end: 1, first: 0}),
        frameRate: 5,
        repeat:-1
      });
      this.yunshi = this.add.sprite( game.config.width-120, game.config.height/3);
      this.yunshi.anims.play('yunshi');
      //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'aspaceship', 0, 30).setOrigin(0, 0);
      //this.ship04 = new liteSpaceship(this, game.config.width + borderUISize*9, borderUISize*4, 'kaiwen01', 0, 100).setOrigin(0, 0);
      this.MaoMao.anims.play('maomao');
      this.speed = game.settings.speed;
      this.xianjing_p =  game.settings.xianjing_p;
      this.current = 0;
      this.youtong = false;


      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
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
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyQ)) {
        this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyE)) {
        this.scene.start("menuScene");
      }

      if (!this.gameOver) {               
        this.MaoMao.update();
        this.chengshi.tilePositionX += this.speed;
        this.shenling.tilePositionX += this.speed;
        this.xianjing01.update(); 
        this.xianjing02.update();
        this.xianjing03.update();
        this.xianjing04.update();  
        if(this.time.now - this.current >= 500){
          this.current = this.time.now;
          if(Math.random()<this.xianjing_p && !this.xianjing01.move && this.chengshi.visible){
            this.xianjing01.move = true;
            this.youtong = true;
          }   
          if(Math.random()<this.xianjing_p && !this.xianjing02.move && this.chengshi.visible && !this.youtong){
            this.xianjing02.move = true;
          
          }
          if(Math.random()<this.xianjing_p && !this.xianjing03.move && this.shenling.visible){
              this.xianjing03.move = true;
            
          }
          if(Math.random()<this.xianjing_p && !this.xianjing04.move && this.shenling.visible){
            this.xianjing04.move = true;
          } 
          this.youtong = false;
        }    
        this.clockRight.text = Math.floor((this.time.now - this.time.startTime)/1000);
        if(this.time.now - this.time.startTime >=15000 && game.settings.speed == this.xianjing01.moveSpeed){
          this.xianjing01.moveSpeed += 1;
          this.xianjing02.moveSpeed += 1;
          this.xianjing03.moveSpeed += 1;
          this.xianjing04.moveSpeed += 1;
          this.speed += 1;
        }
        if(this.time.now - this.time.startTime >=30000 && this.shenling.visible == false){
          this.shenling.visible = true;
          this.chengshi.visible = false;
          this.xianjing_p += 0.1;
        }
        if (this.checkCollision(this.MaoMao, this.xianjing01)||
        this.checkCollision(this.MaoMao, this.xianjing02)||
        this.checkCollision(this.MaoMao, this.xianjing03)||
        this.checkCollision(this.MaoMao, this.xianjing04)) {
          this.gameOver = true;
          let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            }
          }
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (Q) to Restart or (E) for Menu', scoreConfig).setOrigin(0.5);
        }
      }   

    




      
    }
    checkCollision(maomao, zhangai) {
      if (maomao.x < zhangai.x + zhangai.width -8 && 
        maomao.x + maomao.width > zhangai.x + 8 && 
        maomao.y < zhangai.y + zhangai.height &&
        maomao.height + maomao.y > zhangai.y + 16) {
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