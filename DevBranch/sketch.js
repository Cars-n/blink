let player;

//Boxes to test collsions on
let box;
let box2;
let box3;

function setup() {
	new Canvas();

	// new Player 
	player = new Sprite(30, 24, 64, 64);
	setupPlayer();
	playerMovement = new MovementController(player,3,true,true);


	//Adding in for collsion testing
	box = new Sprite();
	box2 = new Sprite(100,100,100,100);
	box3 = new Sprite(-10,-10,-10,-10);

	box.collider = 'static';
	box2.collider = 'static';
	box3.collider = 'kinematic';
}

function draw() {
	clear();
	playerMovement.handleMovement();

	//Setting the debug on for sprite
    player.debug = true;
}
