//Class for data of enemies
//enemy_id: Specifies what type of enemy they are
//ai_type: Specifies what type of ai the enemy has, all will probably have a unique one
//name: Name of the enemy
//health: the max hp
//width: width of enemy
//dia: diameter of sprite
//assetPath: file path for the animations of the enemy
class enemyData{
    constructor(enemy_id, ai_id, name, health, height, width, dia, assetPath){
        this.enemy_id = enemy_id;
        this.ai_id = ai_id;
        this.name = name;
        this.health = health;
        this.height = height;
        this.width = width;
        this.dia = dia;
        this.assetPath = assetPath || false;
        this.animation = null;
    }
}

//Class used for data of currently spawned eneimes
//enemy_id: Identifier of the enemy
//ai_id: Specifies the id of type of ai
//ai_type: Houses the AI object
//name: Name of the enemy
//health: Current hp of the enemy
//width: width of the enemy
//hight: hight of the enemy
class Enemy{
    constructor(enemy_id, locX = 400, locY = 400){
        this.enemy_id = enemy_id;
        this.ai_id = staticEnemyList[enemy_id].ai_id;
        this.name = staticEnemyList[enemy_id].name;
        this.health = staticEnemyList[enemy_id].health;
        this.enemySprite = new Sprite(locX, locY, staticEnemyList[enemy_id].height, staticEnemyList[enemy_id].width);
        this.enemySprite.diameter = staticEnemyList[enemy_id].dia;
        this.enemySprite.layer = 2;
        this.ai_type = assignAI(this.ai_id);

        setObjectCollider(this.enemySprite, spriteTypes.ENEMY, true);

        if(staticEnemyList[enemy_id].assetPath){
            this.enemySprite.addAni('default', staticEnemyList[enemy_id].animation)
        }
    }

    recieveDamage(dmgTaken){
        this.health -= dmgTaken;

        if(this.health < 0){

        }
    }

    getDistFromPlayer(){
        let distance = dist(this.enemySprite.x, this.enemySprite.y, player.x, player.y);
        return distance;
    }
}

//Animations must be loaded before start up
//Asset path can also be ignored and the animations can be hardcoded to load
function loadEnemyAnimations(){
    for(let i = 0; i < staticEnemyList.length; ++i){
        if(staticEnemyList[i].assetPath)
            staticEnemyList[i].animation = loadAnimation(staticEnemyList[i].assetPath);
    }

}

//Spawns an enemy in default location, used mostly for debugging
function spawnEnemy(num){
    let temp = new Enemy(num);
    enemyList.push(temp);
}

//Similar to spawnEnemy() but this takes a pair of x,y cords and spawns it at that location
function spawnEnemyAt(num, x, y){
    let temp = new Enemy(num, x, y);
    enemyList.push(temp);
}

//Removes latest spawned enemy
function removeEnemy(){
    if(enemyList.length > 0){
        enemyList[enemyList.length - 1].enemySprite.remove() 
        enemyList.pop();
    }
}

//Clears the enemy list, getting rid of any alive enemy
function clearEnemyList(){
    let previousMax = enemyList.length;
    for(let i = 0; i < previousMax; ++i){
        removeEnemy();
    }
}

//Debug keys
//Spawns an enemy when k key is pressed
function keyPressed(){
    if(keyCode === 75){
        spawnEnemy(0);
    }

//Spanws a different enemy if m key is pressed
    if(keyCode === 77){
        spawnEnemy(1);
    }

//Can either remove latest enemy or clear all enemeis when l is pressed
    if(keyCode === 76){
        //removeEnemy(); 
        clearEnemyList();
    }
}

//Handles anything related to enemeis that needs to be done every frame
function enemyHandler(){
    let previousMax = enemyList.length; //Prevents inf loop if enemey is created while handler is being run
    for(let i = 0; i < previousMax; ++ i) {
        runAI(enemyList[i].ai_type, enemyList[i]);
        
        
        //Detects if player and enemy overlaps and changes red if ture, currently need debug mode off to see this
        if (enemyList[i].enemySprite.overlaps(player)) enemyList[i].enemySprite.color = 'red';
    }
    
}

//Loads at start up
//Enemy data is harded coded and then pushed onto the staticEnemyList
//AI objects are added here so they can be coppied when an enemy spawns
function setupStaticEnemyList(){
    //Add new enemies here
    temp = new enemyData(0, 0, "test", 5, 25, 25, 10, "assets/GrimReaper.png");
    staticEnemyList.push(temp);

    temp = new enemyData(1, 1, "test2", 5, 25, 25, 20 , "assets/GlowingEyesEnemy.png");
    staticEnemyList.push(temp);

    //Throws an error if enemy id's are not sequential or out of order
    for(let i = 0; i < staticEnemyList.length; ++i){
        if(i != staticEnemyList[i].enemy_id) {
            console.log("Enemy id issue at", i);
            throw new Error("Enemy id's not sequental or number is shared when they should not");
        }
    }
 
    loadEnemyAnimations();
}

//Bad practice but trying to do it in a automated way caused enemeis of the same type to share one state
//Add new ai routines as enemeis get added based on their ai_id
function assignAI(ai_id) {
    switch(ai_id){
    case 0:
        return new testEnemyAI();
    case 1:
        return new testEnemyTwoAI();
    }

}


