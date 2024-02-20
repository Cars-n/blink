// Declaring variables for images and the room controller
let brickImage, floorBoardImage, doorImage;
let roomControl;

// Callback function, simply determines whether it is the player ob colliding with door tile or not
function doorCallback(a, b) {
    if (b?.tag === "player") {

    } else {
        console.log("not player: ", b.tag);
    }
   
}

function upwardDoorCallback(a, b) {
        fadeScreenNow();
        if(HASFADEDIN === true){
        moveCamera("up");
        movePlayer("up");
        }
    }
function rightDoorCallback(a, b) {
        fadeScreenNow();
        if(HASFADEDIN === true){
        moveCamera("right");
        movePlayer("right");
        }
}
function leftDoorCallback(a, b) {
    fadeScreenNow();
    moveCamera("left");
    movePlayer("left");
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

    constructor() {
        // If it's the first load, initialize the tiles
        if (RoomController.firstLoad == true) {
            RoomController.firstLoad == false;
            // Creating wall, floor, and door tiles
            RoomController.wallTile = new ImageTile(brickImage, '=', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static');
            RoomController.floor = new ImageTile(floorBoardImage, 'o', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'none',doorCallback);
            RoomController.door = new ImageTile(doorImage, 'D', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', doorCallback);
			RoomController.upDoor = new ImageTile(doorImage, '^', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', upwardDoorCallback);
            RoomController.rightDoor = new ImageTile(doorImage, '>', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', rightDoorCallback);
            RoomController.leftDoor = new ImageTile(doorImage, '<', RoomController.TILE_WIDTH, RoomController.TILE_HEIGHT, 'static', leftDoorCallback);
		}

        this.map = [];
    }

    // Method to render the room layout
    renderMap() {
        const OFFSET_WIDTH = RoomController.TILE_WIDTH / 2 + windowWidth / 4;
        const OFFSET_HEIGHT = RoomController.TILE_HEIGHT / 2;
        const ROOM_WIDTH = RoomController.TILE_WIDTH * 10;

        // Rendering rooms and hallway
        this.renderRoom1(OFFSET_WIDTH, OFFSET_HEIGHT);
        this.renderHallway(OFFSET_WIDTH + ROOM_WIDTH, OFFSET_HEIGHT);
        this.renderRoom2(OFFSET_WIDTH + (ROOM_WIDTH * 2), OFFSET_HEIGHT);
    }

    // Method to render a hallway
    renderHallway(x, y) {
        var room = new Tiles(
            [
                '.'.repeat(10),
                '.'.repeat(10),
                '.'.repeat(10),
                '='.repeat(10),
                'o'.repeat(2)+ '><' + 'o'.repeat(6),
                'o'.repeat(2)+ '><' + 'o'.repeat(6),
                '='.repeat(10),
                '.'.repeat(10),
                '.'.repeat(10),
                '.'.repeat(10),
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
                '='.repeat(10),
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(9),
                '=' + 'o'.repeat(9),
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '='.repeat(10)
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
                '=DD=======',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                'o'.repeat(9) + '=',
                'o'.repeat(9) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '=' + 'o'.repeat(8) + '=',
                '='.repeat(10)
            ],
            x, y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }
}

// Creating an instance of the room controller
// roomControl = new RoomController();
