

// Class representing a tile in a room 
class Furnishing {
    
    constructor(width, height,image=null, colliderType = 'none', collidingCallback = null) {
        //Data necessary to construct our sprite
        this.width=width;
        this.height=height;
        this.image = createImage(width, height);
        // Copying the provided image to the created image object
        this.image.copy(image, 0, 0, width, height, 0, 0, width, height);
        this.colliderType=colliderType;
        this.event=collidingCallback;
        this.tileOffsetX=null;
        this.tileOffsetY=null;
        this.furnishSprite=null;
        this.position
        // Creating a p5.js group to hold the tile
        
    }
    setTilePosition(x,y){
        this.tileOffsetX=x;
        this.tileOffsetY=y;
    }
    applyWorldOffset(offsetX,offsetY){
        if(this.furnishSprite===null){
            return;
        }
        this.furnishSprite.x=offsetX+(RoomController.TILE_WIDTH * this.tileOffsetX);
        this.furnishSprite.y=offsetY+(RoomController.TILE_WIDTH * this.tileOffsetY);
    }
    instantiateSprite(worldX,worldY){
        this.furnishSprite = new Sprite();
        this.furnishSprite.image=this.image;
        this.applyWorldOffset(worldX,worldY);
        // Setting width and height properties for the group
        this.furnishSprite.w = this.width;
        this.furnishSprite.h = this.height;
        // Assigning collider type to the group
        this.furnishSprite.collider = this.colliderType;
    
        // Setting the layer of the group
        this.furnishSprite.layer =2;
        // console.log(this.furnishSprite.colliding);
        // If a colliding callback function is provided, add it to the group's collision event
        if (!(this.event === null)) {
            this.furnishSprite.colliding(allSprites, this.event);
        } 
    }
    getTileX(){
        return this.tileOffsetX;
    }
    getTileY(){
        return this.tileOffsetY;
    }
    //This event is called while colliding, one argument provides an event that can be triggered by all sprites, 2 provides a group or sprite to apply to
    setCollidingEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.furnishSprite.colliding(target,callback)
       return this;
    }
    setCollidedEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.furnishSprite.collided(target,callback)
        return this;
    }
    setCollidesEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.furnishSprite.collides(target,callback)
        return this;
    }
    setOverlappingEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.furnishSprite.overlapping(target,callback)
    }
    setOverlapsEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.furnishSprite.overlaps(target,callback)
        return this;
    }
    setOverlappedEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.furnishSprite.overlapped(target,callback)
        return this;
    }
    // Method to get the tile height
    getHeight() {
        return this.furnishSprite.h;
    }

    // Method to get the tile width
    getWidth() {
        return this.furnishSprite.w;
    }
}
