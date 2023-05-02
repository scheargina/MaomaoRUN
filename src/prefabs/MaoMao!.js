class MaoMao extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  

      scene.add.existing(this);
      this.isJump = false;
      //this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if(!this.isJump){
            if(keyJUMP.isDown) {
                this.isJump = true;
            }
        }
    }
}