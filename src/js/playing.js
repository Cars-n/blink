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
    else if (player.health > 10000) {
        healthBar.img = "../../assets/greg.png"
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
        textBox("You died. Try again.")
        player.health = 100;
        window.location.reload();
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
            textBox("Press the spacebar to shoot if you have a bullet in your inventory");
            gun.itemSprite.visible = false;
            gun.itemSprite.x = 100;
        } 
    }
    if(player.overlaps(key.itemSprite)){
        if (inventory.insertItem(key, inventory.hasSpace(key.InventoryX,key.InventoryY))) {
            textBox("this looks like it could fit into a trapdoor.")
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
        if (inventory.insertItem(trinket, inventory.hasSpace(trinket.InventoryX,trinket.InventoryY))){
            textBox("You feel your perception shift as you pick up the trinket. You can now see hidden doors.")
            trinket.itemSprite.visible = false;
            bulletItem.itemSprite.x = 100;
        } 
    }

    //Pause handle
    if (kb.pressed('escape')) GAMESTATE = "PAUSE";
}