let CANFIRELASER = false;
let PLAYERIFRAMES = false;
let CANFIRELITTLEEYES = true;
let littleEyes;
let littleEye;
function giantEyeBossfight(){
    littleEyes.collides(player, () => {
        if(!PLAYERIFRAMES){
            PLAYERIFRAMES = true;
            player.health -= 100;
            playerInvincibility();
        }
    });
    if(player.collides(laser) && !PLAYERIFRAMES){
        PLAYERIFRAMES = true;
        player.health -= 100;
        playerInvincibility();
    }
    if(CANFIRELASER)shootLaser(player.x, player.y);
    if(CANFIRELITTLEEYES){
        CANFIRELITTLEEYES = false;
        for(let i = 0; i < 3; i++){
            littleEye = new littleEyes.Sprite();
            littleEye.x = laser.x + 50;
            littleEye.y = laser.y;
            littleEyes.vel.x = Math.random()*5 * (Math.random() > 0.5 ? 1 : -1);
            littleEyes.vel.y =Math.random()*5 * (Math.random() > 0.5 ? 1 : -1);
        }
            littleEyesDelay();
    }
}



function setupLaser(laser, x, y){
    laser = new Sprite(x,y,5000,100)
    laser.img = 'assets/LaserEyeBeam.png';
    laser.scale = 0.4;
    laser.offset.x = 500;
    laser.collider = 'none';
    laser.visible = false;
    return laser;
}

function setupEyes(){
            littleEyes = new Group();
            littleEyes.r = 10;
            littleEyes.img = "assets/GiantEye.png";
            littleEyes.scale = 0.15;
            littleEyes.collider = "Dynamic";
            littleEyes.friction = 0;
            littleEyes.drag = 0;
}

async function shootLaser(x,y){
    CANFIRELASER = false;
    laser.rotation = Math.atan2( y - laser.y, x - laser.x ) * ( 180 / Math.PI )
    laser.visible = true;
    laser.opacity = 0.25;
    await delay(500);
    laser.opacity = 0.5;
    await delay(100);
    laser.opacity = 0.75;
    await delay(100);
    laser.opacity = 1;
    laser.collider = 'static'
    await delay(1000);
    laser.opacity = 0.75;
    await delay(100);
    laser.opacity = 0.5;
    laser.collider = 'none';
    await delay(100);
    laser.opacity = 0.25;
    await delay(100);
    laser.visible = false;
    laserDelay();
}
async function laserDelay(){
    await delay(2000);
    CANFIRELASER = true;
}

async function playerInvincibility(){
    await delay(1000);
    PLAYERIFRAMES = false;
}

async function littleEyesDelay(){
    await delay(5000);
    CANFIRELITTLEEYES = true;
}