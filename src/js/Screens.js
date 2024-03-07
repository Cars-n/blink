/**
 * 
 * 
 * 
 */

class PauseMenu {
	/**
	 * Default constructor, makes a background, resume and exit buttons
	 */
	constructor() {
		this.resumeButton = createButton('Resume');
		this.exitButton = createButton('Exit');

		//Backdrop to the menu
		this.menu = new Sprite(1920/2,1080/2,1920,1080);
		this.menu.layer = 4;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
		//this.menu.collider = 'none';

		//Setting up the resume button
		this.resumeButton.position(1920/2, 1080/2)
		this.resumeButton.style('background-color', 'transparent'); 
		this.resumeButton.style('color', 'white'); 
		this.resumeButton.style('border', 'none'); 
		this.resumeButton.style('font-size', '25px');
		this.resumeButton.hide();		//Hides the button until pause menu is triggered


		// Setup exit Button
		this.exitButton.position(300,150)
		this.exitButton.style('background-color', 'transparent'); 
		this.exitButton.style('color', 'white'); 
		this.exitButton.style('border', 'none'); 
		this.exitButton.style('font-size', '25px');
		this.exitButton.hide();		//Hides the button until pause menu is triggered
	}

	/**
	 * Shows the menu and buttons
	 * 
	 * @param {*} CURRENTGAMESTATE 
	 */
	showMenu() {
		this.menu.visible = true;
		this.resumeButton.show();
		this.exitButton.show();
	}

	/**
	 * Hides the menu 
	 * 
	 */
	hideMenu() {
		this.resumeButton.hide();
		this.exitButton.hide();
		this.menu.visible = false;
	}


	/**
	 * Called when exit is clicked
	 * Takes you to the main menu
	 */
	exitGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "MENU";
	}


	/**
	 * Resumes the game when resume is clicked OR escape is pressed a second time
	 */
	resumeGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "PLAYING";

		return CURRENTGAMESTATE;
	}
}

class MainMenu {
	/**
	 * Default constructor, makes a background, resume and exit buttons
	 */
	constructor() {
		this.startButton = createButton('Start');
		this.tutorialButton = createButton('Tutorial')
		this.controlsButton = createButton('Controls')
		this.exitButton = createButton('Exit');

		//Backdrop to the menu
		this.menu = new Sprite(1920/2,1080/2,1920,1080);
		this.menu.layer = 3;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
		// this.menu.image = mainMenuBackground;
		// this.menu.collider = 'none';
		

		//Setting up the start button
		this.startButton.position(150, 100)
		this.startButton.style('background-color', 'transparent'); 
		this.startButton.style('color', 'white'); 
		this.startButton.style('border', 'none'); 
		this.startButton.style('font-size', '25px');
		this.startButton.hide();		//Hides the button until pause menu is triggered

		//Setting up the tutorial button
		this.tutorialButton.position(150, 150)
		this.tutorialButton.style('background-color', 'transparent'); 
		this.tutorialButton.style('color', 'white'); 
		this.tutorialButton.style('border', 'none'); 
		this.tutorialButton.style('font-size', '25px');
		this.tutorialButton.hide();		//Hides the button until pause menu is triggered

		//Setting up the controls button
		this.controlsButton.position(150, 200)
		this.controlsButton.style('background-color', 'transparent'); 
		this.controlsButton.style('color', 'white'); 
		this.controlsButton.style('border', 'none'); 
		this.controlsButton.style('font-size', '25px');
		this.controlsButton.hide();		//Hides the button until pause menu is triggered

		// Setup exit Button
		this.exitButton.position(150,250)
		this.exitButton.style('background-color', 'transparent'); 
		this.exitButton.style('color', 'white'); 
		this.exitButton.style('border', 'none'); 
		this.exitButton.style('font-size', '25px');
		this.exitButton.hide();		//Hides the button until pause menu is triggered
	}

	/**
	 * Shows the menu and buttons
	 * 
	 * @param {*} CURRENTGAMESTATE 
	 */
	showMenu() {
		this.menu.visible = true;
		this.startButton.show();
		this.tutorialButton.show();
		this.controlsButton.show();
		this.exitButton.show();
	}

	/**
	 * Hides the menu 
	 * 
	 */
	hideMenu() {
		this.startButton.hide();
		this.tutorialButton.hide();
		this.controlsButton.hide();
		this.exitButton.hide();
		this.menu.visible = false;
	}


	/**
	 * Called when exit is clicked
	 * Takes you to the main menu
	 */
	exitGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "MENU";
	}


	/**
	 * Resumes the game when resume is clicked OR escape is pressed a second time
	 */
	startGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = 'PLAYING';

		return CURRENTGAMESTATE;
	}
}

function resumeClicked() {
	alert("Resuming!");
}
