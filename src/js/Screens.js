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
		//Backdrop to the menu
		this.menu = new Sprite(1920/2,1080/2,1920,1080);
		this.menu.layer = PAUSE_LAYER;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
        this.menu.visible = false;
        this.menu.collider = 'none';

		this.pauseTitle = createButton("PAUSE");
		this.pauseTitle.class("PauseH1");
		this.pauseTitle.attribute('name', 'pauseHeader');
		this.pauseTitle.position(600,50);
		this.pauseTitle.hide();

		//Make div to then put each button under
		this.resumeButtonDiv = createDiv();
		this.resumeButtonDiv.id("resumeButton");
		this.resumeButtonDiv.class(">Resume");

		//Makes the button
		this.resumeButton = createButton('>Resume');
		this.resumeButton.attribute('name', 'resume');
		this.resumeButton.class("PauseMenuButtons");
		this.resumeButtonDiv.center();
		this.resumeButtonDiv.position(510,330);	// x, y
	
		//Sets parent and hides div
		this.resumeButton.parent("resumeButton");
		this.resumeButtonDiv.hide();




		//Create the div to hold the button
		this.exitButtonDiv = createDiv();
		this.exitButtonDiv.id("exitButton");
		this.exitButtonDiv.class("Exit");
		//this.exitButtonDiv.center(); 
		

		// Setup exit Button
		this.exitButton = createButton('>Exit');
		this.exitButton.attribute('name', 'pauseExit');
		this.exitButton.class("PauseMenuButtons");
		this.exitButtonDiv.center();
		this.exitButtonDiv.position(715,350);	//x, y
		

		//Sets the parent and hides the div
		this.exitButton.parent("exitButton");
		this.exitButtonDiv.hide();




		//Create the div to hold the button
		this.settingsButtonDiv = createDiv();
		this.settingsButtonDiv.id("settingsButton");

		// Setup settings Button
		this.settingsButton = createButton('>Settings');
		this.settingsButton.attribute('name', 'pauseSettings');
		this.settingsButton.class("PauseMenuButtons");
		this.settingsButtonDiv.center();
		this.settingsButtonDiv.position(870,330);	// x, y

		//Sets the parent and hides the div
		this.settingsButton.parent("settingsButton");
		this.settingsButtonDiv.hide();


		//Together div
		this.buttonRowDiv = createDiv();
		this.buttonRowDiv.class("ButtonRowDiv");
		
	}

	/**
	 * Shows the menu and buttons
	 * 
	 */
	showMenu() {
			//Shows menu
			this.menu.visible = true;
			
			this.pauseTitle.show();
			
			//Sets divs to visible
			this.resumeButtonDiv.show();
			this.exitButtonDiv.show();
			this.settingsButtonDiv.show();
			
			//Shows buttons
			this.resumeButton.show();
			this.exitButton.show();
			this.settingsButton.show();
			
	}
	
	/**
	 * Hides the menu 
	 * 
	*/
	hideMenu() {
			//Hides buttons
			this.resumeButton.hide();
			this.exitButton.hide();
			this.settingsButton.hide();

			//Hides divs
			this.exitButtonDiv.hide();
			this.resumeButtonDiv.hide();
			this.settingsButtonDiv.hide();


			this.pauseTitle.hide();

			//Makes menu hide
			this.menu.visible = false;
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
		this.startButton = createButton('> Start');
		this.exitButton = createButton('> Exit');
		this.title = createButton('BLINK');

		//Backdrop to the menu
		this.menu = new Sprite(1920/2,1080/2,1920,1080);
		this.menu.layer = MAIN_MENU_LAYER;
		this.menu.opacity = 0.4;
		this.menu.color = 'black';
		this.menu.collider = 'none';

		this.title.class("H1");
		this.title.position(600,50);
		this.title.hide();

		//Setting up the start button
		this.startButton.class("MainMenuButtons");
		this.startButton.attribute("name", "start");

		this.startButton.position(675, 200)
		this.startButton.hide();		//Hides the button until pause menu is triggered

		// Setup exit Button
		this.exitButton.class("MainMenuButtons");
		this.exitButton.attribute("name", "exit");

		this.exitButton.position(675,250)
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
		this.exitButton.show();
		this.title.show();

	}

	/**
	 * Hides the menu 
	 * 
	 */
	hideMenu() {
		this.startButton.hide();
		this.exitButton.hide();
		this.title.hide();
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
	startBlinkView(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = 'BLINKVIEW';

		return CURRENTGAMESTATE;
	}
}


class BlinkViewer {
		/**
		 * Default constructor, makes a background, resume and exit buttons
		 */
		constructor() {
			this.OKButton = createButton('OK');
			this.sensitivitySlider = createSlider(100, 200, 130);
			this.title = createButton('BLINK');
	
			//Backdrop to the menu
			this.menu = new Sprite(1920/2,1080/2,1920,1080);
			this.menu.layer = MAIN_MENU_LAYER;
			this.menu.opacity = 1;
			this.menu.color = 'black';
			this.menu.collider = 'none';
	
			this.title.class("H1");
			this.title.attribute('name', 'title');
			this.title.position(600,50);
			this.title.hide();
	
			//Setting up the start button
			this.sensitivitySlider.class("MainMenuButtons");
			this.sensitivitySlider.attribute("name", "slider");
			this.sensitivitySlider.position(window.outerWidth/2, 1000)
			this.sensitivitySlider.hide();		//Hides the button until pause menu is triggered
	
			// Setup exit Button
			this.OKButton.class("MainMenuButtons");
			this.OKButton.attribute("name", "ok");
			this.OKButton.position(window.outerWidth/2 + 300,window.height-300)
			this.OKButton.hide();		//Hides the button until pause menu is triggered
			
		}
	
		/**
		 * Shows the menu and buttons
		 * 
		 * @param {*} CURRENTGAMESTATE 
		 */
		showMenu() {
			var element = document.querySelectorAll('[id=irrelevantCanvas]');
			var video = document.getElementById("video");
			element.forEach(element => {
			element.style.height = "70vh";
			element.style.width = "70vw";
			element.style.top = "15vh";
			element.style.left = "15vw";
			element.style.backgroundColor = "transparent";
			});
			video.style.height = "70vh";
			video.style.width = "70vw";
			video.style.top = "15vh";
			video.style.left = "15vw";

			this.menu.visible = true;
			this.OKButton.show();
			this.sensitivitySlider.show();
			this.title.show();
		}
	
		/**
		 * Hides the menu 
		 * 
		 */
		hideMenu() {
			var element = document.querySelectorAll('[id=irrelevantCanvas]');
			var video = document.getElementById("video");
			element.forEach(element => {
			element.style.height = "1px";
			element.style.width = "1px";
			element.style.top = "1px";
			element.style.left = "1px";
			element.style.backgroundColor = "black";
			});
			video.style.height = "1px";
			video.style.width = "1px";
			video.style.top = "1px";
			video.style.left = "1px";

			this.OKButton.hide();
			this.sensitivitySlider.hide();
			this.title.hide();
			this.menu.visible = false;
		}


	/**
	 * Called when exit is clicked
	 * Takes you to the main menu
	 */
	exitGame(CURRENTGAMESTATE) {
		this.hideMenu();
		CURRENTGAMESTATE = "BLINKVIEW";
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
