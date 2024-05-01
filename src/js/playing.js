//revert
function playingFunctionality(){
    if (player.health <= 0) {
        healthBar.img = null;
    }
    else if (player.health < 50){
        healthBar.img = oneHealth;
    }
    else if (player.health < 100) {
        healthBar.img = twoHealth;
    }
    if(inventory.hasItem(trinket)){
        RoomController.upstairsDoor.group.img = floorBoardImage;
        RoomController.middleFloorDoor.group.img = floorBoardImage;
    }
    else{
        RoomController.upstairsDoor.group.img = brickImage;
        RoomController.middleFloorDoor.group.img = brickImage;

    }
    randomBackgroundSounds();
    gunFunctionality(bullets);
    fadeInAndOut(fadeScreen);
    movementSounds(player,footsteps);
    bulletCollisions();
    playerMovement.handleInput();
    enemyHandler();
    if(player.room["x"] == 0 && player.room["y"] == 1){
			if (!chaseMusic.isPlaying()) chaseMusic.play();
    }

    if(player.room["x"] == 9 && player.room["y"] == 2){
        if(!GIANTEYESPAWNED) {
            GIANTEYESPAWNED = true;
            laserDelay();
            enemyList.forEach(enemy => {
                if(enemy.enemy_id == 1){
                    laser = setupLaser(laser, enemy.enemySprite.x, enemy.enemySprite.y);
                    laser.overlaps(enemy.enemySprite);
                    setupEyes();
            }});
        }
        if(BOSSISALIVE) giantEyeBossfight();

    }
    if(player.health <= 0) {
        GAMESTATE = pauseMenu.exitGame(GAMESTATE);
        
        alert("You died. Try again.")
        player.health = 100;
    }

    if(inventory.hasItem(flashlight)){
        darknessDraw(player.x, player.y, player.velocity.x, player.velocity.y, true);
    }
    else{
        darknessDraw(player.x, player.y, player.velocity.x, player.velocity.y, false);
    }

    if(kb.pressed('e')) {
        GAMESTATE = "INVENTORY";
    }
    if(player.overlaps(flashlight.itemSprite)){
        if (inventory.insertItem(flashlight, inventory.hasSpace(flashlight.InventoryX,flashlight.InventoryY))){
            flashlight.itemSprite.visible = false;
            flashlight.itemSprite.x = 100;
        } 
    }
    if(player.overlaps(gun.itemSprite)){
        if (inventory.insertItem(gun, inventory.hasSpace(gun.InventoryX,gun.InventoryY))){
            gun.itemSprite.visible = false;
            gun.itemSprite.x = 100;
        } 
    }
    if(player.overlaps(key.itemSprite)){
        if (inventory.insertItem(key, inventory.hasSpace(key.InventoryX,key.InventoryY))) {
            key.itemSprite.visible = false;
            key.itemSprite.x = 100;
        }
    }
    if(player.overlaps(bulletItem.itemSprite)){
        if (inventory.insertItem(bulletItem, inventory.hasSpace(bulletItem.InventoryX,bulletItem.InventoryY))) {
            bulletItem.itemSprite.visible = false;
            bulletItem.itemSprite.x = 100;
        }
    }
    if(player.overlaps(trinket.itemSprite)){
        console.log(inventory.hasSpace(trinket.InventoryX,trinket.InventoryY))
        if (inventory.insertItem(trinket, inventory.hasSpace(trinket.InventoryX,trinket.InventoryY))){
            trinket.itemSprite.visible = false;
            bulletItem.itemSprite.x = 100;
        } 
    }

    //Pause handle
    if (kb.pressed('escape')) GAMESTATE = "PAUSE";
}