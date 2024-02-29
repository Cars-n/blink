let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let notPlayer;
const PLAYERSPEED = 3;
let gameMap;

// Main Menu Assets
// MENU PLAYING or PAUSED
let gameState = 'MENU'
let mainMenu;

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
	
	// Main Menu Setup
	//Creates Room Controller. 
	mainMenu = new Sprite(1920/2, 1080/2, 1920,1080);
	mainMenu.image = mainMenuBackground;
	mainMenu.layer = 3;
	mainMenu.collider = 'none';
}

function draw() {
	// console.log("FPS:",1000/deltaTime);
	clear();
	if (gameState === 'MENU') {
		// Draw menu
		if(mouse.presses()){
			gameState = 'PLAYING';
			mainMenu.remove();
		}
	} else if (gameState === 'PLAYING') {
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
}

/*
function createMenuScreen() {
	// Create a new Sprite object that represents the menu background
	// Positioned at the center of the screen and spans the full screen size
	var menu = new Sprite(1920/2, 1080/2, 1920,1080);
  
	menu.image = mainMenuBackground;
	menu.layer = 3;
	menu.collider = 'none';

	return menu;
}
*/