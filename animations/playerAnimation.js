let player;
let lastDirection = 'idle';

function preload() {
    player = new Sprite(30, 24, 64, 64);
    player.spriteSheet = 'assets/BODY_skeleton.png'; //Template sprite
    player.anis.offset.x = 2;
    player.anis.frameDelay = 8;

    // Animations for movement
    player.addAnis({
        up: { row: 0, frames: 9 },
        left: { row: 1, frames: 9 },
        down: { row: 2, frames: 9 },
        right: { row: 3, frames: 9 },
        
        idle_up: { row: 0, frames: 1 }, 
        idle_left: { row: 1, frames: 1 },
        idle_down: { row: 2, frames: 1 },
        idle_right: { row: 3, frames: 1 },
    });
    player.changeAni('idle_down'); // Starting direction
}

function setup() {
    new Canvas()
    allSprites.pixelPerfect = true;
}

function draw() {
    clear();
    var moving = false;

    // Movement Animation
    if (kb.pressing('up')) {
        player.changeAni('up');
        moving = true;
        lastDirection = 'up';
    } else if (kb.pressing('down')) {
        player.changeAni('down');
        moving = true;
        lastDirection = 'down';
    } else {
        player.vel.y = 0;
    }

    if (kb.pressing('left')) {
        player.changeAni('left');
        moving = true;
        lastDirection = 'left';
    } else if (kb.pressing('right')) {
        player.changeAni('right');
        moving = true;
        lastDirection = 'right';
    } else {
        player.vel.x = 0;
    }

    // When not moving
    if (!moving) {
        switch (lastDirection) {
            case 'up':
                player.changeAni('idle_up');
                break;
            case 'down':
                player.changeAni('idle_down');
                break;
            case 'left':
                player.changeAni('idle_left');
                break;
            case 'right':
                player.changeAni('idle_right');
                break;
        }
    }
}
