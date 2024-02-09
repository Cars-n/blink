//Class for enemeis, unused at the moment but should be used and updated in the future
class basicEnemey{
    constructor(enemy_id, health){
        this.enemy_id = enemy_id;
        this.health = health;
    }
}

//Spawns an enemy in default location, used mostly for debugging
function spawnEnemy(){
    let temp = new Sprite(400, 400, 25, 25);
    temp.diameter = 60;
    setObjectCollider(temp, spriteTypes.ENEMY, true);
    enemyList.push(temp);
}

//Similar to spawnEnemy() but this takes a pair of x,y cords and spawns it at the location
function spawnEnemyAt(x, y){
    let temp = new Sprite(x, y, 25, 25);
    setObjectCollider(temp, spriteTypes.ENEMY, true);
    enemyList.push(temp);
}

//Removes latest spawned enemy
function removeEnemy(){
    if(enemyList.length > 0){
        enemyList[enemyList.length - 1].remove() 
        enemyList.pop();
    }
}

//Spawns an enemy when k key is pressed and removes latest spawed enemy with l key
function keyPressed(){
    if(keyCode === 75){
        spawnEnemy();
    }

    if(keyCode === 76){
        removeEnemy();
    }
}

//Handles anything related to enemeis that needs to be done every frame
function enemyHandler(){
    let previousMax = enemyList.length; //Prevents inf loop if enemey is created while handler is being run
    for(let i = 0; i < previousMax; ++ i) {
        enemyList[i].moveTowards(player, .005)

        //Detects if player and enemy overlaps and changes red if ture, currently need debug mode off to see this
        if (enemyList[i].overlaps(player)) enemyList[i].color = 'red';
    }
    
}


