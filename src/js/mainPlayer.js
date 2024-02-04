/**
 * Main player of the game done in a class, will include a spirte and collision and movement
 * 
 * 
 * 
 */


export class Player {
    constructor(characterSprite, collsionType) {
        this.Sprite = new Sprite(characterSprite);

        console.log("Made a new player!!");

        this.Sprite.diameter(50);

    }

    setPlayerCollision(newCollision) {
        this.Sprite.collider = newCollision;
    }


}