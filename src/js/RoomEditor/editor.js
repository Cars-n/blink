// let sprite;
// let room;
// let tiles;
// let floorGroup;
let tileInput;
// let mouseSprite;
// function mouseHoverCallback(a,b){
// console.log(a)
// console.log(b)
// }
// function setup(){
//     const TILE_SIZE=50;

//     createCanvas(1920,1080,document.getElementById("editor"));
//     tileInput=document.getElementById("tileInput");
//     floorGroup = new Group();
// 	floorGroup.w = TILE_SIZE;
// 	floorGroup.h = TILE_SIZE;
// 	floorGroup.tile = '=';
//     floorGroup.color="lightblue";
//     floorGroup.collider="static";

//     tiles=[
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16),
//     "=".repeat(16)];

//     room=new Tiles(tiles,200,200,TILE_SIZE,TILE_SIZE);
//     mouseSprite=new Sprite(mouseX,mouseY,30);
//     mouseSprite.color="white";
//     mouseSprite.outline="black";
//     floorGroup.overlapping(mouseSprite,mouseHoverCallback);
//     // sprite=new Sprite(500,500,100);
// }
// function handleMouse(){
//     mouseSprite.x=mouseX;
//     mouseSprite.y=mouseY;
//     if(mouse.pressing()){
//         mouseSprite.color="#FFAAFF";
//     }
//     else{
//         mouseSprite.color="white";
//     }

// }

// function mouseClicked() {
//     // Check for collision between the sprite and each sprite in the group
//     for (let i = 0; i < floorGroup.length; i++) {
//       if (mouseSprite.overlaps(floorGroup[i])) {
//         // If there's a collision, change the color of the sprite in the group
//         floorGroup[i].text = tileInput.value;
//       } 
//     }
// }  
// function draw(){
//     clear()
//     console.log(tileInput.value);
//     handleMouse();

// }
let tileSize = 80;
let cols, rows;
let tiles = [];
let tileChars = [
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16),
    ".".repeat(16)];

function replaceAt(string, index, replacement) {
    // First part: from the start of the string to the character before the index
    // Second part: the replacement character(s)
    // Third part: from the character after the index to the end of the string
    return string.substring(0, index) + replacement + string.substring(index + 1);
}
function displayRoomArray(){
    var output = document.getElementById("output");
    var outstr="[";
    tileChars.forEach(element => {
        outstr+=element+",\n";
    });
    outstr+="]"
    output.value=outstr;
}

function setup() {
    var btn = document.getElementById("generateBtn");
    btn.addEventListener("click", displayRoomArray);
    createCanvas(16 * tileSize, 9 * tileSize,document.getElementById('editor'));
    tileInput=document.getElementById("tileInput");
    cols = width / tileSize;
    rows = height / tileSize;

    // Initialize tiles
    for (let y = 0; y < rows; y++) {
        tiles[y] = [];
        for (let x = 0; x < cols; x++) {
            tiles[y][x] = 0;
        }
    }
}

function draw() {
    background(220);
    textSize(50);
    textFont("Courier New")
    // Draw grid
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            stroke(0);
            noFill();
            rect(x * tileSize, y * tileSize, tileSize, tileSize);

            // // Draw tiles
            // if (tiles[y][x] === 1) {
            //     fill(0);
            //     rect(x * tileSize, y * tileSize, tileSize, tileSize);
            // }
        }
    }
    // Draw grid
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            fill(0);
            text(tileChars[y][x],x * tileSize+(tileSize/4), y * tileSize+(tileSize/4), tileSize, tileSize);
        }
    }
    // console.log(tileChars)
}

function mouseDragged() {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        if (mouseButton === LEFT) {
            tiles[y][x] = 1;
            tileChars[y]=replaceAt(tileChars[y],x,tileInput.value)
        } else if (mouseButton === RIGHT) {
            tiles[y][x] = 0;
        }
    }
}

function keyPressed() {
    // Clear all tiles when key 'C' is pressed
    if (keyCode === ESCAPE ) {
        tileChars = [
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16),
            ".".repeat(16)];
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                tiles[y][x] = 0;
            }
        }
    }
}
