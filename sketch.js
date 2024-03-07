let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let flashlight;
let INVENTORYRENDERED = false;
const PLAYERSPEED = 3;
let gameMap;
let inventory;
let key
let GAMESTATE = "MENU";

let pauseMenu;

// Main Menu Assets
// MENU PLAYING or PAUSED
let mainMenu;
let startButton;
let tutorialButton;
let controlsButton;
let quitButton;
let resumeButton;
let exitButton;

function preload() {
	brickImage = loadImage('./assets/WallRoughDraft.png');
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

function setup() {
	createCanvas(1920,1080,document.getElementById("game"));
	noSmooth(); // removes smoothing to maintain pixelated look
	canvas.style = ""; // removes default canvas styling
	fadeScreen = createFadeScreen(); //Creates a screen that's black and fades in and out with the fadeInAndOut function
	gameMap=new GameMap();
	gameMap.render();
	// roomControl = new RoomController();

	player = setupPlayer();
	// darkness overlay
	darknessSprite = darkness();
	darknessSprite.layer = 0;
	
	playerMovement = new MovementController(player,PLAYERSPEED,true);

	setupStaticEnemyList();
	
	//Remove to turn off debug mode
	// turnOnDebugMode(true, true);

	// Main menu controller
	mainMenu = new MainMenu();

	//Pause menu controller
	pauseMenu = new PauseMenu();
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
	else if (GAMESTATE == 'PLAYING') {
		clear();
		fadeInAndOut(fadeScreen);
		movementSounds(player,footsteps);
		playerMovement.handleInput();
		if(kb.presses('o')) spawnEnemyAt(1, player.x - 50, player.y - 50);
		enemyHandler();
		darknessSprite.opacity = 0.7;
		darknessSprite.x = player.x;
		darknessSprite.y = player.y;
		image(darknessSprite.img, player.x, player.y, darknessSprite.width, darknessSprite.height);
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
			inventory.removeItem(flashlight, true);
			console.log("This is the inventory after Flashlight is removed")
			console.log(inventory.inventory);
			inventory.remove();
			inventory.renderInventory();
		} 
		dragItem(flashlight);
		dragItem(key);
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
		});
		
		

		if(kb.pressed('l')){
			GAMESTATE = pauseMenu.resumeGame(GAMESTATE);
			
		} 
	}
}	



