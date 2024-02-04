import { Player } from './src/js/mainPlayer.js';

let ball;
let player;

function setup() {
	new Canvas(500, 500);

	//Testing player
	player = new Player();

	ball = new Sprite();
	ball.diameter = 50;
}

function draw() {
	background('gray');
}
