class InventoryController {
    static TILE_HEIGHT = 200;
    static TILE_WIDTH = 200;
    static INVENTORY_WIDTH = 3;
    static INVENTORY_HEIGHT = 2;
    static firstLoad = true;
    static tile;
    static inventory = [['','',''],['','','']];

    constructor() {
    if (InventoryController.firstLoad == true) {
        InventoryController.firstLoad == false;
        // Creating inventory tile
        InventoryController.tile = new ImageTile(mainMenuImage, ';', InventoryController.TILE_WIDTH, InventoryController.TILE_HEIGHT, 'none');

    }
}

renderInventory() {
    var invent = new Tiles(
        [
            ';;;',
            ';;;',
        ],
        ((Math.ceil(player.x/1920)*1920/2)-(this.TILE_WIDTH*this.INVENTORY_WIDTH/3)), ((Math.ceil(player.y/1080)*1080/2)-(this.TILE_HEIGHT*this.INVENTORY_HEIGHT/2)),
        this.TILE_WIDTH,
        this.TILE_HEIGHT
    );
}
    getTileLocation(x, y){
        let topCornerX = ((Math.ceil(player.x/1920)*1920/2)) - this.TILE_WIDTH * 1.5;
        let topCornerY = ((Math.ceil(player.y/1080)*1080/2)) - this.TILE_WIDTH * 1.5;
        return {
            x: (topCornerX + (x * this.TILE_WIDTH)) - this.TILE_WIDTH/2,
            y: (topCornerY + (y * this.TILE_HEIGHT)) - this.TILE_HEIGHT/2
        }
    }

    hasSpace(x,y){
        if(x * y == 1){
            if (this.inventory[0].indexOf('') !== -1) return {
                x: this.inventory[0].indexOf(''),
                y: 1,
                orientation: 'none'
            };
            if(this.inventory[1].indexOf('') !== -1) return {
                x: this.inventory[1].indexOf(''),
                y: 2
            } 
            else return {
                x: -1,
                y: -1,
                orientation: 'none'
            }

        }
            if (x*y == 2){
                for(let i = 0; i < this.INVENTORY_WIDTH -1; i++){
                    if(this.inventory[0][i] == '' && this.inventory[1][i] == ''){
                        return {
                            x: i+1,
                            y: 1,
                            orientation: 'vertical'
                        }
                    }
                    else if (i !== 2 && this.inventory[0][i] == '' && this.inventory[0][i+1] == ''){
                        return {
                            x: i+1,
                            y: 1,
                            orientation: 'horizontal'
                        }
                    }
                    else if (i !== 2 && this.inventory[1][i] == '' && this.inventory[1][i+1] == ''){
                        return {
                            x: i+1,
                            y: 2,
                            orientation: 'horizontal'
                        }
                    }
                    else return {
                        x: -1,
                        y: -1,
                        orientation: 'none'
                    }
        }
    }
}
}

class Inventory{
    constructor(tWidth,tHeight,tileArray){
        this.tWidth=tWidth;
        this.tHeight=tHeight;
        this.tileArray=tileArray;
    }
    getTileArray(){
        return this.tileArray;
    }
    getTileSymbol(row,col){
        return this.tileArray[row][col];
    }
}


function makeItem(x,y,sizeX, sizeY, collider, image="") {
    let object = new Sprite(x,y);
    object.w = sizeX;
    object.h = sizeY;
    object.collider = collider;
    if (image !== "") {object.img = image;}
    return {object}
}