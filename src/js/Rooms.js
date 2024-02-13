
let brickImage;
function preload(){
	 brickImage = loadImage('./assets/sand-brick-tileset-texture.png');
}

//Creates a basic room that has colliders and an exit
function createRoom(){
    
    bricks = new Group();
	bricks.collider="static";
	bricks.w = 120;
	bricks.h = 120;
	bricks.tile = '=';
	brickImage.resize(bricks.w,bricks.h);
    bricks.img=brickImage;

	tilesGroup = new Tiles(
		[
			'='.repeat(10),
			'='+'.'.repeat(8)+'=',
			'='+'.'.repeat(8)+'=',
			'='+'.'.repeat(8)+'=',
			'='+'.'.repeat(8)+'=',
			'='+'.'.repeat(8)+'.',
			'='+'.'.repeat(8)+'.',
			'='+'.'.repeat(8)+'.',
			'='+'.'.repeat(8)+'=',
			'='.repeat(10)
		],
		bricks.w/2,
		bricks.h/2,
		bricks.w ,
		bricks.h
	);
}
