/**
 * 
 * Player of the game - settings and other setup
 *
 */


function setupPlayer(){
    player = new Sprite(0, 0, 64, 64);
    player.room={"x":0,"y":0};
    player.spriteSheet = 'assets/player.png';
    player.anis.offset.x = 2;
    player.anis.frameDelay = 8;
    player.layer = PLAYER_LAYER;
    //Configures the collision settings based on presetsd
    //turns on rotation lock (A MUST!!!), and sets the
    //collider type as dynamic
    setObjectCollider(player, spriteTypes.PLAYER, true);
    player.tag="player";
    player.addAnis({
        up: { row: 8, frames: 9 },
        left: { row: 9, frames: 9 }, 
        down: { row: 10, frames: 9 },
        right: { row: 11, frames: 9 },
    
        idle_up: { row: 8, frames: 1 }, 
        idle_left: { row: 9, frames: 1 },
        idle_down: { row: 10, frames: 1 },
        idle_right: { row: 11, frames: 1 },
    });
    player.changeAni('idle_up'); // Starting direction
    // Animations for movement
    return player;
}


