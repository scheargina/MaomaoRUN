class xianjing extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.moveSpeed = game.settings.speed;
      this.move = false;
      this.end = 0;
      this.p = 3;
    }

    update() {
        if(this.move){
            this.x -= this.moveSpeed;
        }
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
        this.move = false;
        this.end = this.scene.time.now + Math.random()*1000*this.p;
    }
}