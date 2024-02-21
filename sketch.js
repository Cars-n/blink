let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let notPlayer;


function preload() {
	brickImage = loadImage('./assets/sand-brick-tileset-texture.png');
	floorBoardImage = loadImage("assets/floorboards.png");
	doorImage=loadImage("assets/Door.png");
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
	roomControl = new RoomController();

	roomControl.renderMap();
	// new Player 
	player = setupPlayer();


	playerMovement = new MovementController(player,3,true);

	setupStaticEnemyList();
	
	
	//Remove to turn off debug mode
	//turnOnDebugMode(true, false);
	
	
}

function draw() {
	clear();
	fadeInAndOut(fadeScreen);
	if (kb.presses('.')) fadeScreenNow();
	movementSounds(player,footsteps);
	playerMovement.handleInput();
	enemyHandler();
	//FPS counter, needs to be in draw to
	//render properly
	//Create a new room
	//fadeInAndOut(fadeScreen);
	//FPS counter, needs to be in draw to
	//render properly
	//renderStats();
}
