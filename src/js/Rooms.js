
let brickImage,floorBoardImage;
let floor;
function preload(){
	brickImage = loadImage('./assets/sand-brick-tileset-texture.png');
	floorBoardImage=loadImage("assets/floorboards.png");
}


//Creates a basic room that has colliders and an exit
function createRoom(){
	

    // other=new Group();
	// other.w = 120;
	// other.h = 120;
	// other.tile='o'
	// other.color="blue"
	// other.border='none'
	// other.collider='none'
    bricks = new Group();
	bricks.collider="static";
	bricks.w = 120;
	bricks.h = 120;
	bricks.tile = '=';
	brickImage.resize(bricks.w,bricks.h);
    bricks.img=brickImage;
	floor=new ImageTile(floorBoardImage,'o',120,120,'none');

	tilesGroup = new Tiles(
		[
			'='.repeat(10),
			'='+'o'.repeat(8)+'=',
			'='+'o'.repeat(8)+'=',
			'='+'o'.repeat(8)+'=',
			'='+'o'.repeat(8)+'=',
			'='+'o'.repeat(8)+'.',
			'='+'o'.repeat(8)+'.',
			'='+'o'.repeat(8)+'.',
			'='+'o'.repeat(8)+'=',
			'='.repeat(10)
		],
		bricks.w/2,
		bricks.h/2,
		bricks.w ,
		bricks.h
	);
}
