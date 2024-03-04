const DARKNESSLAYER = 2;
let darkness;
let flashlightRotation;

function darknessSetup() {
      darkness = new Sprite(width/2, height/2, 1920, 1080); // creates a sprite that is the size of the canvas and at the center of the canvas
      darkness.img = "assets/darkness.svg"
      
      darkness.collider = 'none';
      darkness.layer = DARKNESSLAYER; //Layer needs to be higher than player and enviroment sprites
} 

function darknessDraw(playerX, playerY, playerVelocityX, playerVelocityY) {     
      darkness.y = playerY;
      darkness.x = playerX;
      if(playerVelocityX != 0 && playerVelocityY != 0) { // if player is moving on the x and y axes
            flashlightRotation = 0; // reset rotation
            if (playerVelocityX > 0 && playerVelocityY < 0) // A and W
                  flashlightRotation = 45;
            if (playerVelocityX > 0 && playerVelocityY > 0) // A and S
                  flashlightRotation = 135;
            if (playerVelocityX < 0 && playerVelocityY < 0) // D and W
                  flashlightRotation = -45;
            if (playerVelocityX < 0 && playerVelocityY > 0) // D and S
                  flashlightRotation = -135;
      }
      else if(playerVelocityX != 0) { // if player is moving on the x-axis
            flashlightRotation = 0; // reset rotation
            if (playerVelocityX > 0) 
                  flashlightRotation = 90;
            else if (playerVelocityX < 0) 
                  flashlightRotation = -90;
      }
      else if(playerVelocityY != 0) { // if player is moving on the y-axis
            flashlightRotation = 0; // reset rotation
            if (playerVelocityY > 0)
                  flashlightRotation = -180;
            else if (playerVelocityY < 0) 
                  flashlightRotation = 0;
      }
      darkness.rotation = flashlightRotation;
}