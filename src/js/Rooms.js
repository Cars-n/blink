// Declaring variables for images and the room controller
let brickImage, floorBoardImage, doorImage;
let roomControl;
let ISWAITING = false;
const WAITTIME = ((1/FADERATE)/60)*1000; // gives the number of frames it will take to fade int to 1 Then divides that by 60fps then multiples by 1000 to put it in miliseconds;

// Callback function, simply determines whether it is the player ob colliding with door tile or not
function upDoorCallback() {
   fadeScreenNow();
    playerMovement.moveSpeed = 0;
   if(doorCreak.isPlaying() == false) doorCreak.play();
    if(!ISWAITING){
        ISWAITING = true;
      setTimeout(() => {
       moveCamera("up");
       movePlayer("up");
       ISWAITING = false;
       playerMovement.moveSpeed = PLAYERSPEED;
      },WAITTIME)
  }
}

function rightDoorCallback() {
   fadeScreenNow();
   playerMovement.moveSpeed = 0;
   if(doorCreak.isPlaying() == false) doorCreak.play();
   if(!ISWAITING){
         ISWAITING = true;
       setTimeout(() => {
        moveCamera("right");
        movePlayer("right");
        ISWAITING = false;
        playerMovement.moveSpeed = PLAYERSPEED;
       },WAITTIME)
   }
}
function leftDoorCallback() {
    fadeScreenNow();
    playerMovement.moveSpeed = 0;
    if(doorCreak.isPlaying() == false) doorCreak.play();
    if(!ISWAITING){
          ISWAITING = true;
        setTimeout(() => {
         moveCamera("left");
         movePlayer("left");
         ISWAITING = false;
        playerMovement.moveSpeed = PLAYERSPEED;
        },WAITTIME)
    }
}
function downDoorCallback() {
    fadeScreenNow();
    playerMovement.moveSpeed = 0;
    if(doorCreak.isPlaying() == false) doorCreak.play();
    if(!ISWAITING){
        ISWAITING = true;
      setTimeout(() => {
       moveCamera("down");
       movePlayer("down");
       ISWAITING = false;
       playerMovement.moveSpeed = PLAYERSPEED;
      },WAITTIME)
  }
}

// Class for managing the room layout
class RoomController {
    static TILE_HEIGHT = 120;
    static TILE_WIDTH = 120;
    static firstLoad = true;
	//Defining our tiles that we want to use, keeps them in memory. Not meant to be written to outside of class
    static wallTile; 
    static floor;
    static upDoor;
    static rightDoor;
    static leftDoor;
    static downDoor;


    constructor() {
        // If it's the first load, initialize the tiles
        if (RoomController.firstLoad == true) {
            RoomController.firstLoad == false;
            // Creating wall, floor, and door tiles
            RoomController.wallTile = new ImageTile(brickImage, '=', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static');
            RoomController.floor = new ImageTile(floorBoardImage, 'o', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'none',upDoorCallback);
            RoomController.upDoor = new ImageTile(doorImage, '^', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', upDoorCallback);
            RoomController.rightDoor = new ImageTile(doorImage, '>', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', rightDoorCallback);
            RoomController.leftDoor = new ImageTile(doorImage, '<', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', leftDoorCallback);
            RoomController.downDoor = new ImageTile(doorImage, 'v', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', downDoorCallback);
			
		}

        this.map = [];
    }

    // Method to render the room layout
    renderMap() {
        const OFFSET_WIDTH = RoomController.TILE_WIDTH / 2 + windowWidth / 4;
        const OFFSET_HEIGHT = RoomController.TILE_HEIGHT / 2;
        const ROOM_WIDTH = RoomController.TILE_WIDTH * 10;

        // Rendering rooms and hallway
        this.renderRoom1(RoomController.TILE_WIDTH/2, RoomController.TILE_HEIGHT/2);
        this.renderHallway(RoomController.TILE_WIDTH/2 + 1920, RoomController.TILE_HEIGHT/2);
        this.renderRoom2(RoomController.TILE_WIDTH/2 + (1920 * 2), RoomController.TILE_HEIGHT/2);
    }

    // Method to render a hallway
    renderHallway(x, y) {
        var room = new Tiles(
            [
                '.'.repeat(16),
                '.'.repeat(16),
                '.'.repeat(16),
                '='.repeat(16),
                '<' + 'o'.repeat(14) + '>',
                '<' + 'o'.repeat(14) + '>',
                '='.repeat(16),
                '.'.repeat(16),
                '.'.repeat(16),
                '.'.repeat(16),
            ],
            x, y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }

    // Method to render room 1
    renderRoom1(x, y) {
        var room = new Tiles(
            [
                '='.repeat(16),
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '>',
                '=' + 'o'.repeat(14) + '>',
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '='.repeat(16)
            ],
            x, y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }

    // Method to render room 2
    renderRoom2(x, y) {
        var room = new Tiles(
            [
                '='.repeat(16),
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '<' + 'o'.repeat(14) + '=',
                '<' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '=' + 'o'.repeat(14) + '=',
                '='.repeat(16)
            ],
            x, y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }
}

// Creating an instance of the room controller
// roomControl = new RoomController();
