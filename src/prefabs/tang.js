class tang extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.moveSpeed = game.settings.speed;
      this.move = false;
      this.end = 0;
      this.visible = false;
    }

    update() {
        if(this.move){
            this.x -= this.moveSpeed;
            this.visible = true; 
            if(this.y <= game.config.height - 64){
                this.y += 1;
            }
        }
        if(this.x <= 0 - this.width){
            this.reset();
        }

    }

    reset() {
        this.x = game.config.width - 60;
        this.visible = false;
        this.move = false;
        this.end = this.scene.time.now + Math.random()*4000;
        this.y = game.config.height/3 +48;
    }
}