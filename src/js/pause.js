//revert
function pauseFunctionality() {
    player.velocity.y = 0;
    player.velocity.x = 0;
    player.changeAni("idle_" + playerMovement.lastDirection);
    movementSounds(player,footsteps);

    pauseMenu.showMenu();

    pauseMenu.resumeButton.mousePressed(() => {
        GAMESTATE = pauseMenu.resumeGame(GAMESTATE);
        
    });


    pauseMenu.exitButton.mousePressed(() => {
        
        /* TODO - LEFT OPEN FOR THE MAIN MENU METHODS TO DISPLAY */
        textBox("What, got to scared and quit?");
        GAMESTATE = pauseMenu.exitGame(GAMESTATE);
    });
    

    pauseMenu.settingsButton.mousePressed(() => {
        textBox("The settings screen is under progress and will be done soon! :)");
        //GAMESTATE = pauseMenu.settingsToggle(settingsMenu, GAMESTATE);

    });
    

    if(kb.pressed('escape')){
        GAMESTATE = pauseMenu.resumeGame(GAMESTATE);
        
    } 
}