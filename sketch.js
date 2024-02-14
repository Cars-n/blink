let playerControl,player,fadeScreen;
let ALL_LOADED=1;

function setup() {
	createCanvas();//Make a canvas the size of our window
	fadeScreen = createFadeScreen(); //Creates a screen that's black and fades in and out with the fadeInAndOut function
	//Creates Room Controller. 
	roomControl = new RoomController();
	// createRoom(10,10);
	roomControl.renderMap();
	// new Player 
	player = setupPlayer();
	playerMovement = new MovementController(player,3,true);
	
	
	//Remove to turn off debug mode
	//turnOnDebugMode(true, false);
	
	
}

function draw() {
	clear();
	fadeInAndOut(fadeScreen);
	if (kb.presses('.')){
		fadeScreenNow();
	}
	playerMovement.handleInput();
	//fadeInAndOut(fadeScreen);
	//FPS counter, needs to be in draw to
	//render properly
	//renderStats();
}