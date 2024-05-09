let bricks, tilesGroup;
let enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let INVENTORYRENDERED = false;
const PLAYERSPEED = 9;
let gameMap;
const CANVAS_WIDTH_PX=1920;
const CANVAS_HEIGHT_PX=1080;
let darknessSprite;
// Main Menu Assets
let upWalking1, upWalking2, upWalking3, upWalking4, upWalking5, upWalking6, upWalking7, upWalking8, upWalking9;
let lefWalking1, leftWalking2, leftWalking3, leftWalking4, leftWalking5, leftWalking6, leftWalking7, leftWalking8, leftWalking9;
let rightWalking1, rightWalking2, rightWalking3, rightWalking4, rightWalking5, rightWalking6, rightWalking7, rightWalking8, rightWalking9;
let downWallking1, downWalking2, downWalking3, downWalking4, downWalking5, downWalking6, downWalking7, downWalking8, downWalking9;

// MENU, PLAYING, INVENTORY, PAUSED
let d,e,l,o,z,i,r = false;
let delozierMode = false;
let GIANTEYESPAWNED = false;
let GAMESTATE = "MENU";
let inventory;
let key, gun, bullets, trinket, bulletItem, flashlight;
let healthBar;
let fullHealth, twoHealth, oneHealth, deadHealth;
let mainMenu;
let pauseMenu;
let settingsMenu;
let winMenu;
let CreepyPiano1, CreepyPiano2;
let mainMenuSound;
let trapDoorImage;
let cellBarsImage;
let laserEyeBeam;
let laser
//needs to be false when game is ready to play, is false for testing.
function preload() {
	//player animations from assets/PlayerAnimations
	upWalking1 = loadImage('assets/PlayerAnimations/upWalking/1.png');
	upWalking2 = loadImage('assets/PlayerAnimations/upWalking/2.png');
	upWalking3 = loadImage('assets/PlayerAnimations/upWalking/3.png');
	upWalking4 = loadImage('assets/PlayerAnimations/upWalking/4.png');
	upWalking5 = loadImage('assets/PlayerAnimations/upWalking/5.png');
	upWalking6 = loadImage('assets/PlayerAnimations/upWalking/6.png');
	upWalking7 = loadImage('assets/PlayerAnimations/upWalking/7.png');
	upWalking8 = loadImage('assets/PlayerAnimations/upWalking/8.png');
	upWalking9 = loadImage('assets/PlayerAnimations/upWalking/9.png');
	leftWalking1 = loadImage('assets/PlayerAnimations/leftWalking/1.png');
	leftWalking2 = loadImage('assets/PlayerAnimations/leftWalking/2.png');
	leftWalking3 = loadImage('assets/PlayerAnimations/leftWalking/3.png');
	leftWalking4 = loadImage('assets/PlayerAnimations/leftWalking/4.png');
	leftWalking5 = loadImage('assets/PlayerAnimations/leftWalking/5.png');
	leftWalking6 = loadImage('assets/PlayerAnimations/leftWalking/6.png');
	leftWalking7 = loadImage('assets/PlayerAnimations/leftWalking/7.png');
	leftWalking8 = loadImage('assets/PlayerAnimations/leftWalking/8.png');
	leftWalking9 = loadImage('assets/PlayerAnimations/leftWalking/9.png');
	rightWalking1 = loadImage('assets/PlayerAnimations/rightWalking/1.png');
	rightWalking2 = loadImage('assets/PlayerAnimations/rightWalking/2.png');
	rightWalking3 = loadImage('assets/PlayerAnimations/rightWalking/3.png');
	rightWalking4 = loadImage('assets/PlayerAnimations/rightWalking/4.png');
	rightWalking5 = loadImage('assets/PlayerAnimations/rightWalking/5.png');
	rightWalking6 = loadImage('assets/PlayerAnimations/rightWalking/6.png');
	rightWalking7 = loadImage('assets/PlayerAnimations/rightWalking/7.png');
	rightWalking8 = loadImage('assets/PlayerAnimations/rightWalking/8.png');
	rightWalking9 = loadImage('assets/PlayerAnimations/rightWalking/9.png');
	downWalking1 = loadImage('assets/PlayerAnimations/downWalking/1.png');
	downWalking2 = loadImage('assets/PlayerAnimations/downWalking/2.png');
	downWalking3 = loadImage('assets/PlayerAnimations/downWalking/3.png');
	downWalking4 = loadImage('assets/PlayerAnimations/downWalking/4.png');
	downWalking5 = loadImage('assets/PlayerAnimations/downWalking/5.png');
	downWalking6 = loadImage('assets/PlayerAnimations/downWalking/6.png');
	downWalking7 = loadImage('assets/PlayerAnimations/downWalking/7.png');
	downWalking8 = loadImage('assets/PlayerAnimations/downWalking/8.png');
	downWalking9 = loadImage('assets/PlayerAnimations/downWalking/9.png');
	delozierFace = loadImage('assets/greg.png');
	InventoryBackground = loadImage('assets/InventoryBackground.png');
	trinketImage = loadImage('assets/Artifact.png')
	fullHealth = loadImage('assets/Health_Eye_Full.png');
	twoHealth = loadImage('assets/Health_Eye_2.png');
	oneHealth = loadImage('assets/Health_Eye_1.png');
	deadHealth = loadImage('assets/Health_Eye_0.png');
	keyImage = loadImage('assets/key.png');
	brickImage = loadImage('assets/rooms/tiles/woodTile_Dark.png');
	flashlightImage = loadImage('assets/Flashlight.png');
	trapDoorImage = loadImage('assets/rooms/tiles/trapdoor.png');
	floorBoardImage = loadImage("assets//rooms/tiles/wood_crossed_large.png");
	cellBarsImage = loadImage("assets/cellBars.jpg");
	gunImage = loadImage("assets/shotgun.png");
	doorImage=loadImage("assets/rooms/tiles/tileDoorway_brown.png");
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
	chaseMusic = loadSound('assets/audio/chaseMusic.mp3');
	chaseMusic.setVolume(0.1);
	doorCreak = loadSound('assets/audio/door-opening-and-closing-18398.mp3');
	doorCreak.setVolume(0.3);
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
	inventory.insertItem(flashlight, inventory.hasSpace(flashlight.InventoryX,flashlight.InventoryY))
	flashlight.itemSprite.visible = false;
	flashlight.itemSprite.x = 100;
	key = new Item(CANVAS_WIDTH_PX/2 ,CANVAS_HEIGHT_PX*4 - 500, "Key", 1,1,10,5,keyImage);
	gun = new Item(CANVAS_WIDTH_PX * 5 + 500,CANVAS_HEIGHT_PX - 400, "Gun", 2,1,33,6,gunImage);
	bulletItem = new Item(CANVAS_WIDTH_PX * 5 + 500,CANVAS_HEIGHT_PX - 400, "Bullet", 1,1,4,3,bulletImage);
	trinket = new Item(-100,0, "Trinket", 1,1,87,115, trinketImage);
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

	//Makes a new win menu
	winMenu = new WinMenu();

}

function draw() {
	if(kb.presses("d")) d = true;
	if(kb.presses("e")) e = true;
	if(kb.presses("l")) l = true;
	if(kb.presses("o")) o = true;
	if(kb.presses("z")) z = true;
	if(kb.presses("i")) i = true;
	if(kb.presses("r")) r = true;

	if(!delozierMode && d && e && l && o && r && i && z){
		textBox("Delozier Mode Activated You now have 1000000 health")
		delozierMode = true;
		player.health = 1000000;
	}
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
	else if (GAMESTATE == "WON") {
		winFunctionality();
	}

	/* TODO - FOR THE SETTINGS TRIGGER
	/*else if (GAMESTATE == 'SETTINGS') {

	}*/
}	

