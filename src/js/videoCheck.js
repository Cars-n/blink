function videoCheckFunctionality(){
		BlinkViewer.showMenu();
        vThreshold = BlinkViewer.sensitivitySlider.value() / 100;

		BlinkViewer.OKButton.mousePressed(() => {
			player.visible = true;
			healthBar.visible = true;
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
			GAMESTATE = BlinkViewer.startGame(GAMESTATE);
		});
		
		if(kb.pressed('l')){
			GAMESTATE = BlinkViewer.startGame(GAMESTATE);		
		} 
}