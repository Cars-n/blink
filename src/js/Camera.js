const FADERATE = 0.01;
const FADELAYER = 3;
let HASFADEDIN = true;
let HASFADEDOUT = true;
let HASMOVEDCAMERA = false;

function makeCameraFollowPlayer(){
    camera.x = player.x;
	camera.y = player.y;
}

    //Creates a Sprite that cover the entire screen. 
function createFadeScreen(){
    object = new Sprite(500, 500, 100000,100000);
    object.color = 'black';
    
    object.collider = 'none';
    object.layer = FADELAYER; //Layer needs to be higher than the layer of every other Sprite
    object.opacity = 0;
    return object;
}

//Run constantly, If HASFADEDIN and HASFADEDOUT are false it will Fade the fadeScreen in over eveything. 
// HASFADEDIN and HASFADEDOUT shouldn't be changed manually, use the fadeScreenNow function to reset them.
function fadeInAndOut(ScreenSprite){
    if (kb.presses('.')) {HASFADEDIN = false; HASFADEDOUT = false;}
    if (!HASFADEDIN){
        HASFADEDIN = fadeIn(ScreenSprite);
    }
    else if (!HASFADEDOUT){
        HASFADEDOUT = fadeOut(ScreenSprite);
    }
}

//Fades the object in by raising it's opacity.
function fadeIn(object){
    if(object.opacity <= 1){
    object.opacity += FADERATE;
    return false;
    }
    else {
        console.log('Hello');
        object.opacity = 1;
        return true;
    }
}


// Fades the object out by lowering it's opacity.
function fadeOut(object){
    if(object.opacity >= 0){
        object.opacity = Math.max(object.opacity - FADERATE, 0);
        return false;
    }
    else {
        object.opacity = 0;
        return true;
    }

}


//Moves the camera in the direction specified. takes "up", "down", "left", "right" as arguments.
function moveCamera(direction){
   if(!HASMOVEDCAMERA){
    if (direction == "up") camera.y -= 1080;
    else if (direction == "down") camera.y += 1080;
    else if (direction == "left") camera.x -= 1920;
    else if (direction == "right") camera.x += 1920;
   }
   HASMOVEDCAMERA = true;
}


//Moves the player in the direction specified. takes "up", "down", "left", "right" as arguments. Used to teleport to the next room. 
function movePlayer(direction){
    if (direction == "up") player.y -= 80;
    else if (direction == "down") player.y += 80;
    else if (direction == "left") player.x -= 80;
    else if (direction == "right") player.x += 80;
}


//Resets the HASFADEDIN and HASFADEDOUT variables. In order to fade the screen. Call then when you want to fade the screen. 
function fadeScreenNow(){
    HASFADEDIN = false;
    HASFADEDOUT = false;
}

window.addEventListener("resize", canvasResize);

function canvasResize() {
    resizeCanvas(1920,1080,document.getElementById("game"));
	canvas.style=""; // removes default canvas styling
}