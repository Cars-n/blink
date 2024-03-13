/**
 * 
 */


/**
 * Class for the settings sub menu
 */
class SettingsMenu {

	constructor() {
		//Creating all of the buttons, sliders, controls, etc. needed for the menu
		this.exitButton = createButton("Exit");


		//Sets up the background sprite to mask over the pause menu
		this.settingsMenu = new Sprite(1920/2,1080/2,1920,1080);
		this.settingsMenu.layer = SETTINGS_LAYER;		//ONE LAYER HIGHER THAN PAUSE MENU TO DISPLAY OVER IT
		this.settingsMenu.opacity = 0.4;
		this.settingsMenu.color = 'green';
        this.settingsMenu.visible = false;
        this.settingsMenu.collider = 'none';

		// Setup exit Button
		this.exitButton.position(300,300)
		this.exitButton.style('background-color', 'transparent'); 
		this.exitButton.style('color', 'white'); 
		this.exitButton.style('border', 'none'); 
		this.exitButton.style('font-size', '25px');
		this.exitButton.hide();		//Hides the button until pause menu is triggered

	}

	/**
	 * Makes all of the components of the settings menu visible
	 */
	showSettings() {
		if (this.settingsMenu.visible == false) {
			this.settingsMenu.visible = true;
			this.exitButton.show();
		}
	}


	/**
	 * Hides the components and menu background of the settings
	 */
	hideSettings() {
		if (this.settingsMenu.visible == true) {
			this.settingsMenu.visible = false;
			this.exitButton.hide();
		}
	}

	/**
	 * Closes the settings submenu of the pause menu
	 * 
	 * @param {*} CURRENTGAMESTATE 
	 * @returns The PAUSE game state
	 */
	exitSettings(CURRENTGAMESTATE) {
		this.hideSettings();
		CURRENTGAMESTATE = "PAUSE";

		return CURRENTGAMESTATE;
	}
}


/**
 * Class to handle the control of the pause menu and actions in the menu
 */
class PauseMenu {
	/**
	 * Default constructor, makes a background, resume and exit buttons
	 */
	constructor() {
		this.resumeButton = createButton('Resume');
		this.exitButton = createButton('Exit');
		this.settingsButton = createButton('Settings');

		//Backdrop to the menu
		this.menu = new Sprite(1920/2,1080/2,1920,1080);
		this.menu.layer = PAUSE_LAYER;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
        this.menu.visible = false;
        this.menu.collider = 'none';

		//Setting up the resume button
		this.resumeButton.class("Resume");
		//this.resumeButton.position(1920/2, 1080/2)
		this.resumeButton.style('background-color', 'transparent');
		this.resumeButton.style('display', 'grid'); 
		this.resumeButton.style('color', 'white'); 
		this.resumeButton.style('border', 'none'); 
		this.resumeButton.style('font-size', '25px');
		//adding in the css class
		
		this.resumeButton.hide();		//Hides the button until pause menu is triggered


		// Setup exit Button
		this.exitButton.position(300,150)
		this.exitButton.style('background-color', 'transparent'); 
		this.exitButton.style('color', 'white'); 
		this.exitButton.style('border', 'none'); 
		this.exitButton.style('font-size', '25px');
		this.exitButton.hide();		//Hides the button until pause menu is triggered

		// Setup settings Button
		this.settingsButton.position(300,200)
		this.settingsButton.style('background-color', 'transparent'); 
		this.settingsButton.style('color', 'white'); 
		this.settingsButton.style('border', 'none'); 
		this.settingsButton.style('font-size', '25px');
		this.settingsButton.hide();		//Hides the button until pause menu is triggered
	}

	/**
	 * Shows the menu and buttons
	 * 
	 */
	showMenu() {
		if (this.menu.visible == false) {
			this.menu.visible = true;
			this.resumeButton.show();
			this.exitButton.show();
			this.settingsButton.show();
		}
	}
	
	/**
	 * Hides the menu 
	 * 
	*/
	hideMenu() {
		if (this.menu.visible == true) {
			this.resumeButton.hide();
			this.menu.visible = false;
			this.exitButton.hide();
			this.settingsButton.hide();
		}	
	}


	/**
	 * Exits the player from the game and returns them to the menu
	 * 
	 * @param {*} CURRENTGAMESTATE 
	 * @returns The "MENU" game state
	 */
	exitGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "MENU";
		return 	CURRENTGAMESTATE;
	}


	/**
	 * Resumes game play and closes the pause menu
	 * 
	 * @param {*} CURRENTGAMESTATE 
	 * @returns The "PLAYING" game state
	 */
	resumeGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "PLAYING";

		return CURRENTGAMESTATE;
	}

	/**
	 * Toggles the settings sub menu
	 * 
	 * @param {*} SETTINGSMENU 
	 * @param {*} CURRENTGAMESTATE 
	 * @returns The "SETTINGS" game state
	 */
	settingsToggle(SETTINGSMENU, CURRENTGAMESTATE) {
		this.hideMenu();
		//CURRENTGAMESTATE = "SETTINGS";
		//SETTINGSMENU.showSettings();
		//return CURRENTGAMESTATE;

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
		this.menu.layer = MAIN_MENU_LAYER;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
		this.menu.image = mainMenuBackground;
		this.menu.collider = 'none';
		

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
