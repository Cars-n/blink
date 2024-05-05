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

function textBox(text){
    const textBox = document.createElement("div");
            textBox.style.position = "fixed";
            textBox.style.bottom = "100px"; // Adjust the distance from the bottom
            textBox.style.left = "50%";
            textBox.style.transform = "translateX(-50%)";
            textBox.style.backgroundColor = "black";
            textBox.style.color = "red"; // Set the lettering color to red
            textBox.style.padding = "20px";
            textBox.style.borderRadius = "10px";
            textBox.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
            textBox.style.width = "500px"; // Make the text box twice as long
            textBox.style.textAlign = "center"; // Center align the text
            textBox.style.fontSize = "2em"; // Double the font size
            document.body.appendChild(textBox);

            // Typing effect
            typeText(textBox, text, 0);

            // Remove the text box after some time
            setTimeout(() => {
                document.body.removeChild(textBox);
            }, 3000 + (text.length * 50)); // Adjust the timeout to match the typing duration
}