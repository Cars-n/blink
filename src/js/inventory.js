class InventoryController {
    static TILE_HEIGHT = 200;
    static TILE_WIDTH = 200;
    static INVENTORY_WIDTH = 3;
    static INVENTORY_HEIGHT = 2;
    static firstLoad = true;
    static tile;

    constructor() {
        this.inventory = [['','',''],['','','']];
        this.inventoryRendered = false;
        if (InventoryController.firstLoad == true) {
            InventoryController.firstLoad == false;
            // Creating inventory tile
            InventoryController.tile = new ImageTile(InventoryBackground, ';', InventoryController.TILE_WIDTH, InventoryController.TILE_HEIGHT, 'none');
        }

    }

    renderInventory() {
        var invent = new Tiles(
            [
                ';;;',
                ';;;',
            ],
            ((Math.ceil(player.x/1920)*1920-960)-(InventoryController.TILE_WIDTH)), ((Math.ceil(player.y/1080)*1080-540)-(InventoryController.TILE_HEIGHT)),
            InventoryController.TILE_WIDTH,
            InventoryController.TILE_HEIGHT
        );
        for(let j = 0; j < InventoryController.INVENTORY_HEIGHT; j++){
            for(let i = 0; i < InventoryController.INVENTORY_WIDTH; i++){
                if (this.inventory[j][i] !==''){
                    let item = this.inventory[j][i];
                    item.itemSprite.visible = true;
                    item.itemSprite.scale = item.scaleVector;
                    let location = this.getTileLocation(i,j);
                    if (item.orientation == 'none'){
                        item.itemSprite.x = location.x;
                        item.itemSprite.y = location.y;
                    }
                    else if (item.orientation == 'horizontal'){
                        item.itemSprite.rotation = 0;
                        item.itemSprite.x = location.x;
                        item.itemSprite.y = location.y;
                        item.itemSprite.x += InventoryController.TILE_WIDTH/2;
                        ++i;
                    }
                    else if (item.orientation == 'vertical' && j == 0){
                        item.itemSprite.x = location.x;
                        item.itemSprite.y = location.y;
                        item.itemSprite.y += InventoryController.TILE_HEIGHT/2;
                    }
                }
            }
        }
    }


    getTileLocation(x, y){
        x+=1;
        y+=1;
        let topCornerX = ((Math.ceil(player.x/1920)*1920-960)) - InventoryController.TILE_WIDTH * 1.5;
        let topCornerY = ((Math.ceil(player.y/1080)*1080-540)) - InventoryController.TILE_WIDTH * 1.5;
        return {
            x: (topCornerX + (x * InventoryController.TILE_WIDTH)) - InventoryController.TILE_WIDTH/2,
            y: (topCornerY + (y * InventoryController.TILE_HEIGHT)) - InventoryController.TILE_HEIGHT/2
        }
    }

    hasSpace(x,y){
        if(x * y == 1){
            if (this.inventory[0].indexOf('') !== -1) return {
                x: this.inventory[0].indexOf(''),
                y: 0,
                orientation: 'none'
            };
            if(this.inventory[1].indexOf('') !== -1) return {
                x: this.inventory[1].indexOf(''),
                y: 1
            } 
            else return {
                x: -1,
                y: -1,
                orientation: 'none'
            }

        }
        if (x*y == 2){
            for(let i = 0; i < InventoryController.INVENTORY_WIDTH-1; i++){
                if(this.inventory[0][i] == '' && this.inventory[1][i] == ''){
                    return {
                        x: i,
                        y: 0,
                        orientation: 'vertical'
                    }
                }
                else if (i !== 2 && this.inventory[0][i] == '' && this.inventory[0][i+1] == ''){
                    return {
                        x: i,
                        y: 0,
                        orientation: 'horizontal'
                    }
                }
                else if (i !== 2 && this.inventory[1][i] == '' && this.inventory[1][i+1] == ''){
                    return {
                        x: i,
                        y: 1,
                        orientation: 'horizontal'
                    }
                }
            }
            return {
                x: -1,
                y: -1,
                orientation: 'none'
            }
        }
    }
    //PAO = position and orientation, taken from hasSpace();
    // It's a dictionary where {x: int, y: int, orientation: string}
    // Will return true is successful and false if not.
    insertItem(item, PAO){ 
        if(PAO.x == -1) return false;
        item.inInventory = true;
        this.inventory[PAO.y][PAO.x] = item;
        if(PAO.orientation == 'horizontal'){
            item.orientation = 'horizontal';
            this.inventory[PAO.y][PAO.x+1] = item;
        }
        else if(PAO.orientation == 'vertical'){
            item.orientation = 'vertical';
            this.inventory[PAO.y+1][PAO.x] = item;
        }
        return true;
    }

    remove(){
        for(let i = 0; i < InventoryController.INVENTORY_WIDTH; i++){
            if (this.inventory[0][i] !==''){
                this.inventory[0][i].itemSprite.visible = false;
                this.inventory[0][i].itemSprite.x = 10000;


            }
            if (this.inventory[1][i] !==''){
                this.inventory[1][i].itemSprite.x = 10000;
            }
        }
        InventoryController.tile.group.removeAll();
    }


    removeItem(item, drop){
        item.inInventory = false;
        for(let j = 0; j < InventoryController.INVENTORY_HEIGHT; j++){
            for(let i = 0; i < InventoryController.INVENTORY_WIDTH; i++){
                if(this.inventory[j][i].name == item.name) {
                    if(item.orientation == 'none') {
                        this.inventory[j][i].itemSprite.visible = false;
                        if(drop == "") this.inventory[j][i].itemSprite.remove()
                        else if (drop == "remove") this.inventory[j][i].itemSprite.visible = true;
                        else if (drop == "drop"){
                            this.inventory[j][i].itemSprite.visible = true;
                            this.inventory[j][i].itemSprite.x = player.x + 30;
                            this.inventory[j][i].itemSprite.x = player.y + 30;
                            this.inventory[j][i].itemSprite.scale = 1;
                        }
                        this.inventory[j][i] = '';
                        return true;
                    }
                    else if (item.orientation == 'horizontal'){
                        this.inventory[j][i].itemSprite.visible = false;
                        if(drop == "") this.inventory[j][i].itemSprite.remove()
                        else if (drop == "remove") this.inventory[j][i].itemSprite.visible = true;
                        else if (drop == "drop"){
                            this.inventory[j][i].itemSprite.visible = true;
                            this.inventory[j][i].itemSprite.x = player.x + 30;
                            this.inventory[j][i].itemSprite.x = player.y + 30;
                            this.inventory[j][i].itemSprite.scale = 1;
                        }
                        this.inventory[j][i] = '';
                        this.inventory[j][i+1] = '';
                        return true;
                    }
                    else if (item.orientation == 'vertical'){
                        this.inventory[j][i].itemSprite.visible = false;
                        if(drop == "") this.inventory[j][i].itemSprite.remove()
                        else if (drop == "remove") this.inventory[j][i].itemSprite.visible = true;
                        else if (drop == "drop"){
                            this.inventory[j][i].itemSprite.visible = true;
                            this.inventory[j][i].itemSprite.x = player.x + 30;
                            this.inventory[j][i].itemSprite.x = player.y + 30;
                            this.inventory[j][i].itemSprite.scale = 1;
                        }
                        this.inventory[j][i] = '';
                        this.inventory[j+1][i] = '';
                        return true;
                    }
                }
            }
        }
        return false;
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


class Item{
    constructor(spawnX, spawnY, item_name, inventoryX, inventoryY, width, height, image='', layer=3, friction=10, drag = 10){
        this.name = item_name;
        this.InventoryX = inventoryX;
        this.InventoryY = inventoryY;
        this.scaleVector = (InventoryController.TILE_WIDTH-50)/(width > height ? width : height) * inventoryX * inventoryY;
        this.itemSprite = new Sprite(spawnX, spawnY, width, height);
        this.orientation = 'none';
        this.inInventory = false;
        if(image !== '') this.itemSprite.img = image;
        this.itemSprite.layer =  layer;
        this.itemSprite.friction = friction;
        this.itemSprite.drag = drag;
        setObjectCollider(this.itemSprite, spriteTypes.MOVABLEOBJECT);
    }


}


function dragItem(item, inventory){
    if(item.inInventory == true){
    if (item.itemSprite.mouse.hovering()) mouse.cursor = 'grab';
		else mouse.cursor = 'default';

		if (item.itemSprite.mouse.dragging()) {
			item.itemSprite.moveTowards(
				mouse.x + item.itemSprite.mouse.x,
				mouse.y + item.itemSprite.mouse.y,
				1 // full tracking
			);
		}
        else if (item.itemSprite.x == 10000) {
            return;
        }
        else if (
            item.itemSprite.x < ((Math.ceil(player.x/1920)*1920-960)-(InventoryController.TILE_WIDTH*1.5)) 
        ||  item.itemSprite.x > (((Math.ceil(player.x/1920)*1920-960)-(InventoryController.TILE_WIDTH)) + (InventoryController.TILE_WIDTH * 2.5)) 
        ||  item.itemSprite.y < ((Math.ceil(player.y/1080)*1080-540)-(InventoryController.TILE_HEIGHT)*1.5)
        ||  item.itemSprite.y > ((Math.ceil(player.y/1080)*1080-540)-(InventoryController.TILE_HEIGHT)) + (InventoryController.TILE_HEIGHT * 1.5)) 
        {
            console.log('removing');
            inventory.removeItem(item, "drop");
        }
        else {
            for (let i = 0; i < InventoryController.INVENTORY_WIDTH; i++){
                if(item.orientation == 'vertical'){
                    if(Math.abs(item.itemSprite.x  - InventoryController.TILE_HEIGHT/2 - inventory.getTileLocation(i,0).x) < 100) {
                        inventory.removeItem(item,"remove")
                        inventory.insertItem(item, {x:i, y:0, orientation: 'vertical'})
                        item.itemSprite.x = inventory.getTileLocation(i,0).x;
                        item.itemSprite.y = inventory.getTileLocation(i,0).y + InventoryController.TILE_HEIGHT/2;
                        return;
                    }
                }
                else if(item.orientation == 'horizontal'){
                    if(Math.abs(item.itemSprite.x - InventoryController.TILE_WIDTH/2 - inventory.getTileLocation(i,0).x) < 100) {
                        item.itemSprite.x = inventory.getTileLocation(i,0).x + InventoryController.TILE_WIDTH/2;
                        if(Math.abs(item.itemSprite.y - inventory.getTileLocation(0,0).y) < 100) {
                            inventory.removeItem(item,"remove")
                            inventory.insertItem(item, {x:i, y:0, orientation: 'horizontal'})
                            item.itemSprite.y = inventory.getTileLocation(0,0).y;
                            return;
                        }
                        else {
                            inventory.removeItem(item,"remove")
                            inventory.insertItem(item, {x:i, y:1, orientation: 'horizontal'})
                            item.itemSprite.y = inventory.getTileLocation(0,1).y;
                        }
                        return;
                    }
                }
                else{
                    if(Math.abs(item.itemSprite.x - inventory.getTileLocation(i,0).x) < 100 && item.itemSprite.x != inventory.getTileLocation(i,0).x) {
                        item.itemSprite.x = inventory.getTileLocation(i,0).x;
                        if(Math.abs(item.itemSprite.y - inventory.getTileLocation(0,0).y) < 100) {
                            inventory.removeItem(item,"remove")
                            inventory.insertItem(item, {x:i, y:0, orientation: 'none'})
                            item.itemSprite.y = inventory.getTileLocation(0,0).y;
                        }
                        else {
                            inventory.removeItem(item,"remove")
                            inventory.insertItem(item, {x:i, y:1, orientation: 'none'})
                            item.itemSprite.y = inventory.getTileLocation(0,1).y;
                        }
                    }
                }
            }
        }
    }
}
