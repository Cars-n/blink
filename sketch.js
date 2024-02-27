let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let notPlayer;
const PLAYERSPEED = 3;
let MAINMENULOADED = true;
let menuScreen;
let gameMap;
let inventory;


function preload() {
	brickImage = loadImage('./assets/WallRoughDraft.png');
	floorBoardImage = loadImage("assets/floortiles.png");
	mainMenuImage = loadImage("assets/Menu_Screen_for_a_pixelated_Horror_game_named_Blink_Set_in_a_Haunted_Mansion.png")
	doorImage=loadImage("assets/Door.png");
	darknessImage = loadImage("assets/darkness.svg");
	soundFormats('mp3');
	doorCreak = loadSound('assets/audio/doorCreak.mp3');
	doorCreak.setVolume(0.5);
	footsteps = loadSound('assets/audio/footsteps.mp3');
	footsteps.setVolume(0.5);
}

function setup() {
	createCanvas(1920,1080,document.getElementById("game"));
	noSmooth(); // removes smoothing to maintain pixelated look
	canvas.style = ""; // removes default canvas styling
	fadeScreen = createFadeScreen(); //Creates a screen that's black and fades in and out with the fadeInAndOut function
	//Creates Room Controller. 
	menuScreen = createMenuScreen();
	gameMap=new GameMap();
	gameMap.render();
	// roomControl = new RoomController();
	inventory = new InventoryController();
	player = setupPlayer();
	let notPlayer = makeItem(player.x,player.y,50,50,'none')
	// darkness overlay
	darknessSprite = darkness();
	darknessSprite.layer = 0;
	
	playerMovement = new MovementController(player,PLAYERSPEED,true);

	setupStaticEnemyList();
	
	//Remove to turn off debug mode
	// turnOnDebugMode(true, true);
	
	
}

function draw() {
	// console.log("FPS:",1000/deltaTime);
	clear();
	if(mouse.presses()){
		MAINMENULOADED = false;
		menuScreen.remove();
	}
	if(MAINMENULOADED == false){
		fadeInAndOut(fadeScreen);
		movementSounds(player,footsteps);
		playerMovement.handleInput();
		if(kb.presses('o')) spawnEnemyAt(1, player.x - 50, player.y - 50);
		if(player.overlaps(notPlayer)){
		inventory.renderInventory();
			if(InventoryController.inventory)
		}
		darknessSprite.opacity = 0.4;
		darknessSprite.x = player.x;
		darknessSprite.y = player.y;
		image(darknessSprite.img, player.x, player.y, darknessSprite.width, darknessSprite.height);
	}

}
