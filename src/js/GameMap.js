function replaceAt(string, index, replacement) {
    // First part: from the start of the string to the character before the index
    // Second part: the replacement character(s)
    // Third part: from the character after the index to the end of the string
    return string.substring(0, index) + replacement + string.substring(index + 1);
  }
  
class GameMap {
    constructor() {
        this.MAX_TILES_VERTICAL = 90;
        this.MAX_TILES_HORIZONTAL = 160;
        this.MAX
        this.map=null;
        this.roomControl=new RoomController();
        this.activeRoom=null;
        this.roomArr=[]
        for (let i = 0; i < 100; i++) {
            this.roomArr.push([])
            for (let j = 0; j < 100; j++) {
                var room=this.roomControl.getConnectorRoom();
                this.roomArr[i].push(room);
            }
            
        }
        //Generate empty char array for map
        this.mapArray = Array(this.MAX_TILES_VERTICAL).fill(".".repeat(this.MAX_TILES_HORIZONTAL));
        this.rooms = 10;
        for (let x = 0; x < this.MAX_TILES_HORIZONTAL/4; x+=16) {
            for (let y = 0; y < this.MAX_TILES_VERTICAL/4; y+=9) {
                // const element = array[index];
                this.insertRoom(x,y,this.roomControl.getConnectorRoom());
            }
        }
        // this.insertRoom(0,0,this.roomControl.getRoom1());
        // this.insertRoom(16,0,this.roomControl.getConnectorRoom());
        
    }
    getRoomWorldCoords(x,y){
        let worldCoords={"x":0,"y":0};
        worldCoords.x=(RoomController.TILE_WIDTH /2)+(x*CANVAS_WIDTH_PX )
        worldCoords.y=(RoomController.TILE_HEIGHT/2)+(y*CANVAS_HEIGHT_PX);
        return worldCoords;
    }
    getRoomTiles(x,y) {
        try {
            return this.roomArr[x][y].getTileArray();
        } catch (error) {
            console.log(error);
            console.log("ROOM OUT OF BOUNDS")
            return [];
        }
        
    }
    unloadRoom(x,y){
        var xOffset=x*CANVAS_WIDTH_PX;
        var yOffset=y*CANVAS_HEIGHT_PX;
        this.roomArr[x][y].furnishings.forEach(element => {
            // element.x=(RoomController.TILE_WIDTH*element.applyWorldOffset(xOffset, yOffset));
            element.furnishSprite.remove();
        });
    }
    //Takes the x and y coords of a room on the map. a room with top left at 32x 9y would be gotten with 2,1
    loadRoom(x,y){
        let xOffset=0;
        let yOffset=0;
        if(this.activeRoom!=null){
            this.unloadRoom(this.activeRoom['x'],this.activeRoom['y']);
            this.map?.removeAll();
        }
        
        this.activeRoom={"x":x,"y":y};
        xOffset=this.activeRoom['x']*CANVAS_WIDTH_PX;
        yOffset=this.activeRoom['y']*CANVAS_HEIGHT_PX;

        
        
        this.map=new Tiles(this.roomArr[x][y].getTileArray(),
        RoomController.TILE_WIDTH /2+xOffset,
        RoomController.TILE_HEIGHT/2+yOffset,
        RoomController.TILE_WIDTH   ,
        RoomController.TILE_HEIGHT);
        this.roomArr[x][y].furnishings.forEach(element => {
            element.instantiateSprite(xOffset, yOffset);
        });


        this.map.layer=MAP_LAYER;

    }
    //Renders the entire map at once, most useful in debugging. Is slow at runtime
    render(){
        
        //Instantiate all tiles in map
        this.map = new Tiles(
            this.mapArray,
            RoomController.TILE_WIDTH /2,
            RoomController.TILE_HEIGHT/2,
            RoomController.TILE_WIDTH   ,
            RoomController.TILE_HEIGHT)
    }
    //Return false from collision
    insertRoom(x, y, room, failOnOverwrite = true) {
        for (let row = y; row < y+room.tHeight; row++) {
            for (let col = x; col < x+room.tWidth; col++) {
                if (!(this.mapArray[row][col] === '.')) {
                    console.warn("Overwriting non null area of map.");
                    if (failOnOverwrite === true) {
                        return false;
                    }
                }
                this.mapArray[row]=replaceAt(this.mapArray[row],col,room.getTileSymbol(row - y, col - x));
                // console.log();
                // console.log();
            }
        }
        return true;
    }
}
function generateMap() {




}
