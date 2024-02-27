const DARKNESSLAYER = 10;
const DARKNESSOPACITY = 0.9;

function darkness() {
      let darkness = new Sprite(width/2, height/2, 1920, 1080); // creates a sprite that is the size of the canvas and at the center of the canvas
      darkness.img = "assets/darkness.svg"
    
      darkness.opacity = DARKNESSOPACITY;
      darkness.collider = 'none';
      darkness.layer = DARKNESSLAYER; //Layer needs to be higher than player and enviroment sprites
      return darkness;
}