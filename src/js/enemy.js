//Class for data of enemies
//enemy_id: Specifies what type of enemy they are
//ai_type: Specifies what type of ai the enemy has, all will probably have a unique one
//name: Name of the enemy
//health: the max hp
//width: width of enemy
class enemyData{
    constructor(enemy_id, ai_type, name, health, height, width, dia){
        this.enemy_id = enemy_id;
        this.ai_type = ai_type;
        this.name = name;
        this.health = health;
        this.height = height;
        this.width = width;
        this.dia = dia;
    }
}

//Class used for data of currently spawned eneimes
//enemy_id: Identifier of the enemy
//ai_type: Specifies what type of ai the enemy has
//name: Name of the enemy
//health: Current hp of the enemy
//width: width of the enemy
//hight: hight of the enemy
//locX: X Spawn cordinate of the enemy
//locY: Y Spawn coridnate of the enemy
class Enemy{
    constructor(enemy_id){
        this.enemy_id = enemy_id;
        this.name = staticEnemyList[enemy_id].name;
        this.health = staticEnemyList[enemy_id].health;
        this.enemySprite = new Sprite(400, 400, 25, 25);
        this.enemySprite.diameter = staticEnemyList[enemy_id].dia;
        this.enemySprite.layer=ENEMY_LAYER;
        setObjectCollider(this.enemySprite, spriteTypes.ENEMY, true);
    }
}

//Spawns an enemy in default location, used mostly for debugging
function spawnEnemy(num){
    let temp = new Enemy(num);
    enemyList.push(temp);
}

//Similar to spawnEnemy() but this takes a pair of x,y cords and spawns it at the location
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

//Spawns an enemy when k key is pressed and removes latest spawed enemy with l key
function keyPressed(){
    if(keyCode === 75){
        spawnEnemy(0);
    }

    if(keyCode === 77){
        spawnEnemy(1);
    }

    if(keyCode === 76){
        removeEnemy();
    }
}

//Handles anything related to enemeis that needs to be done every frame
function enemyHandler(){
    let previousMax = enemyList.length; //Prevents inf loop if enemey is created while handler is being run
    for(let i = 0; i < previousMax; ++ i) {
        enemyList[i].enemySprite.moveTowards(player, .005)

        //Detects if player and enemy overlaps and changes red if ture, currently need debug mode off to see this
        if (enemyList[i].enemySprite.overlaps(player)) enemyList[i].enemySprite.color = 'red';
    }
    
}

//Loads at start
//Enemy data is harded coded and then pushed onto the staticEnemyList
function setupStaticEnemyList(){ //Add new enemies here

    temp = new enemyData(0, 0, "test", 5, 0, 0, 10);
    staticEnemyList.push(temp);

    temp = new enemyData(1, 0, "test2", 5, 0, 0, 20);
    staticEnemyList.push(temp);



    for(let i = 0; i < staticEnemyList.length; ++i){
        if(i != staticEnemyList[i].enemy_id) {
            console.log("Enemy id issue at", i);
            throw new Error("Enemy id's not sequental or number is shared when they should not");
        }
    }
}


