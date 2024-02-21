class GameMap {
    constructor() {
        this.MAX_TILES_VERTICAL = 90;
        this.MAX_TILES_HORIZONTAL = 160;
        this.map=null;
        this.roomControl=new RoomController();
        
        //Generate empty char array for map
        this.mapArray = Array(this.MAX_TILES_VERTICAL).fill(".".repeat(this.MAX_TILES_HORIZONTAL));
        this.rooms = 10;
        
        this.insertRoom(0,0,this.roomControl.getRoom1());
        
        
    }
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
        for (let row = x; row < x+room.tWidth; row++) {
            for (let col = y; col < y+room.tHeight; col++) {
                if (!(this.mapArray[row][col] === '.')) {
                    console.warn("Overwriting non null area of map.");
                    if (failOnOverwrite === true) {
                        return false;
                    }
                }
                
                console.log(this.mapArray[row][col]);
                console.log(room.getTileSymbol(row - x, col - y));
            }
        }
        return true;
    }
}
function generateMap() {




}
