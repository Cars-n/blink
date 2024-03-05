let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let notPlayer;
const PLAYERSPEED = 10;
let MAINMENULOADED = true;
let menuScreen;
let gameMap;
const CANVAS_WIDTH_PX=1920;
const CANVAS_HEIGHT_PX=1080;


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

const SPAWNX=6;
const SPAWNY=6;

function setup() {
	createCanvas(CANVAS_WIDTH_PX,CANVAS_HEIGHT_PX,document.getElementById("game"));
	noSmooth(); // removes smoothing to maintain pixelated look
	canvas.style = ""; // removes default canvas styling
	fadeScreen = createFadeScreen(); //Creates a screen that's black and fades in and out with the fadeInAndOut function
	//Creates Room Controller. 
	menuScreen = createMenuScreen();
	
	gameMap=new GameMap();
	
	// roomControl = new RoomController();
	player = setupPlayer(SPAWNX,SPAWNY);
	
	// darkness overlay
	darknessSprite = darkness();
	darknessSprite.layer = 3;
	// darknessSprite.position.x=player.x;
	playerMovement = new MovementController(player,PLAYERSPEED,true);

	setupStaticEnemyList();
	
	//Remove to turn off debug mode
	// turnOnDebugMode(true, true);
	
	
}

function draw() {
	// console.log("FPS:",1000/deltaTime);
	clear();
	if(mouse.presses() &&MAINMENULOADED != false){
		MAINMENULOADED = false;
		
		menuScreen.remove();
		moveCamera("right",SPAWNX);
		moveCamera("down",SPAWNY);
		gameMap.loadRoom(SPAWNX,SPAWNY);
		// darknessSprite.opacity = 0.7;
	}
	if(MAINMENULOADED == false){
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
	console.log(player.room)
}
