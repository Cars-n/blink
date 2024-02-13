/**
 * 
 *  Functions & Utilities for collision related settings
 * 
 */

/**
 * Enumerator for the types of sprites in the game
 */
const spriteTypes = Object.freeze({ 
    NONE: 0,
    PLAYER: 1,
    ENEMY: 2,
    MOVABLEOBJECT: 3,
    STATICOBJECT: 4,
    WALL: 5,
});



/**
 * Sets the collision type based on the object passed in and the type
 * 
 * @param gameObject - The sprite for collisions to be set on
 * @param objectType - From spriteTypes enum, will specify which settings to use
 * @param rotationLock - true or false, will set the roationlock for the sprite
 */
function setObjectCollider(gameObject, objectType=spriteTypes.NONE, rotationLock=true) {

    //Switch based on the enum for the type of object to set
    //collisions on
    switch(objectType) {
        case spriteTypes.PLAYER:
            gameObject.collider = 'dynamic';
            gameObject.rotationLock = rotationLock;
            break;
        case spriteTypes.ENEMY:
            gameObject.collider = 'dynamic'; 
            gameObject.rotationLock = rotationLock;
            break;
        case spriteTypes.MOVABLEOBJECT:
            gameObject.collider = 'dynamic';
            gameObject.rotationLock = rotationLock;
            break;
        case spriteTypes.STATICOBJECT:
            gameObject.collider = 'static';
            gameObject.rotationLock = rotationLock;
            break;

        case spriteTypes.WALL:
            gameObject.collider = 'static';
            break;

        default:    //Used for NONE type
        gameObject.rotationLock = rotationLock;
        break;
    }
}