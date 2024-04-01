// let sprite;
// let room;
// let tiles;
// let floorGroup;
let tileInput;
function preload() {
	InventoryBackground = loadImage('assets/InventoryBackground.png');
	keyImage = loadImage('assets/key.png');
	brickImage = loadImage('assets/WallRoughDraft.png');
	flashlightImage = loadImage('assets/Flashlight.png');
	floorBoardImage = loadImage("assets/floortiles.png");
	doorImage=loadImage("assets/Door.png");
    cellBarsImage = loadImage("assets/cellBars.jpg");
    trapDoorImage = loadImage("assets/trapdoor.png");
	// darknessImage = loadImage("assets/darkness.svg");
	// soundFormats('mp3');
	// doorCreak = loadSound('assets/audio/doorCreak.mp3');
	// doorCreak.setVolume(0.5);
	// footsteps = loadSound('assets/audio/footsteps.mp3');
	// footsteps.setVolume(0.5);
	// mainMenuBackground = loadImage("assets/Main-Menu-Background2.png");
}
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
let roomController;
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
    var outstr="[\n";
    tileChars.forEach(element => {
        outstr+=element+",\n";
    });
    outstr+="]"
    output.value=outstr;
}
function buttonFromTile(tile){
    const button = document.createElement('button');
      button.classList.add('tile-button');
      button.style.backgroundImage = tile.image.get();
      button.id=tile.group.tile;
      button.tooltip=tile.group.tile;
    return button
}
let pallet;
function populateTileButtons(){
    pallet = new Tiles(
        ['^v',
        '=o',
        '<>'
        ],
        tileSize/2,
        tileSize/2,
        tileSize+10,
        tileSize+10)
    // let buttonContainer = document.getElementById('pallet-container');
    

    // buttonContainer.appendChild(buttonFromTile(RoomController.wallTile));
    // buttonContainer.appendChild(buttonFromTile(RoomController.floor));
    // buttonContainer.appendChild(buttonFromTile(RoomController.upDoor));
    // buttonContainer.appendChild(buttonFromTile(RoomController.rightDoor));
    // buttonContainer.appendChild(buttonFromTile(RoomController.leftDoor));
    // buttonContainer.appendChild(buttonFromTile(RoomController.downDoor));

}

function setup() {
    //Set up generator button
    var btn = document.getElementById("generateBtn");
    btn.addEventListener("click", displayRoomArray);

    //Set up copy
    document.getElementById('copyBtn').addEventListener('click', function() {
        var textarea = document.getElementById('output');
        textarea.select();
        navigator.clipboard.writeText(textarea.value);

    });
    

    createCanvas( 19 * tileSize, 9 * tileSize,document.getElementById('editor'));
    tileInput=document.getElementById("tileInput");
    cols = 16;
    rows = 9;

    // Initialize tiles
    for (let y = 0; y < rows; y++) {
        tiles[y] = [];
        for (let x = 0; x < cols; x++) {
            tiles[y][x] = 0;
        }
    }
    RoomController.TILE_HEIGHT=tileSize;
    RoomController.TILE_WIDTH=tileSize;
    roomController=new RoomController();
    //Must set tiles with null collider to static
    RoomController.floor.group.collider='static';
    populateTileButtons();
    // var button=createButton("hi")
    // button.image=roomController.wallTile.image
}
let offsetX=tileSize*2.5;
function draw() {
    background(220);
    textSize(50);
    textFont("Courier New")
    
    
    // Draw grid
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            stroke(0);
            noFill();
            rect(x * tileSize+offsetX, y * tileSize, tileSize, tileSize);

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
            text(tileChars[y][x],(x * tileSize)+(tileSize/4)+offsetX, y * tileSize+(tileSize/4), tileSize, tileSize);
        }
    }
    for(let tile of pallet){
        if(tile.mouse.pressing()){
            tileInput.value=tile.tile;
        
        }
    }
    
    // console.log(tileChars)
}

function mouseDragged() {
    let x = floor((mouseX-offsetX) / tileSize);
    let y = floor(mouseY / tileSize);

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        if (mouseButton === LEFT) {
            tiles[y][x] = 1;
            var val=tileInput.value;
            if (val===""){val='.'}
            tileChars[y]=replaceAt(tileChars[y],x,val)
        } else if (mouseButton === RIGHT) {
            tiles[y][x] = 0;
        }
    }
}

function keyPressed() {
    // Clear all tiles when key 'ESCAPE' is pressed
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
