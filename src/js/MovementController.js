//Class for moving any sprite, whether through move up
class MovementController {

    //takes a sprite as a target to control
    constructor(target, moveSpeed = 5, hasAnimation = false) {
        this.target = target;
        this.moveSpeed = moveSpeed;
        this.hasAnimation = hasAnimation;
        this.lastDirection = '';
    }
    // Call this for sprites controllable by the player
    handleInput() {
        this.target.velocity = new p5.Vector(0, 0);
        // this.target.velocity=new p5.Vector(0,1)
        if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
            if (this.hasAnimation === true) {
                this.target.changeAni('up');
                this.lastDirection = 'up';
            }
            this.moveUp();
        }
        else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
            if (this.hasAnimation === true) {
                this.target.changeAni('down');
                this.lastDirection = 'down';
            }
            this.moveDown();
        }
        else {
            if (this.hasAnimation === true && this.lastDirection !== '' && this.lastDirection !== 'right' && this.lastDirection !== 'left') {
                var idleDirection = 'idle_' + this.lastDirection;
                this.target.changeAni(idleDirection);
            }
        }
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            if (this.hasAnimation === true) {
                this.target.changeAni('left');
                this.lastDirection = 'left';
            }
            this.moveLeft();
        }
        else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            if (this.hasAnimation === true) {
                this.target.changeAni('right');
                this.lastDirection = 'right';
            }
            this.moveRight();
        }
        else {
            if (this.hasAnimation === true && this.lastDirection !== '' && this.lastDirection !== 'up' && this.lastDirection !== 'down') {
                var idleDirection = 'idle_' + this.lastDirection;
                this.target.changeAni(idleDirection);
            }
        }
        //Handles setting the proper velocity of the sprite
        this.handleMovement();

    }


    handleMovement() {
        //Normalize direction vec
        this.target.velocity.normalize();
        //Multiply magnitude of the 
        this.target.velocity.setMag(this.moveSpeed);
    }
    //Movement functions
    moveUp() {
        this.target.velocity.y = -1; //Adding moves up in screen coords

    }
    moveDown() {
        this.target.velocity.y = 1; //Adding moves down in screen coords
    }

    moveRight() {
        this.target.velocity.x = 1; //Adding moves right in screen coords
    }
    moveLeft() {
        this.target.velocity.x = -1;  //Adding moves left in screen coords
    }
}