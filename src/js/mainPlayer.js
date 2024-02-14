/**
 * 
 * Player of the game - settings and other setup
 *
 */


function setupPlayer(){
    player = new Sprite(300, 300, 64, 64);
    player.spriteSheet = 'assets/BODY_skeleton.png';
    player.anis.offset.x = 2;
    player.anis.frameDelay = 8;
    player.layer = 2;
    //Configures the collision settings based on presets
    //turns on rotation lock (A MUST!!!), and sets the
    //collider type as dynamic
    setObjectCollider(player, spriteTypes.PLAYER, true);
    
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
    player.changeAni('idle_up'); // Starting direction
    // Animations for movement
    return player;
}

