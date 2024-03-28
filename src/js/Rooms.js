// Declaring variables for images and the room controller
let brickImage, floorBoardImage, doorImage;
let roomControl;
let ISWAITING = false;

// Callback function, simply determines whether it is the player ob colliding with door tile or not
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
function leftDoorCallback(a, b) {
    if (b?.tag === "player") {
        if (!ISWAITING) {
            ISWAITING = true;
            fadeScreenNow();
            playerMovement.moveSpeed = 0;
            player.room["x"] -= 1;
            gameMap.loadRoom(player.room["x"], player.room["y"]);
            if (doorCreak.isPlaying() == false) doorCreak.play();
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
	getStartRoom(){
		var tileMap = [
				"================",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo=",
				"=oooooooooooooo>",
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
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
         var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
         return room;
	}
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
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
         var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
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
        // var tmp=new Furnishing(100,60,brickImage,"static");
        // tmp.setTilePosition(5,5);
         var room=new Room(16,9,tileMap);
        // room.furnishings.push(tmp);
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
			"=oooooooooooTTo=",
			"<oooooooooooTTo=",
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
			"=oooooooooooooo=",
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
	getRoomB00(){
		var tileMap = [
			"================",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo=",
			"=oooooooooooooo>",
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
				"=======vv=======",
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
						"<oo=======ooo=o>",
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
						".....==vv==.....",
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
							"...=oooooooo=...",
							"...=oooooooo=...",
							"...=oooooooo=...",
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
								"<oooooo=........",
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
