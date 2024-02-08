//Class for moving any sprite, whether through move up
class MovementController {
    //takes a sprite as a target to control
    constructor(target, moveSpeed = 5) {
        this.target = target;
        this.moveSpeed = moveSpeed;
    }
    // Call this for sprites controllable by the player
    handleInput() {
        this.target.velocity = new p5.Vector(0, 0);
        // this.target.velocity=new p5.Vector(0,1)
        if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
            this.moveUp();
        }
        else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
            this.moveDown();
        }
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            this.moveLeft();
        }
        else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            this.moveRight();
        }

        this.handleMovement();

    }
    //Handles setting the proper velocity of the sprite
    handleMovement() {
        //Normalize direction vec
        this.target.velocity.normalize();
        //Multiply magnitude of the 
        this.target.velocity.setMag(this.moveSpeed);
    }

    //Movement functions
    moveUp() {
        this.target.velocity.y = -1;
    }
    moveDown() {
        this.target.velocity.y = 1; //Adding moves down in screen coords
    }
    moveRight() {
        this.target.velocity.x = 1;
    }
    moveLeft() {
        this.target.velocity.x = -1;
    }
}