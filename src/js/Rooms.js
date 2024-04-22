// Declaring variables for images and the room controller
let brickImage, floorBoardImage, doorImage;
let roomControl;
let ISWAITING = false;
let TrapdoorUnlocked = false;

// Declare variables for props for rooms
let bookshelf, bookshelf1, bigBookshelf;
let drawer, drawer1, drawer1Open;
let carpet;
let shelf, shelves;
let table, window1, window2, dinnerTable, drinkShelf, dishCabinet, table2;
let cabinet, openCabinet, kitchenCabinet;
let chair, chairRight;
let painting1, painting2;
let bed;
let fireplace;
let mirror;
let dresser;
let wallLamp;
let drink;
let stove;


// Callback function, simply determines whether it is the player ob colliding with door tile or not
function trapDoorCallback(a, b) {
    if (b?.tag === "player") {
		if(inventory.hasItem(key) || TrapdoorUnlocked == true){
            TrapdoorUnlocked = true;
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["x"] += 1;
			console.log(player.room);
            gameMap.loadRoom(player.room["x"], player.room["y"]);
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
                .then(() => {
                    moveCamera("right");
                    movePlayer("right", 2);
                    ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
		inventory.removeItem(key)
	}
	else{
		alert("You need a key to open this trapdoor");
		//let Text = new Sprite(player.x, player.y, 100, 100, "You need a key to open this trapdoor");
	}
    } else {
        console.log("not player: ", b.tag);
    }
}
function MiddleDoorCallback(a, b) {
	if(b?.tag === "player"){
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["x"] = 0;
			player.room["y"] = 0;
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
			.then(() => {
				player.x = 0;
				player.y -= 300;
				moveCamera("left", 7);
				movePlayer("right", 2);
				gameMap.loadRoom(player.room["x"], player.room["y"]);
				ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    } else {
        console.log("not player: ", b.tag);
    }
}

function UpstairsDoorCallback(a, b) {
	if(b?.tag === "player"){
    if (ENEMY42SPAWED == true) {
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["x"] = 7;
			player.room["y"] = 0;
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
			.then(() => {
				moveCamera("right", 7);
				movePlayer("left", 1.5);
				player.x += CANVAS_WIDTH_PX * 7;
				player.y += 300;
				gameMap.loadRoom(player.room["x"], player.room["y"]);
				ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
	}
    } else {
        console.log("not player: ", b.tag);
    }
}

function trapDoorBackCallback(a, b) {
    if (b?.tag === "player") {
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["x"] -= 1;
			console.log(player.room);
            gameMap.loadRoom(player.room["x"], player.room["y"]);
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
                .then(() => {
                    moveCamera("left");
                    movePlayer("left", 2);
                    ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    } else {
        console.log("not player: ", b.tag);
    }
}

function upDoorCallback(a, b) {
    if (b?.tag === "player") {
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["y"] -= 1;
            gameMap.loadRoom(player.room["x"], player.room["y"]);
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
                .then(() => {
                    moveCamera("up");
                    movePlayer("up");
                    ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    } else {
        console.log("not player: ", b.tag);
    }
}

function rightDoorCallback(a, b) {
    if (b?.tag === "player") {
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["x"] += 1;
            gameMap.loadRoom(player.room["x"], player.room["y"]);
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
                .then(() => {
                    moveCamera("right");
                    movePlayer("right");
                    ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
            }
        } 
        else {
            console.log("not player: ", b.tag);
        }  
}

function leftDoorCallback(a,b) {
    if (b?.tag === "player") {
    if(!ISWAITING){
        ISWAITING = true;
        fadeScreenNow();
        playerMovement.moveSpeed = 0;
        player.room['x']-=1
        gameMap.loadRoom(player.room['x'],player.room['y']);
        if(doorCreak.isPlaying() == false) doorCreak.play();
        waitForOpacityCondition(5000) // Wait for up to 5 seconds
          .then(() => {
            moveCamera("left");
            movePlayer("left");
            ISWAITING = false;
            playerMovement.moveSpeed = PLAYERSPEED;
          })
          .catch((error) => {
            console.error(error.message);
          });
        }
    } else {
        console.log("not player: ", b.tag);
    }
}

function downDoorCallback(a, b) {
    if (b?.tag === "player") {
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["y"] += 1;
            gameMap.loadRoom(player.room["x"], player.room["y"]);
            if (doorCreak.isPlaying() == false) doorCreak.play();
            waitForOpacityCondition(5000) // Wait for up to 5 seconds
                .then(() => {
                    moveCamera("down");
                    movePlayer("down");
                    ISWAITING = false;
                    playerMovement.moveSpeed = PLAYERSPEED;
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    } else {
        console.log("not player: ", b.tag);
    }
}

function addFurnishingToRoom(room, propImage, propType, x, y, w, z) {
    var furnishing = new Furnishing(w, z, propImage, propType);
    furnishing.setTilePosition(x, y);
    room.furnishings.push(furnishing);
}

class Room{
    static MAX_T_WIDTH=16;
    static MAX_T_HEIGHT=9;

    constructor(tWidth, tHeight, tileArray) {
        if (
            tWidth > Room.MAX_T_WIDTH ||
            tWidth < 1 ||
            tHeight > Room.MAX_T_HEIGHT ||
            tHeight < 1
        ) {
            console.error("Invalid room dimensions!", tWidth, tHeight);
            return;
        }
        this.tWidth=tWidth;
        this.tHeight=tHeight;
        this.tileArray=tileArray;
        
        this.furnishings=[];
    }
    getTileArray() {
        return this.tileArray;
    }
    getTileSymbol(row, col) {
        return this.tileArray[row][col];
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
            RoomController.wallTile = new ImageTile(
                brickImage,
                "=",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static"
            );
			RoomController.barsTile = new ImageTile(
                cellBarsImage,
                "*",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static"
            );
            RoomController.floor = new ImageTile(
                floorBoardImage,
                "o",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "none",
                upDoorCallback
            );
            RoomController.upDoor = new ImageTile(
                doorImage,
                "^",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
                upDoorCallback
            );
            RoomController.rightDoor = new ImageTile(
                doorImage,
                ">",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
                rightDoorCallback
            );
            RoomController.leftDoor = new ImageTile(
                doorImage,
                "<",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
                leftDoorCallback
            );
            RoomController.downDoor = new ImageTile(
                doorImage,
                "v",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
                downDoorCallback
            );
			RoomController.trapDoor = new ImageTile(
                trapDoorImage,
                "T",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
                trapDoorCallback
            );
			RoomController.trapDoorBack = new ImageTile(
                trapDoorImage,
                "t",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
                trapDoorBackCallback
            );
			RoomController.secretDoor = new ImageTile(
                brickImage,
                "s",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "none",
            );
			RoomController.upstairsDoor = new ImageTile(
                brickImage,
                "S",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
				UpstairsDoorCallback
            );
			RoomController.middleFloorDoor = new ImageTile(
                brickImage,
                "m",
                RoomController.TILE_WIDTH,
                RoomController.TILE_HEIGHT,
                "static",
				MiddleDoorCallback
            );
        }

        // this.map = [];
    }

    // Method to render the room layout
    renderMap() {
        const OFFSET_WIDTH = RoomController.TILE_WIDTH / 2 + windowWidth / 4;
        const OFFSET_HEIGHT = RoomController.TILE_HEIGHT / 2;
        const ROOM_WIDTH = RoomController.TILE_WIDTH * 10;

        // Rendering rooms and hallway
        this.renderRoom1(
            RoomController.TILE_WIDTH / 2,
            RoomController.TILE_HEIGHT / 2
        );
        this.renderHallway(
            RoomController.TILE_WIDTH / 2 + 1920,
            RoomController.TILE_HEIGHT / 2
        );
        this.renderRoom2(
            RoomController.TILE_WIDTH / 2 + 1920 * 2,
            RoomController.TILE_HEIGHT / 2
        );
    }

    // Method to render a hallway
    renderHallway(x, y) {
        var room = new Tiles(
            [
                ".".repeat(16),
                ".".repeat(16),
                ".".repeat(16),
                "=".repeat(16),
                "<" + "o".repeat(14) + ">",
                "<" + "o".repeat(14) + ">",
                "=".repeat(16),
                ".".repeat(16),
                ".".repeat(16),
                ".".repeat(16),
            ],
            x,
            y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }

    // Method to render room 1
    renderRoom1(x, y) {
        var room = new Tiles(
            [
                "=".repeat(16),
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + ">",
                "=" + "o".repeat(14) + ">",
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "=".repeat(16),
            ],
            x,
            y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }
    getRoom1() {
        var tileMap = [
            "=".repeat(16),
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(15),
            "o" + "o".repeat(15),
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(14) + "=",
            "=".repeat(16),
        ];
        var room = new Room(16, 9, tileMap);
        return room;
    }
    getConnectorRoom() {
        var tileMap = [
            "=".repeat(7) + "^^" + "=".repeat(7),
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(14) + "=",
            "<" + "o".repeat(14) + ">",
            "<" + "o".repeat(14) + ">",
            "=" + "o".repeat(14) + "=",
            "=" + "o".repeat(14) + "=",
            "=".repeat(7) + "vv" + "=".repeat(7),
        ];
        var tmp=new Furnishing(100,60,brickImage,"static");
        tmp.setTilePosition(5,5);
        var room=new Room(16,9,tileMap);
        room.furnishings.push(tmp);
        return room;
    }
    
    // furnished
	getStartRoom(){
		var tileMap = [
				"=======SS=======",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo>",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=======vv=======",
				];
    	var room=new Room(16,9,tileMap);
        // row 1
        // room , image, collision type, position x , position y, size 
        addFurnishingToRoom(room, bookshelf, "static", 1.3, 1.0, 30, 50);
        addFurnishingToRoom(room, bookshelf, "static", 1.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, window1, "static", 2.5, .5, 40, 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, table, "static", 5.5, 1.0, 50 , 50);
        addFurnishingToRoom(room, painting1, "static", 5.5, .5, 50 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 7.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 7.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 7.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 7.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 7.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 8.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, window1, "static", 8.0, .5, 40, 50);
        addFurnishingToRoom(room, bookshelf, "static", 8.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 8.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 8.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 8.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, table, "static", 10.5, 1.0, 50 , 50);
        addFurnishingToRoom(room, painting1, "static", 10.5, .5, 50 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",11.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",11.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.2, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.4, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.6, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.8, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 13.0, 1.0, 30 , 50);
        addFurnishingToRoom(room, window1, "static", 13.5, .5, 40, 50);
        addFurnishingToRoom(room, bookshelf, "static", 14.3, 1.0, 30, 50);
        addFurnishingToRoom(room, bookshelf, "static", 14.5, 1.0, 30 , 50);

        // row 3
        addFurnishingToRoom(room, bookshelf, "static", 3.0, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.2, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.4, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.6, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.8, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.0, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.2, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.4, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.6, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.8, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.0, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.0, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.2, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",11.4, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.6, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",11.8, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.0, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.2, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.4, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.6, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.8, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 13.0, 3.0, 30 , 50);

        // row 4
        addFurnishingToRoom(room, chair, "static", 3.5, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 3.8, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 4.1, 4.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 4.5, 4.0, 50 , 50);
        addFurnishingToRoom(room, chair, "static", 11.5, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 11.8, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 12.1, 4.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 12.5, 4.0, 50 , 50);
        
        // row 5
        addFurnishingToRoom(room, chair, "static", 3.5, 5.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 3.8, 5.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 4.1, 5.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 4.5, 5.0, 50 , 50);
        addFurnishingToRoom(room, chair, "static", 11.5, 5.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 11.8, 5.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 12.1, 5.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 12.5, 5.0, 50 , 50);


        // row 6
        addFurnishingToRoom(room, bookshelf, "static", 3.0, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.2, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.4, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.6, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 3.8, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.0, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.2, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.4, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.6, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.8, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.0, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.0, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.2, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",11.4, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.6, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",11.8, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.0, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.2, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.4, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.6, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 12.8, 6.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 13.0, 6.0, 30 , 50);

        return room;
	}
    // furnished
	getRoom02(){
		var tileMap = [
			"=======^^=======",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"====oooooooo====",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...====vv====...",
			]
         var room=new Room(16,9,tileMap);
         // row 1
         addFurnishingToRoom(room, dresser, "static", 1.3, 1.1, 66, 47);
         addFurnishingToRoom(room, bed, "static", 2, 1.3, 96, 111);
         addFurnishingToRoom(room, painting2, "static", 2.05, .75, 100, 100);
         addFurnishingToRoom(room, drawer1, "static", 3.1, 1.1, 40, 40);
         addFurnishingToRoom(room, drink, "static", 3.1, .9, 15, 30);
         addFurnishingToRoom(room, drawer1Open, "static", 3.3, 1.1, 40, 40);
         addFurnishingToRoom(room, wallLamp, "static", 6, .4, 41, 42);
         addFurnishingToRoom(room, wallLamp, "static", 10, .4, 41, 42);
         addFurnishingToRoom(room, bigBookshelf, "static",12, 1.1, 144, 96);
         addFurnishingToRoom(room, fireplace, "static",13, .9, 82, 132);
         addFurnishingToRoom(room, bigBookshelf, "static",14, 1.1, 144, 96);


         // row 4
         addFurnishingToRoom(room, mirror, "static", 2.15, 4.0, 60, 60);

         return room;
	}
    // furnished
	getRoom03(){
		var tileMap = [
			"...====^^====...",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...=oooooooo=...",
			"...====vv====...",
			];
         var room=new Room(16,9,tileMap);
        // row 1
        addFurnishingToRoom(room, bookshelf, "static", 4.1, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.3, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.7, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.9, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.1, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.3, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.7, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.9, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.1, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.3, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",9.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.7, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.9, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.1, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.3, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.7, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",10.9, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.1, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.3, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.5, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.7, 1.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.9, 1.0, 30 , 50);


        // row 2
        addFurnishingToRoom(room, chair, "static", 4.9, 2.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 5.2, 2.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 5.5, 2.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 5.9, 2.0, 50 , 50);
        addFurnishingToRoom(room, chair, "static", 10.1, 2.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 10.4, 2.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 10.7, 2.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 11.1, 2.0, 50 , 50);

        // row 3
        addFurnishingToRoom(room, bookshelf, "static", 4.1, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.3, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.5, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.7, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.9, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.1, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.3, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.5, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.7, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.9, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.1, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.3, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.5, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",9.5, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.7, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.9, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.1, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.3, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.5, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.7, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",10.9, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.1, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.3, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.5, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.7, 3.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.9, 3.0, 30 , 50);

        // row 4
        addFurnishingToRoom(room, chair, "static", 4.9, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 5.2, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 5.5, 4.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 5.9, 4.0, 50 , 50);
        addFurnishingToRoom(room, chair, "static", 10.1, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 10.4, 4.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 10.7, 4.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 11.1, 4.0, 50 , 50);


        // row 5
        addFurnishingToRoom(room, bookshelf, "static", 4.1, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.3, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.5, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.7, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.9, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.1, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.3, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.5, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.7, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.9, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.1, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.3, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.5, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",9.5, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.7, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.9, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.1, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.3, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.5, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.7, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",10.9, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.1, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.3, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.5, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.7, 5.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.9, 5.0, 30 , 50);

        // row 6
        addFurnishingToRoom(room, chair, "static", 4.9, 6.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 5.2, 6.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 5.5, 6.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 5.9, 6.0, 50 , 50);
        addFurnishingToRoom(room, chair, "static", 10.1, 6.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 10.4, 6.0, 50 , 50);
        addFurnishingToRoom(room, table, "static", 10.7, 6.0, 50 , 50);
        addFurnishingToRoom(room, chairRight, "static", 11.1, 6.0, 50 , 50);

        // row 7
        addFurnishingToRoom(room, bookshelf, "static", 4.1, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.3, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.5, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.7, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 4.9, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.1, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.3, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.5, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.7, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 5.9, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.1, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.3, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 6.5, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",9.5, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.7, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 9.9, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.1, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.3, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.5, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 10.7, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static",10.9, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.1, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.3, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.5, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.7, 7.0, 30 , 50);
        addFurnishingToRoom(room, bookshelf, "static", 11.9, 7.0, 30 , 50);    
        
        return room;
	}
	getRoom04(){
		var tileMap = [
			"=======^^=======",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"================",
			];
         var room=new Room(16,9,tileMap);
         // row 1
         addFurnishingToRoom(room, stove, "static", 1.4, 1.1, 100 , 52); 
         addFurnishingToRoom(room, drinkShelf, "static", 1.75, .5, 150 , 40); 
         addFurnishingToRoom(room, stove, "static", 2.2, 1.1, 100 ,52);  
         addFurnishingToRoom(room, kitchenCabinet, "static", 3.0, 1.0, 50 ,75); 
         addFurnishingToRoom(room, kitchenCabinet, "static", 3.4, 1.0, 50 ,75); 
         addFurnishingToRoom(room, dishCabinet, "static", 4.1, .9, 65 , 80);  
         addFurnishingToRoom(room, table2, "static", 4.9, 1.0, 95 , 45);  
         addFurnishingToRoom(room, table2, "static", 5.8, 1.0, 95 , 45); 

         addFurnishingToRoom(room, kitchenCabinet, "static", 11.0, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 11.4, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 11.8, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 12.2, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 12.6, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 13, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 13.4, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 13.8, 1.0, 50 ,75);
         addFurnishingToRoom(room, kitchenCabinet, "static", 14.2, 1.0, 50 ,75);

         // row  4
         addFurnishingToRoom(room, dinnerTable, "static", 2.2, 4.1, 105 ,50);  
         return room;
	}
	getRoom10(){
		var tileMap = [
			"================",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"<oooooooooooooo>",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=======vv=======",
			];
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
         var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
         return room;
	}
	getRoom11(){
		var tileMap = [
			"=======^^=======",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"================",
			];
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
         var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
         return room;
	}
	getRoom20(){
		var tileMap = [
			"================",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooToo=",
			"<oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"================",
			]
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
        var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
         return room;
	}

	getRoomB00(){
		var tileMap = [
			"================",
			"=oooooooooooooo=",
			"=ootooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo>",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=======vv=======",
			]
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
         var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
         return room;
	}
	
	getRoomB01(){
		var tileMap = [
			"...====^^=======",
			"...=ooooooooooo=",
			"...=ooooooooooo=",
			"...=ooooooooooo>",
			"...=ooooooooooo=",
			"...=============",
			"................",
			"................",
			"................",
			];
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
        var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
         return room;
	}

	getRoomB10(){
		var tileMap = [
			"================",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"<oooooooooooooo>",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=======vv=======",
			];
			// var tmp=new Furnishing(100,60,brickImage,"static");
			// tmp.setTilePosition(5,5);
			 var room=new Room(16,9,tileMap);
			// room.furnishings.push(tmp);
			 return room;
	}

	getRoomB11(){
		var tileMap = [
				"=======^^=======",
				"=oooooooooooooo=",
				"<oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"======oooo======",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=======vv=======",
				];
				// var tmp=new Furnishing(100,60,brickImage,"static");
				// tmp.setTilePosition(5,5);
				 var room=new Room(16,9,tileMap);
				// room.furnishings.push(tmp);
				 return room;
			}
			getRoomB12(){
				var tileMap = [
					"=======^^=======",
					"=oooooooooooooo=",
					"=oooooooooooooo=",
					"=oooooooooooooo=",
					"=oooooooooooooo=",
					"=oooooooooooooo=",
					"=oooooooooooooo=",
					"=oooooooooooooo=",
					"================",
					];
					// var tmp=new Furnishing(100,60,brickImage,"static");
					// tmp.setTilePosition(5,5);
					 var room=new Room(16,9,tileMap);
					// room.furnishings.push(tmp);
					 return room;
				}

				getRoomB20(){
					var tileMap = [
						"================",
						"=oooooooooooo=o=",
						"=oooooooooooo=o=",
						"=oooooooooooo=o=",
						"<oo=======ooo=o=",
						"=oo=ooooooooooo=",
						"=oo=oooooooo=oo=",
						"=oo=oooooooo=oo=",
						"=======vv=======",
						];
						// var tmp=new Furnishing(100,60,brickImage,"static");
						// tmp.setTilePosition(5,5);
						 var room=new Room(16,9,tileMap);
						// room.furnishings.push(tmp);
						 return room;
					}
		getRoomB21(){
			var tileMap = [
				".....==^^==.....",
				".....=oooo=.....",
				".....=oooo=.....",
				".....=oooo=.....",
				".....=oooo=.....",
				".....=oooo=.....",
				".....=oooo=.....",
				".....=oooo=.....",
				".....==vv==.....",
				];
							// var tmp=new Furnishing(100,60,brickImage,"static");
							// tmp.setTilePosition(5,5);
							 var room=new Room(16,9,tileMap);
							// room.furnishings.push(tmp);
							 return room;
			}
			getRoomB22(){
				var tileMap = [
					".....==^^==.....",
					".....=oooo=.....",
					".....=oooo=.....",
					".....=oooo=.....",
					".....=oooo=.....",
					".....=oooo=.....",
					".....=oooo=.....",
					".....=oooo=.....",
					".....==vv==.....",
					];
								// var tmp=new Furnishing(100,60,brickImage,"static");
								// tmp.setTilePosition(5,5);
								 var room=new Room(16,9,tileMap);
								// room.furnishings.push(tmp);
								 return room;
				}
				getRoomB23(){
					var tileMap = [
						".....==^^==.....",
						".....=oooo=.....",
						".....=oooo=.....",
						".....=oooo=.....",
						".....=oooo=.....",
						".....=oooo=.....",
						".....=oooo=.....",
						".....=oooo=.....",
						".....=****=.....",
						];
									// var tmp=new Furnishing(100,60,brickImage,"static");
									// tmp.setTilePosition(5,5);
									 var room=new Room(16,9,tileMap);
									// room.furnishings.push(tmp);
									 return room;
					}
					getRoomB24(){
						var tileMap = [
							"...===****===...",
							"...=oooooooo=...",
							"...=oooooooo====",
							"...=ooooooooooos",
							"...=oooooooo====",
							"...=oooooooo=...",
							"...==========...",
							"................",
							"................",
							];
										// var tmp=new Furnishing(100,60,brickImage,"static");
										// tmp.setTilePosition(5,5);
										 var room=new Room(16,9,tileMap);
										// room.furnishings.push(tmp);
										 return room;
						}

						getRoomB34(){
							var tileMap = [
								"========........",
								"=oooooo=........",
								"=oooooo=........",
								"soooooo=........",
								"=oooooo=........",
								"=oooooo=........",
								"========........",
								"................",
								"................",
								];
											// var tmp=new Furnishing(100,60,brickImage,"static");
											// tmp.setTilePosition(5,5);
											 var room=new Room(16,9,tileMap);
											// room.furnishings.push(tmp);
											 return room;
							}
	getRoomU00(){
		var tileMap = [
			"................",
			"................",
			"================",
			"=oooooooooooooo=",
			"moooooooooooooo>",
			"=oooooooooooooo=",
			"================",
			"................",
			"................",
			];
		// var tmp=new Furnishing(100,60,brickImage,"static");
		// tmp.setTilePosition(5,5);
		 var room=new Room(16,9,tileMap);
		// room.furnishings.push(tmp);
		 return room;
	}
	getRoomU10(){
		var tileMap = [
			"................",
			"................",
			"================",
			"=oooooooooooooo=",
			"<oooooooooooooo>",
			"=oooooooooooooo=",
			"================",
			"................",
			"................",
			];
		// var tmp=new Furnishing(100,60,brickImage,"static");
		// tmp.setTilePosition(5,5);
		 var room=new Room(16,9,tileMap);
		// room.furnishings.push(tmp);
		 return room;
	}
	getRoomU20(){
		var tileMap = [
			"================",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"<oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=======vv=======",
			];
		// var tmp=new Furnishing(100,60,brickImage,"static");
		// tmp.setTilePosition(5,5);
		 var room=new Room(16,9,tileMap);
		// room.furnishings.push(tmp);
		 return room;
	}
	getRoomU21(){
		var tileMap = [
			".....==^^==.....",
			".....=oooo=.....",
			".....=oooo=.....",
			".....=oooo=.....",
			".....=oooo=.....",
			".....=oooo=.....",
			".....=oooo=.....",
			".....=oooo=.....",
			".....==vv==.....",
			];
						// var tmp=new Furnishing(100,60,brickImage,"static");
						// tmp.setTilePosition(5,5);
						 var room=new Room(16,9,tileMap);
						// room.furnishings.push(tmp);
						 return room;
		}
		getRoomU22(){
			var tileMap = [
				"=======^^=======",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"================",
				];
							// var tmp=new Furnishing(100,60,brickImage,"static");
							// tmp.setTilePosition(5,5);
							 var room=new Room(16,9,tileMap);
							// room.furnishings.push(tmp);
							 return room;
			}
    // Method to render room 2
    renderRoom2(x, y) {
        var room = new Tiles(
            [
                "=".repeat(16),
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "<" + "o".repeat(14) + "=",
                "<" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "=" + "o".repeat(14) + "=",
                "=".repeat(16),
            ],
            x,
            y,
            RoomController.TILE_WIDTH,
            RoomController.TILE_HEIGHT
        );
    }
}
