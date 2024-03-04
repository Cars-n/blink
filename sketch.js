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
// MENU PLAYING or PAUSED
let GAMESTATE = "MENU";
let mainMenu;
let startButton;
let tutorialButton;
let controlsButton;
let quitButton;
let inventory;
let key

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
	mainMenuBackground = loadImage("assets/Main-Menu-Background2.png")
}
const SPAWNX=6;
const SPAWNY=5;

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
	flashlight = new Item(500,500, "FlashLight", 2,1,20,8,flashlightImage);
	flashlight.itemSprite.rotation = -90;
	key = new Item(1000,500, "Key", 1,1,10,5,keyImage);
	// darkness overlay
	
	playerMovement = new MovementController(player,PLAYERSPEED,true);

	setupStaticEnemyList();
	darknessSetup();
	//Remove to turn off debug mode
	// turnOnDebugMode(true, true);
	
	// Main Menu Setup
	//Creates Room Controller. 
	mainMenu = new Sprite(1920/2, 1080/2, 1920,1080);
	mainMenu.image = mainMenuBackground;
	mainMenu.layer = 3;
	mainMenu.collider = 'none';

	// Setup Start Button
	startButton = createButton('Start');
	startButton.position(200,100)
	startButton.style('background-color', 'transparent'); 
	startButton.style('color', 'white'); 
	startButton.style('border', 'none'); 
	startButton.style('font-size', '25px'); 

	// Setup Tutorial Button
	tutorialButton = createButton('Tutorial');
	tutorialButton.position(200,150)
	tutorialButton.style('background-color', 'transparent'); 
	tutorialButton.style('color', 'white'); 
	tutorialButton.style('border', 'none'); 
	tutorialButton.style('font-size', '25px'); 

	// Setup Controls Button
	controlsButton = createButton('Controls');
	controlsButton.position(200,200)
	controlsButton.style('background-color', 'transparent'); 
	controlsButton.style('color', 'white'); 
	controlsButton.style('border', 'none'); 
	controlsButton.style('font-size', '25px'); 

	// Setup Quit Button
	quitButton = createButton('Quit');
	quitButton.position(200,250)
	quitButton.style('background-color', 'transparent'); 
	quitButton.style('color', 'white'); 
	quitButton.style('border', 'none'); 
	quitButton.style('font-size', '25px'); 

	
}

function draw() {
	// console.log("FPS:",1000/deltaTime);
	if (GAMESTATE === 'MENU') {
		// Draw menu

		if(mouse.presses()){
			GAMESTATE = 'PLAYING';

			// remove 
			mainMenu.remove();
			startButton.remove();
			tutorialButton.remove();
			controlsButton.remove();
			quitButton.remove();
			moveCamera("right",SPAWNX);
			moveCamera("down",SPAWNY);
		}
	} else if (GAMESTATE === 'PLAYING') {
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
			if (inventory.insertItem(flashlight, inventory.hasSpace(flashlight.InventoryX,flashlight.InventoryY))) flashlight.itemSprite.visible = false;
		}
		if(player.overlaps(key.itemSprite)){
			if (inventory.insertItem(key, inventory.hasSpace(key.InventoryX,key.InventoryY))) key.itemSprite.visible = false;
		}

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
}	
