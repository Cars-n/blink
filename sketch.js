let bricks, tilesGroup;
const enemyList = []; //Enemeies currently spawned
const staticEnemyList = []; //Stored list of every enemy
let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;
let flashlight;
let INVENTORYRENDERED = false;
const PLAYERSPEED = 3;
let menuScreen;
let gameMap;
let inventory;
let key
let GAMESTATE = "MAINMENU";

function preload() {
	InventoryBackground = loadImage('assets/InventoryBackground.png');
	keyImage = loadImage('assets/key.png');
	brickImage = loadImage('assets/WallRoughDraft.png');
	flashlightImage = loadImage('assets/Flashlight.png');
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
	flashlight = new Item(500,500, "FlashLight", 2,1,20,8,flashlightImage);
	flashlight.itemSprite.rotation = -90;
	key = new Item(1000,500, "Key", 1,1,10,5,keyImage);
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

	if(GAMESTATE == "MAINMENU"){
		if(mouse.presses()) {
			GAMESTATE = "PLAYING";
			menuScreen.remove()
		
		}
	}
	else if(GAMESTATE == "PLAYING"){
		console.log(GAMESTATE);
		fadeInAndOut(fadeScreen);
		movementSounds(player,footsteps);
		playerMovement.handleInput();
		if(kb.presses('o')) spawnEnemyAt(1, player.x - 50, player.y - 50);
		if(kb.pressed('e')) {
			GAMESTATE = "INVENTORY";
			console.log(GAMESTATE);
		}
		if(player.overlaps(flashlight.itemSprite)){
			if (inventory.insertItem(flashlight, inventory.hasSpace(flashlight.InventoryX,flashlight.InventoryY))) flashlight.itemSprite.visible = false;
			console.log(inventory.inventory);
		}
		if(player.overlaps(key.itemSprite)){
			if (inventory.insertItem(key, inventory.hasSpace(key.InventoryX,key.InventoryY))) key.itemSprite.visible = false;
			console.log("This is the inventory after Key is added");
			console.log(inventory.inventory);
		}
		darknessSprite.opacity = 0.4;
		darknessSprite.x = player.x;
		darknessSprite.y = player.y;
		image(darknessSprite.img, player.x, player.y, darknessSprite.width, darknessSprite.height);
	}
    else if (GAMESTATE == "INVENTORY"){
		player.velocity.y = 0;
		player.velocity.x = 0;
		player.changeAni("idle_" + playerMovement.lastDirection);
		movementSounds(player,footsteps);
		if(!INVENTORYRENDERED){
			inventory.renderInventory();
			INVENTORYRENDERED = true;
		}
		if(kb.pressed('e')){
			inventory.remove();
			INVENTORYRENDERED = false;
			playerMovement.moveSpeed = 3;
			GAMESTATE = "PLAYING";
		} 
		if(kb.pressed('r')){
			console.log(inventory.inventory);
		} 
		dragItem(flashlight, inventory);
		dragItem(key, inventory);
	}
}	
