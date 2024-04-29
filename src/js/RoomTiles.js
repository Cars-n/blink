
// Class representing a tile in a room 
class RoomTile {
    constructor(symbol, width, height, colliderType = 'none', collidingCallback = null) {
        // Creating a p5.js group to hold the tile
        this.group = new Group();
        // Setting width and height properties for the group
        this.group.w = width;
        this.group.h = height;
        // Assigning collider type to the group
        this.group.collider = colliderType;
        // Assigning the symbol to the tile
        this.group.tile = symbol;
        // Assigning a callback function for collision events
        this.event = collidingCallback;
        // Setting the layer of the group
        this.group.layer = MAP_LAYER;
        console.log(this.group.colliding)
        // If a colliding callback function is provided, add it to the group's collision event
        if (!(collidingCallback === null)) {
            this.group.colliding(allSprites, this.event);
        }
    }
    //This event is called while colliding, one argument provides an event that can be triggered by all sprites, 2 provides a group or sprite to apply to
    setCollidingEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.group.colliding(target,callback)
       
    }
    setCollidedEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.group.collided(target,callback)
    }
    setCollidesEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.group.collides(target,callback)
    }
    setOverlappingEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.group.overlapping(target,callback)
    }
    setOverlapsEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.group.overlaps(target,callback)
    }
    setOverlappedEvent(callback,target=null){
        target=target===null?allSprites:target;//Set target to all sprites if no target provided
        this.group.overlapped(target,callback)
    }
    // Method to get the tile height
    tileHeight() {
        return this.group.h;
    }

    // Method to get the tile width
    tileWidth() {
        return this.group.w;
    }
}

// Class representing an image tile, inheriting from RoomTile
class ImageTile extends RoomTile {
    /** 
     * Constructor for ImageTile
     * @param {p5.Image} image - Image to represent sprite. Should share dimensions of the sprite.
     * @param {char} symbol - Symbol that represents the tile in a Tiles object
     * @param {int} width - Tile width
     * @param {int} height - Tile height
     * @param {string} colliderType - The type of the collider. See p5Play sprite documentation for collider types
     */
    constructor(image, symbol, width, height, colliderType = 'none', callback = null) {
        // Calling the parent class constructor
        super(symbol, width, height, colliderType, callback);
        // Creating an image object
        this.image = createImage(width, height);
        // Copying the provided image to the created image object
        this.image.copy(image, 0, 0, width, height, 0, 0, width, height);
        // Assigning the image to the group
        this.group.img = this.image;
    }
}
