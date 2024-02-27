function darknessSetup() {
  darkness = createGraphics(width, height);
  darkness.noStroke();
  darkness.background(100, 100, 100, 100); // creates low opacity grey darkness for when there is no mouse movement
}

let FLASHLIGHT_DISTANCE = 200;
let FLASHLIGHT_WIDTH = 75;
function mouseMoved() {
    darkness.clear() // clears darkness so it doesn't accumulate with darkness from setup
    darkness.background(100, 100, 100, 100); // creates low opacity grey darkness to be temporarily changed
  
    darkness.push(); // saves current state of darkness and allows for temporary change
    darkness.blendMode(REMOVE);
    darkness.translate(mouseX, mouseY);
    darkness.triangle(0, 0, FLASHLIGHT_DISTANCE, FLASHLIGHT_WIDTH, FLASHLIGHT_DISTANCE, -FLASHLIGHT_WIDTH);
    darkness.pop(); // restores state of darkness before change
  }

function drawDarkness(){
  image(darkness, 0, 0, width, height);
}