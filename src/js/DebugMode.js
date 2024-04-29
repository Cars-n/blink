/**
 * 
 * Sets up and uses debug mode for testing  purposes
 * 
 */



/**
 * 
 * Enables and calls all the testing functions and statistics   
 * 
 * @param {boolean} hitBoxes - Hitboxes enabled?
 * @param {boolean} shapeTest - Enable basic shape test for collision
 */
function turnOnDebugMode(hitBoxes=true, shapeTest=false) {

    if (hitBoxes) {
        allSprites.debug = true;
    }


    if (shapeTest) {
        shapeCollisionDebug();
    }
}



/**
 * 
 * Enables the demo basic shape testing collisions
 * 
 */
function shapeCollisionDebug() {
    let circle = new Sprite();
	let box = new Sprite(100,100,100,100);

    circle.diameter = 100;

	setObjectCollider(box, spriteTypes.STATICOBJECT, true);
	setObjectCollider(circle, spriteTypes.STATICOBJECT, true);

    box.color = 'red';
    circle.color = 'green';

}

