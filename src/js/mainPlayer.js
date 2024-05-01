/**
 *  
 * Player of the game - settings and other setup
 *
 */
const BULLETSPEED = 15;
let CANSHOOT = true;

function setupPlayer(roomX=0,roomY=0){
    
    let xOffset=(RoomController.TILE_WIDTH /2)+(roomX*CANVAS_WIDTH_PX )+300;
    let yOffset=(RoomController.TILE_HEIGHT/2)+(roomY*CANVAS_HEIGHT_PX)+300;


    player = new Sprite(xOffset, yOffset, 30, 51);
    player.room={"x":roomX,"y":roomY};
    player.spriteSheet = 'assets/player.png';
    player.anis.offset.x = 2;
    player.anis.frameDelay = 8;
    player.layer = PLAYER_LAYER;
    player.health = 101;
    player.debug = false;
    
    //Configures the collision settings based on presets
    //turns on rotation lock (A MUST!!!), and sets the
    //collider type as dynamic
    setObjectCollider(player, spriteTypes.PLAYER, true);
    player.tag="player";
    player.addAni('up', "../../assets/PlayerAnimations/upWalking/1.png", "../../assets/PlayerAnimations/upWalking/2.png", "../../assets/PlayerAnimations/upWalking/3.png", "../../assets/PlayerAnimations/upWalking/4.png", "../../assets/PlayerAnimations/upWalking/5.png", "../../assets/PlayerAnimations/upWalking/6.png", "../../assets/PlayerAnimations/upWalking/7.png", "../../assets/PlayerAnimations/upWalking/8.png", "../../assets/PlayerAnimations/upWalking/9.png",)
    player.addAni('left', "../../assets/PlayerAnimations/leftWalking/1.png", "../../assets/PlayerAnimations/leftWalking/2.png", "../../assets/PlayerAnimations/leftWalking/3.png", "../../assets/PlayerAnimations/leftWalking/4.png", "../../assets/PlayerAnimations/leftWalking/5.png", "../../assets/PlayerAnimations/leftWalking/6.png", "../../assets/PlayerAnimations/leftWalking/7.png", "../../assets/PlayerAnimations/leftWalking/8.png", "../../assets/PlayerAnimations/leftWalking/9.png",)
    player.addAni("down", "../../assets/PlayerAnimations/downWalking/1.png", "../../assets/PlayerAnimations/downWalking/2.png", "../../assets/PlayerAnimations/downWalking/3.png", "../../assets/PlayerAnimations/downWalking/4.png", "../../assets/PlayerAnimations/downWalking/5.png", "../../assets/PlayerAnimations/downWalking/6.png", "../../assets/PlayerAnimations/downWalking/7.png", "../../assets/PlayerAnimations/downWalking/8.png", "../../assets/PlayerAnimations/downWalking/9.png",)
    player.addAni("right", "../../assets/PlayerAnimations/rightWalking/1.png", "../../assets/PlayerAnimations/rightWalking/2.png", "../../assets/PlayerAnimations/rightWalking/3.png", "../../assets/PlayerAnimations/rightWalking/4.png", "../../assets/PlayerAnimations/rightWalking/5.png", "../../assets/PlayerAnimations/rightWalking/6.png", "../../assets/PlayerAnimations/rightWalking/7.png", "../../assets/PlayerAnimations/rightWalking/8.png", "../../assets/PlayerAnimations/rightWalking/9.png",)
    player.addAni("idle_up", "../../assets/PlayerAnimations/upWalking/1.png");
    player.addAni("idle_left", "../../assets/PlayerAnimations/leftWalking/1.png");
    player.addAni("idle_down", "../../assets/PlayerAnimations/downWalking/1.png");
    player.addAni("idle_right", "../../assets/PlayerAnimations/rightWalking/1.png");
    player.changeAni('idle_up'); // Starting direction
    // Animations for movement
    return player;
}




function gunFunctionality(){
    if(
       inventory.hasItem(gun) &&
         kb.pressed(' ')
         && inventory.hasItem(bulletItem) 
         && CANSHOOT
        ){
            CANSHOOT = false;
            shootDelay();
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
 async function shootDelay(){
    await delay(2000);
    CANSHOOT = true;
 }