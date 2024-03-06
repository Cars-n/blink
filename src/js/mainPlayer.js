/**
 * 
 * Player of the game - settings and other setup
 *
 */


function setupPlayer(roomX=0,roomY=0){
    
    let xOffset=(RoomController.TILE_WIDTH /2)+(roomX*CANVAS_WIDTH_PX )+300;
    let yOffset=(RoomController.TILE_HEIGHT/2)+(roomY*CANVAS_HEIGHT_PX)+300;


    player = new Sprite(xOffset, yOffset, 64, 64);
    player.room={"x":roomX,"y":roomY};
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


