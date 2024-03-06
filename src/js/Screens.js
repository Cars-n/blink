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
	}

	/**
	 * Shows the menu and buttons
	 * 
	 * @param {*} CURRENTGAMESTATE 
	 */
	showMenu() {
		if (this.menu.visible == false) {
			this.menu.visible = true;
			this.resumeButton.show();
			this.exitButton.show();
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
}