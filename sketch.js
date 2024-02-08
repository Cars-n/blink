let player;
let blinks = 0;
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
	player.rotationLock = true;


	//world.gravity.y = 15;
	box = new Sprite();
	box2 = new Sprite(500,100,100,100);
	box3 = new Sprite(-100,-10,-10,-10);

	box.collider = 's';
	box2.collider = 's';
	box3.collider = 's';
}

function draw() {
	clear();
	// if (BlinkCount > blinks){
	// 	background('black');
	// 	blinks += 1;
	// }
	playerMovement.handleMovement();

	//Setting the debug on for sprite
    player.debug = true;
}
