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
		this.settingsMenu.layer = 6;		//ONE LAYER HIGHER THAN PAUSE MENU TO DISPLAY OVER IT
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
		this.menu.layer = 5;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
        this.menu.visible = false;
        this.menu.collider = 'none';

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

	/**
	 * 
	 */
	settingsToggle(SETTINGSMENU, CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "SETTINGS";
		//SETTINGSMENU.showSettings();
		return CURRENTGAMESTATE;

	}

}