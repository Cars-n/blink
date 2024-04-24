function menuFunctionality(){
    if(!mainMenuSound.isPlaying()) mainMenuSound.play();

		player.velocity.y = 0;
		player.velocity.x = 0;
		player.changeAni("idle_" + playerMovement.lastDirection);
		movementSounds(player,footsteps);

		mainMenu.showMenu();

		mainMenu.startButton.mousePressed(() => {
			moveCamera("right",SPAWNX);
			moveCamera("down",SPAWNY);
			var coords=gameMap.getRoomWorldCoords(SPAWNX,SPAWNY);
			player.x=coords.x+600;
			player.y=coords.y+600;
			player.room["x"]=SPAWNX;
			player.room["y"]=SPAWNY;
			fadeScreen.x = player.x;
			fadeScreen.y = player.y;
			gameMap.loadRoom(SPAWNX,SPAWNY);
			mainMenuSound.pause();
			GAMESTATE = mainMenu.startGame(GAMESTATE);
		});

		mainMenu.exitButton.mousePressed(() => {		
			/* TODO - LEFT OPEN FOR THE MAIN MENU METHODS TO DISPLAY */
			alert("What, got too scared and quit?");
		});
		
		if(kb.pressed('l')){
			GAMESTATE = mainMenu.startGame(GAMESTATE);		
		} 
}