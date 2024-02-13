
//Class for moving any sprite, whether through move up
class ImageTile {
    /** 
 * 
 * @param {p5.Image} image -  Image to represent sprite. Should share dimensions of the sprite.
 * @param {char} symbol - Symbol that represents the tile in a Tiles object
 * @param {int} width - Tile width
 * @param {int} height - Tile height
 * @param {string} colliderType - The type of the collider. See p5Play sprite documentation for collider types
 */
    constructor(image,symbol,width,height,colliderType='none') {
        
        this.image=createImage(width,height)
        this.image.copy(image,0,0,width,height,0,0,width,height);
        this.group=new Group();
        this.group.img=this.image;
        this.group.w=width;
        this.group.h=height;
        this.group.collider=colliderType;
        this.group.tile=symbol;
    }
}

class EventTile{
    //Takes an Image tile and a callback function to happen on collision
    constructor(tile,eventCallback){
        this.imageTile=tile;
        this.event=eventCallback;
    }

}