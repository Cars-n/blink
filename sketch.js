let bricks, tilesGroup;
let enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let flashlight;
let INVENTORYRENDERED = false;
const PLAYERSPEED = 15;
let gameMap;
const CANVAS_WIDTH_PX=1920;
const CANVAS_HEIGHT_PX=1080;
let darknessSprite;
// Main Menu Assets
// MENU, PLAYING, INVENTORY, PAUSED
let GIANTEYESPAWNED = false;
let GAMESTATE = "MENU";
let inventory;
let key;
let gun;
let healthBar;
let bulletItem;
let mainMenu;
let pauseMenu;
let settingsMenu;
let CreepyPiano1;
let mainMenuSound;
let CreepyPiano2;
let trapDoorImage;
let cellBarsImage;
let bullets;
let laserEyeBeam;
let laser
let trinket;
let fullHealth, twoHealth, oneHealth, deadHealth;
//needs to be false when game is ready to play, is false for testing.
console.log("FIX THIS VALUE");
let ENEMY42SPAWED = true;
function preload() {

	InventoryBackground = loadImage('assets/InventoryBackground.png');
	fullHealth = loadImage('assets/Health_Eye_Full.png');
	twoHealth = loadImage('assets/Health_Eye_2.png');
	oneHealth = loadImage('assets/Health_Eye_1.png');
	deadHealth = loadImage('assets/Health_Eye_0.png');

	keyImage = loadImage('assets/key.png');
	brickImage = loadImage('assets/WallRoughDraft.png');
	flashlightImage = loadImage('assets/Flashlight.png');
	trapDoorImage = loadImage('assets/rooms/tiles/trapdoor.png');
	floorBoardImage = loadImage("assets/floortiles.png");
	cellBarsImage = loadImage("assets/cellBars.jpg");
	gunImage = loadImage("assets/shotgun.png");
	doorImage=loadImage("assets/Door.png");
	bulletImage = loadImage("assets/bullet.png");
	flashlight = loadImage("assets/darknessFlashlight.svg");
	eyesight = loadImage("assets/darknessEyesight.svg");
	soundFormats('mp3','wav', 'ogg');
	CreepyPiano1 = loadSound('assets/audio/Piano_dissonent.wav');
	CreepyPiano1.setVolume(1);
	CreepyPiano2 = loadSound('assets/audio/Piano_dissonent2.wav');
	CreepyPiano2.setVolume(1);
	mainMenuSound = loadSound('assets/audio/forest.ogg')
	mainMenuSound.setVolume(0.1);
	doorCreak = loadSound('assets/audio/doorCreak.mp3');
	doorCreak.setVolume(0.5);
	footsteps = loadSound('assets/audio/footsteps.mp3');
	footsteps.setVolume(0.5);
	mainMenuBackground = loadImage("assets/Main-Menu-Background2.png");

	// load furniture / prop images
	bookshelf = loadImage("assets/rooms/props/Blink_PropBooksh1.png");
	bookshelf1 = loadImage("assets/rooms/props/Blink_PropBooksh2.png");
	drawer = loadImage("assets/rooms/props/Blink_PropD.png");
	drawer1 = loadImage("assets/rooms/props/Blink_PropDr.png");
	drawer1Open = loadImage("assets/rooms/props/Blink_PropDrOpen.png");
	carpet = loadImage("assets/rooms/props/Blink_PropLC.png");
	table = loadImage("assets/rooms/props/Blink_PropTable.png");
	window1 = loadImage("assets/rooms/props/Blink_PropWindow.png");
	window2 = loadImage("assets/rooms/props/Blink_PropSpookyWindow2.png");
	shelf = loadImage("assets/rooms/props/Blink_PropShelf.png");
	shelves = loadImage("assets/rooms/props/Blink_PropS.png");
	cabinet = loadImage("assets/rooms/props/Blink_SpriteClosedCab.png");
	openCabinet - loadImage("assets/rooms/props/Blink_SpriteOpenCab.png");
	chair = loadImage("assets/rooms/props/Blink_PropChair.png");
	chairRight = loadImage("assets/rooms/props/Blink_PropChairRight.png");
	painting1 = loadImage("assets/rooms/props/Blink_PropPainting1.png");
	painting2 = loadImage("assets/rooms/props/Blink_PropPainting2.png");
	fireplace = loadImage("assets/rooms/props/Blink_PropFireplace.png");
	mirror = loadImage("assets/rooms/props/Blink_PropMirror.png");
	dresser = loadImage("assets/rooms/props/Blink_PropSpookyDresser.png");
	wallLamp = loadImage("assets/rooms/props/Blink_PropSpookyWallLamp.png");
	bed = loadImage("assets/rooms/props/Blink_PropBed.png");
	drink = loadImage("assets/rooms/props/Blink_PropDrink.png");
	bigBookshelf = loadImage("assets/rooms/props/Blink_PropBigBookshelf.png");
	dinnerTable = loadImage("assets/rooms/props/Blink_DinnerTable.png");
	dishCabinet = loadImage("assets/rooms/props/Blink_DishCabinet.png");
	drinkShelf = loadImage("assets/rooms/props/Blink_DrinkShelf.png");
	stove = loadImage("assets/rooms/props/Blink_Stove.png");
	kitchenCabinet = loadImage("assets/rooms/props/Blink_KitchenCabinet.png");
	table2 = loadImage("assets/rooms/props/Blink_Table2.png");
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
	
	// roomControl = new RoomControcller();
	inventory = new InventoryController();	
	player = setupPlayer(SPAWNX,SPAWNY);
	fadeScreen.x = player.x;
	fadeScreen.y = player.y;
	flashlight = new Item(player.x + 50,player.y + 50, "FlashLight", 2,1,8,20,flashlightImage);
	flashlight.itemSprite.debug=false;
	key = new Item(CANVAS_WIDTH_PX/2 ,CANVAS_HEIGHT_PX*4 - 500, "Key", 1,1,10,5,keyImage);
	key.itemSprite.debug=false;
	gun = new Item(CANVAS_WIDTH_PX * 5 + 500,CANVAS_HEIGHT_PX - 400, "Gun", 2,1,33,6,gunImage);

	bulletItem = new Item(CANVAS_WIDTH_PX * 5 + 500,CANVAS_HEIGHT_PX - 400, "Bullet", 1,1,4,3,bulletImage);
	trinket = new Item(0,0, "Trinket", 1,1,10,10, "assets/GrimReaper.png");
	// darkness overlay
	trinket.itemSprite.overlaps(RoomController.wallTile.group);
	key.itemSprite.overlaps(RoomController.wallTile.group);

	gun.itemSprite.overlaps(RoomController.wallTile.group);

	flashlight.itemSprite.overlaps(RoomController.wallTile.group);

	bulletItem.itemSprite.overlaps(RoomController.wallTile.group);

	playerMovement = new MovementController(player,PLAYERSPEED,true);

	healthBar = new Sprite(150,950,100,100);
	healthBar.img = fullHealth;
	healthBar.collider = "none";
	healthBar.layer = PLAYER_LAYER;
	setupStaticEnemyList();

	darknessSetup();
	//Remove to turn off debug mode
	// turnOnDebugMode(true, true);

	mainMenuBackground.resize(1920,1080);
	mainMenu = new MainMenu();
	BlinkViewer = new BlinkViewer();

	//Makes a pause menu screen
	pauseMenu = new PauseMenu();

	//creates group for bullets
	setUpBullets();

	//Makes a new settings menu
	settingsMenu = new SettingsMenu();

}

function draw() {
	// console.log("FPS:",1000/deltaTime);
	if (GAMESTATE == "MENU") {
		menuFunctionality();
	} 
	else if (GAMESTATE === "BLINKVIEW"){
		videoCheckFunctionality();
	}
	else if (GAMESTATE === 'PLAYING') {
		clear();
		playingFunctionality();
	}
    else if (GAMESTATE == "INVENTORY"){
		inventoryFunctionality();
		clear();
	} 
	else if (GAMESTATE == "PAUSE") {
		pauseFunctionality();
	}

	/* TODO - FOR THE SETTINGS TRIGGER
	/*else if (GAMESTATE == 'SETTINGS') {

	}*/
}	

