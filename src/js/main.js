// create and setup menu screen 
function createMenuScreen() {
  // Create a new Sprite object that represents the menu background
  // Positioned at the center of the screen and spans the full screen size
  var menu = new Sprite(1920/2, 1080/2, 1920,1080);

  menu.image = mainMenuBackground;
  menu.layer = 3;
  menu.collider = 'none';

  var startGameButton = createButtonSprite('Start Game', 1920/2, 1080/2);
  startGameButton.onClick = function() {
      startGame();
  };

  var tutorialButton = createButtonSprite('Tutorial', 1920/2, 1080/2);
  tutorialButton.onClick = function() {
      showTutorial();
  };

  var controlButton = createButtonSprite('Controls', 1920/2, 1080/2);
  controlButton.onClick = function() {
      showControls();
  };

  var quitGameButton = createButtonSprite('Quit', 1920/2, 1080/2);
  quitGameButton.onClick = function() {
      quitGame();
  };
  return menu;
}

// create a generic button sprite
function createButtonSprite(label, x, y) {
  //  position (x, y) and size (200x50)
  var button = new Sprite(x, y, 200, 50);
  // text that will appear on the button
  button.text = label;
  noStroke();

  // Initialize the onClick property to null 
  button.onClick = null;

  return button;
}

function startGame() {
  // start the game
}

function showTutorial() {
  // show the tutorial
}

function showControls() {
  // show the controls
}

function quitGame() {
  // close the game
}


function waitForOpacityCondition(timeout) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
  
      function checkCondition() {
        // console.log("this is the Opacity: " + OPACITYEQUALSONE + "\n"+ "this is the variable: " + variable);
        if (OPACITYEQUALSONE === true) {
          resolve(OPACITYEQUALSONE);
        } else if (Date.now() - startTime >= timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(checkCondition, 1); // Adjust the interval as needed
        }
      }
  
      checkCondition();
    });
  }
  
  // Example usage

  