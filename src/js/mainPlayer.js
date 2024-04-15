/**
 * 
 * Player of the game - settings and other setup
 *
 */
const BULLETSPEED = 15;


function setupPlayer(roomX=0,roomY=0){
    
    let xOffset=(RoomController.TILE_WIDTH /2)+(roomX*CANVAS_WIDTH_PX )+300;
    let yOffset=(RoomController.TILE_HEIGHT/2)+(roomY*CANVAS_HEIGHT_PX)+300;


    player = new Sprite(xOffset, yOffset, 64, 64);
    player.room={"x":roomX,"y":roomY};
    player.spriteSheet = 'assets/player.png';
    player.anis.offset.x = 2;
    player.anis.frameDelay = 8;
    player.layer = PLAYER_LAYER;
    player.health = 101;
    player.debug = true;
    
    //Configures the collision settings based on presets
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




function gunFunctionality(){
    if(
       inventory.hasItem(gun) &&
         kb.pressed(' ')
         && inventory.hasItem(bulletItem)
        ){
            let bullet = new bullets.Sprite();
        if(playerMovement.lastDirection == "left"){
              bullet.x = player.x - 45;
              bullet.y = player.y;
        }
        else {
            bullet.x = player.x + 45;
            bullet.y = player.y;
        }

        if(kb.pressing("w") && kb.pressing("a")){
            bullet.direction = 225;
        }
        else if(kb.pressing("w") && kb.pressing("d")){
            bullet.direction = -45;
        }
        else if(kb.pressing("s") && kb.pressing("a")){
            bullet.direction = 135;
        }
        else if(kb.pressing("s") && kb.pressing("d")){
            bullet.direction = 45;
        }
        else if(kb.pressing("w")){
            bullet.direction = -90;
        }
        else if(kb.pressing("a")){
            bullet.direction = 180;
        }
        else if(kb.pressing("s")){
            bullet.direction = 90;
        }
        else if(kb.pressing("d")){
            bullet.direction = 0;
        }
        else {
            bullet.direction = playerMovement.lastDirection;
        }
    }
}


function setUpBullets(){
    bullets = new Group();
    bullets.img = bulletImage;
    bullets.rotationLock = true;
    bullets.img = bulletImage;
    bullets.speed = BULLETSPEED;
}


function bulletCollisions(){
    bullets.collides(RoomController.wallTile.group, bulletRemove)
    bullets.collides(RoomController.barsTile.group, bulletRemove)
    bullets.collides(RoomController.upDoor.group, bulletRemove)
    bullets.collides(RoomController.rightDoor.group, bulletRemove)
    bullets.collides(RoomController.leftDoor.group, bulletRemove)
    bullets.collides(RoomController.downDoor.group, bulletRemove)
    bullets.collides(RoomController.trapDoor.group, bulletRemove)
    bullets.collides(RoomController.trapDoorBack.group, bulletRemove)
    bullets.collides(RoomController.secretDoor.group, bulletRemove)
    bullets.collides(RoomController.upstairsDoor.group, bulletRemove)
    bullets.collides(RoomController.middleFloorDoor.group, bulletRemove)
}


 function bulletRemove(bullet, tile){
    bullet.remove();
 }

