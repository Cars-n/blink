let bricks, tilesGroup;
let playerControl,player;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy

function setup() {
	createCanvas();//Make a canvas the size of our window
	createRoom(10,10);

	// new Player 
	player = setupPlayer();
	playerMovement = new MovementController(player,3,true);

	setupStaticEnemeyList();
	
	//Remove to turn off debug mode
	//turnOnDebugMode(true, false);
	
	
}

function draw() {
	clear();
	playerMovement.handleInput();
	makeCameraFollowPlayer();
	enemyHandler();
	//FPS counter, needs to be in draw to
	//render properly
	renderStats();
}
