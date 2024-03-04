const DARKNESSLAYER = 2;
const DARKNESSOPACITY = 0.9;
let darkness;

function darknessSetup() {
      darkness = new Sprite(width/2, height/2, 1920, 1080); // creates a sprite that is the size of the canvas and at the center of the canvas
      darkness.img = "assets/darkness.svg"

      darkness.opacity = DARKNESSOPACITY;
      darkness.collider = 'none';
      darkness.layer = DARKNESSLAYER; //Layer needs to be higher than player and enviroment sprites
      return darkness;
}

function updateTriangle(darkSVG) {
      const triangle = select('#flashlight'); // Select all polygons in the SVG
      let trianglePoints = extractPoints(triangleMask.attribute('d')); // Get the points of each polygon
      // Modify the points however you want
      for (let j = 0; j < points.length; j++) {
        points[j].x += random(-5, 5); // Example manipulation, adding random value to x coordinate
        points[j].y += random(-5, 5); // Example manipulation, adding random value to y coordinate
      }
}

function darknessDraw(playerx, playery) {
      const triangle = document.getElementById('cutout');
      triangle.setAttribute('points', '0,0 1060,740 1060,340');
}