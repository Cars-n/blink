/**
 * File dealing with camera and player view functionality
 */

//Adds an event listener to the window for resizing of
//the browser window
window.addEventListener("resize", canvasResize);

function makeCameraFollowPlayer(){
    camera.x = player.x;
	camera.y = player.y;
}

/**
 * Function to resize the canvas based on changing window sizes
 */
function canvasResize() {
    resizeCanvas();
}