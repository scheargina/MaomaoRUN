let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    scene: [ Menu, Play ],
    bestpoint : 0
  }
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyJUMP, keyQ, keyE;




//Jingqi Huang
//MAOMAORUN
//10 Hours
/*Credits:
BGM:
  Best time:https://pixabay.com/zh/music/-best-time-112194/
Audio:
  created in: https://sfxr.me/
Assets/Stickers:
  created in Aseprite
//Creative Tilt：
Do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new?
  it's a lot of fun during testing game in each change. I see the game get better and faster. 
  I had a lot of proramming problems, but I solved them by studing in class and on Internet.
  For example, the cat drops below the road after jumping. The duplication of the traps causing by incorrect randomness algorithm.
Have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form?
  The pixel style is mainly used, and all the tetures are painted by myself and the sound effects are made in SFXR.sine this is the first time that I have completed painting and audio production independently,I feel a sense of accommplishment.
  Comparing to the previous project, this production is a new experience.


Game settings:
1: The cat can use triple jump! Amazing!!!!
2: Game will be accelerated after 15 seconds
3: After 30 seconds, the scene will have a significant change.
4: Pick up the cat mint will increase the score(+3)!, 1 seconds is 1 points.
*/


  