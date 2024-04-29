//revert
function menuFunctionality(){
    if(!mainMenuSound.isPlaying()) mainMenuSound.play();

		player.velocity.y = 0;
		player.velocity.x = 0;
		player.visible = false;
		healthBar.visible = false;
		player.changeAni("idle_" + playerMovement.lastDirection);
		movementSounds(player,footsteps);

		mainMenu.showMenu();

		mainMenu.startButton.mousePressed(() => {
			mainMenuSound.pause();
			GAMESTATE = mainMenu.startBlinkView(GAMESTATE);
		});

		mainMenu.exitButton.mousePressed(() => {		
			/* TODO - LEFT OPEN FOR THE MAIN MENU METHODS TO DISPLAY */
			alert("What, got too scared and quit?");
		});
		
		if(kb.pressed('l')){
			
			GAMESTATE = mainMenu.startBlinkView(GAMESTATE);		
		} 
}