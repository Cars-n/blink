
let darkness;
let flashlightRotation;

function darknessSetup() {
      darkness = new Sprite(width/2, height/2, 1920, 1080); // creates a sprite that is the size of the canvas and at the center of the canvas
      darkness.img = "assets/darkness.svg"
      darkness.collider = 'none';
      darkness.layer = DARKNESS_LAYER; // layer needs to be higher than player and enviroment sprites
} 

function darknessDraw(playerX, playerY, playerVelocityX, playerVelocityY) {     
      darkness.y = playerY;
      darkness.x = playerX;
      if(playerVelocityX != 0 || playerVelocityY != 0) { // if player is moving
            darkness.rotation = atan2(playerVelocityX, -playerVelocityY); // calculates the angle formed between two points
      }
}