let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let flashlight;
let INVENTORYRENDERED = false;
const PLAYERSPEED = 3;
let menuScreen;
let gameMap;
const CANVAS_WIDTH_PX=1920;
const CANVAS_HEIGHT_PX=1080;
let darknessSprite;
// Main Menu Assets
// MENU, PLAYING, INVENTORY, PAUSED
let GAMESTATE = "MENU";
let mainMenu;
let startButton;
let tutorialButton;
let controlsButton;
let quitButton;
let inventory;
let key;

let pauseMenu;
let settingsMenu;

function preload() {
	InventoryBackground = loadImage('assets/InventoryBackground.png');
	keyImage = loadImage('assets/key.png');
	brickImage = loadImage('assets/WallRoughDraft.png');
	flashlightImage = loadImage('assets/Flashlight.png');
	floorBoardImage = loadImage("assets/floortiles.png");
	doorImage=loadImage("assets/Door.png");
	darknessImage = loadImage("assets/darkness.svg");
	soundFormats('mp3');
	doorCreak = loadSound('assets/audio/doorCreak.mp3');
	doorCreak.setVolume(0.5);
	footsteps = loadSound('assets/audio/footsteps.mp3');
	footsteps.setVolume(0.5);

	// Main Menu Preload
	// load background of main menu 
	mainMenuBackground = loadImage("assets/Main-Menu-Background2.png");


}
const SPAWNX=0;
const SPAWNY=0;

function setup() {
	createCanvas(CANVAS_WIDTH_PX,CANVAS_HEIGHT_PX,document.getElementById("game"));
	noSmooth(); // removes smoothing to maintain pixelated look
	canvas.style = ""; // removes default canvas styling
	fadeScreen = createFadeScreen(); //Creates a screen that's black and fades in and out with the fadeInAndOut function
	//Creates Room Controller. 
	
	gameMap=new GameMap();
	gameMap.loadRoom(SPAWNX,SPAWNY);
	// roomControl = new RoomController();
	inventory = new InventoryController();	
	player = setupPlayer(SPAWNX,SPAWNY);
	fadeScreen.x = player.x;
	fadeScreen.y = player.y;
	flashlight = new Item(player.x + 50,player.y + 50, "FlashLight", 2,1,8,20,flashlightImage);
	flashlight.itemSprite.debug=true;
	key = new Item(player.x + 100 ,player.y, "Key", 1,1,10,5,keyImage);
	key.itemSprite.debug=true;

	// darkness overlay
	
	playerMovement = new MovementController(player,PLAYERSPEED,true);

	setupStaticEnemyList();
	darknessSetup();
	//Remove to turn off debug mode
	// turnOnDebugMode(true, true);

	mainMenuBackground.resize(1920,1080);
	mainMenu = new MainMenu();

	//Makes a pause menu screen
	pauseMenu = new PauseMenu();

	//Makes a new settings menu
	settingsMenu = new SettingsMenu();
}

function draw() {
	// console.log("FPS:",1000/deltaTime);
	if (GAMESTATE == "MENU") {
		console.log("MAIN");

		player.velocity.y = 0;
		player.velocity.x = 0;
		player.changeAni("idle_" + playerMovement.lastDirection);
		movementSounds(player,footsteps);

		mainMenu.showMenu();

		mainMenu.startButton.mousePressed(() => {
			GAMESTATE = mainMenu.startGame(GAMESTATE);
		});

		mainMenu.exitButton.mousePressed(() => {		
			/* TODO - LEFT OPEN FOR THE MAIN MENU METHODS TO DISPLAY */
			alert("What, got to scared and quit?");
		});
		
		if(kb.pressed('l')){
			GAMESTATE = mainMenu.startGame(GAMESTATE);		
		} 
	} 
	else if (GAMESTATE === 'PLAYING') {
		clear();
		fadeInAndOut(fadeScreen);
		movementSounds(player,footsteps);
		playerMovement.handleInput();
		if(kb.presses('o')) spawnEnemyAt(1, player.x - 50, player.y - 50);
		enemyHandler();
		darknessDraw(player.x, player.y, player.velocity.x, player.velocity.y);
		if(kb.pressed('e')) {
			GAMESTATE = "INVENTORY";
		}
		if(player.overlaps(flashlight.itemSprite)){
			if (inventory.insertItem(flashlight, inventory.hasSpace(flashlight.InventoryX,flashlight.InventoryY))){
				flashlight.itemSprite.visible = false;
				flashlight.itemSprite.x = 100;
			} 
		}
		if(player.overlaps(key.itemSprite)){
			if (inventory.insertItem(key, inventory.hasSpace(key.InventoryX,key.InventoryY))) key.itemSprite.visible = false;
		}


		//Pause handle
		if (kb.pressed('escape')) GAMESTATE = "PAUSE";

	}
    else if (GAMESTATE == "INVENTORY"){
		player.velocity.y = 0;
		player.velocity.x = 0;
		player.changeAni("idle_" + playerMovement.lastDirection);
		movementSounds(player,footsteps);
		if(!INVENTORYRENDERED){
			inventory.renderInventory();
			INVENTORYRENDERED = true;
		}
		if(kb.pressed('e')){
			inventory.remove();
			INVENTORYRENDERED = false;
			playerMovement.moveSpeed = 3;
			GAMESTATE = "PLAYING";
		} 
		if(kb.pressed('r')){
			console.log(inventory.inventory);
		} 
		dragItem(flashlight, inventory);
		dragItem(key, inventory);
	} 
	else if (GAMESTATE == "PAUSE") {
		console.log("PAUSED");

		player.velocity.y = 0;
		player.velocity.x = 0;
		player.changeAni("idle_" + playerMovement.lastDirection);
		movementSounds(player,footsteps);

		pauseMenu.showMenu();

		pauseMenu.resumeButton.mousePressed(() => {
			GAMESTATE = pauseMenu.resumeGame(GAMESTATE);
		
		});


		pauseMenu.exitButton.mousePressed(() => {
			
			/* TODO - LEFT OPEN FOR THE MAIN MENU METHODS TO DISPLAY */
			alert("What, got to scared and quit?");
			GAMESTATE = pauseMenu.exitGame(GAMESTATE);
		});
		

		pauseMenu.settingsButton.mousePressed(() => {
			alert("The settings screen is under progress and will be done soon! :)");
			//GAMESTATE = pauseMenu.settingsToggle(settingsMenu, GAMESTATE);

		});
		

		if(kb.pressed('escape')){
			GAMESTATE = pauseMenu.resumeGame(GAMESTATE);
			
		} 
	}

	/* TODO - FOR THE SETTINGS TRIGGER
	/*else if (GAMESTATE == 'SETTINGS') {

	}*/
}	

