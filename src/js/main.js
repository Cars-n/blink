//I need to revert all of this
function createMenuScreen() {
    var object = new Sprite(1920 / 2, 1080 / 2, 1920, 1080);
    object.image = mainMenuImage;
    object.layer = MAIN_MENU_LAYER;
    object.collider = "none";
    return object;
}

function waitForOpacityCondition(timeout) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        function checkCondition() {
            // console.log("this is the Opacity: " + OPACITYEQUALSONE + "\n"+ "this is the variable: " + variable);
            if (OPACITYEQUALSONE === true) {
                resolve(OPACITYEQUALSONE);
            } else if (Date.now() - startTime >= 10000) {
                reject(new Error("Timeout waiting for condition"));
            } else {
                setTimeout(checkCondition, 1); // Adjust the interval as needed
            }
        }

        checkCondition();
    });
}

// Example usage
