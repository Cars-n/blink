const DARKNESSLAYER = 3;
const DARKNESSOPACITY = 0.01;
const LIGHTOPACITY = 3.5;

function darkness() {
      let darkness = new Sprite(width/2, height/2, 1920, 1080); // creates a sprite that is the size of the canvas and at the center of the canvas
      darkness.img = "assets/darkness.svg"
    
      darkness.collider = 'none';
      darkness.layer = DARKNESSLAYER; //Layer needs to be higher than player and enviroment sprites
      return darkness;
}