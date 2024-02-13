
let brickImage, floorBoardImage,doorImage;
let roomControl;
let tilesGroup;

function preload() {
	brickImage = loadImage('./assets/sand-brick-tileset-texture.png');
	floorBoardImage = loadImage("assets/floorboards.png");
	doorImage=loadImage("assets/Door.png");

}
class RoomController {
	static TILE_HEIGHT=120;
	static TILE_WIDTH=120;
	static firstLoad=true;
	static wallTile;
	static floor;
	static door;
		constructor() {
			if(RoomController.firstLoad==true){
				RoomController.firstLoad==false;
				RoomController.wallTile=new ImageTile(brickImage,'=',RoomController.TILE_WIDTH,RoomController.TILE_HEIGHT,'static');
				RoomController.floor=new ImageTile(floorBoardImage, 'o', RoomController.TILE_WIDTH,RoomController.TILE_HEIGHT, 'none');
				RoomController.door=new ImageTile(doorImage, 'D',RoomController.TILE_WIDTH,RoomController.TILE_HEIGHT, 'static');//Make this an event tile
			}	
		
		this.map = [];


	}
	// createImageTile(){
	// 	return new ImageTile
	// }
	renderMap() {
		const OFFSET_WIDTH=RoomController.TILE_WIDTH/2
		const OFFSET_HEIGHT=RoomController.TILE_HEIGHT/2
		const ROOM_WIDTH=RoomController.TILE_WIDTH*10
		this.renderRoom1(OFFSET_WIDTH,OFFSET_HEIGHT);
		this.renderHallway(OFFSET_WIDTH+ROOM_WIDTH,OFFSET_HEIGHT)
		this.renderRoom2(OFFSET_WIDTH+(ROOM_WIDTH*2),OFFSET_HEIGHT)
		
	}
	renderHallway(x, y) {
		// this.tileResources.push(floor);

		var room = new Tiles(
			[
				'.'.repeat(10),
				'.'.repeat(10),
				'.'.repeat(10),
				'='.repeat(10),
				'o'.repeat(10),
				'o'.repeat(10),
				'='.repeat(10),
				'.'.repeat(10),
				'.'.repeat(10),
				'.'.repeat(10),
			],
			x,y,
			RoomController.TILE_WIDTH,
			RoomController.TILE_HEIGHT
		);
	}
	renderRoom1(x, y) {
		// this.tileResources.push(floor);

		var room = new Tiles(
			[
				'='.repeat(10),
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(9),
				'=' + 'o'.repeat(9),
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'='.repeat(10)
			],
			x,y,
			RoomController.TILE_WIDTH,
			RoomController.TILE_HEIGHT
		);
	}
	renderRoom2(x, y) {
		var room = new Tiles(
			[
				'=DD=======',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'o'.repeat(9)+'=',
				'o'.repeat(9)+'=',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'=' + 'o'.repeat(8) + '=',
				'='.repeat(10)
			],
			x,y,
			RoomController.TILE_WIDTH,
			RoomController.TILE_HEIGHT
		);
	}
};
//Creates a basic room that has colliders and an exit
// function createRoom() {


// 	// other=new Group();
// 	// other.w = 120;
// 	// other.h = 120;
// 	// other.tile='o'
// 	// other.color="blue"
// 	// other.border='none'
// 	// other.collider='none'
// 	bricks = new Group();
// 	bricks.collider = "static";
// 	bricks.w = 120;
// 	bricks.h = 120;
// 	bricks.tile = '=';
// 	brickImage.resize(bricks.w, bricks.h);
// 	bricks.img = brickImage;
// 	floor = new ImageTile(floorBoardImage, 'o', 120, 120, 'none');

// 	tilesGroup = new Tiles(
// 		[
// 			'='.repeat(10),
// 			'=' + 'o'.repeat(8) + '=',
// 			'=' + 'o'.repeat(8) + '=',
// 			'=' + 'o'.repeat(8) + '=',
// 			'=' + 'o'.repeat(8) + '=',
// 			'=' + 'o'.repeat(8) + '.',
// 			'=' + 'o'.repeat(8) + '.',
// 			'=' + 'o'.repeat(8) + '.',
// 			'=' + 'o'.repeat(8) + '=',
// 			'='.repeat(10)
// 		],
// 		bricks.w / 2,
// 		bricks.h / 2,
// 		bricks.w,
// 		bricks.h
// 	);
// }
