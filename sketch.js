let player;

function setup() {
	new Canvas();

	// new Player 
	player = new Sprite(30, 24, 64, 64);
	setupPlayer();
	playerMovement = new MovementController(player,3,true,true);
}

function draw() {
	clear();
	playerMovement.handleMovement();


	//Setting the debug on for sprite
    player.debug = kb.pressing('q');
}
