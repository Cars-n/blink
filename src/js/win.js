function winFunctionality() {
    player.velocity.y = 0;
    player.velocity.x = 0;
    player.changeAni("idle_" + playerMovement.lastDirection);
    movementSounds(player,footsteps);

    winMenu.showMenu();

    winMenu.exitButton.mousePressed(() => {
        GAMESTATE = winMenu.exitGame(GAMESTATE);
        
    });
}