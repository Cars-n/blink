let bricks, tilesGroup;
let playerControl,player;

//Boxes to test collsions on
let box;
let box2;
let box3;

function setup() {
	createCanvas(windowWidth,windowHeight);//Make a canvas the size of our window
	createRoom(10,10);

	// new Player 
	player = new Sprite(30, 24, 64, 64);
	setupPlayer();
	playerMovement = new MovementController(player,3,true,true);


	//Adding in for collsion testing
	player.rotationLock = true;
	world.gravity.y = 15;
	box = new Sprite();
	box2 = new Sprite(100,100,100,100);
	box3 = new Sprite(-10,-10,-10,-10);

	box.collider = 'kinematic';
	box2.collider = 'kinematic';
	box3.collider = 'kinematic';
}

function draw() {
	clear();
	playerMovement.handleMovement();

	//Setting the debug on for sprite
    player.debug = true;
}