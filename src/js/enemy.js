//Class for data of enemies
//enemy_id: Specifies what type of enemy they are
//ai_type: Specifies what type of ai the enemy has, all will probably have a unique one
//name: Name of the enemy
//health: the max hp
//width: width of enemy
let BOSSISALIVE = true;
let CANTELEPORT = true;
class enemyData{
    constructor(enemy_id, ai_type, name, health, height, width, dia, assetPath){
        this.enemy_id = enemy_id;
        this.ai_type = ai_type;
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
        this.enemySprite = new Sprite(400, 400, staticEnemyList[enemy_id].width, staticEnemyList[enemy_id].height);
        if(staticEnemyList[enemy_id].dia != 0)this.enemySprite.diameter = staticEnemyList[enemy_id].dia;
        this.enemySprite.layer=ENEMY_LAYER;
        this.enemySprite.drag = 10;
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
}

//Animations must be loaded before start up
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
    let temp = new Enemy(num);
    temp.enemySprite.x=x;
    temp.enemySprite.y=y;
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
    for(let i = 0; i < previousMax; ++ i){
        removeEnemy();
    }
}

//Debug keys
//Spawns an enemy when k key is pressed and removes latest spawed enemy with l key
function keyPressed(){
    if(keyCode === 75){
        spawnEnemy(0);
    }

    if(keyCode === 77){
        spawnEnemy(1);
    }

    if(keyCode === 76){
        //removeEnemy();
        clearEnemyList();
    }
}

//Handles anything related to enemeis that needs to be done every frame
function enemyHandler(){
    let previousMax = enemyList.length; //Prevents inf loop if enemey is created while handler is being run
    for(let i = 0; i < previousMax; ++i) {
        if(enemyList[i].enemy_id==1){
            bullets.collides(enemyList[i].enemySprite, damageEye);
        }
        if(enemyList[i].enemy_id == 0){
            bullets.collides(enemyList[i].enemySprite, damageGhost);
        }
        if(nowBlinking == true && CANTELEPORT == true && enemyList[i].enemy_id == 0){
            CANTELEPORT = false;
            teleportCooldown();
            enemyList[i].enemySprite.visible = true;
            enemyList[i].enemySprite.collider = "static";
            enemyList[i].enemySprite.x = player.x + (50 + Math.floor(Math.random() * 100)) * (Math.random() > 0.5 ? 1 : -1);
            enemyList[i].enemySprite.y = player.y + (50 + Math.floor(Math.random() * 100)) * (Math.random() > 0.5 ? 1 : -1);
            disappear(enemyList[i].enemySprite);
        }
        
        console.log(enemyList[i].health)
        if(enemyList[i].health <= 0){
            if(enemyList[i].enemy_id == 0){
                trinket.itemSprite.x = enemyList[i].enemySprite.x;
                trinket.itemSprite.y = enemyList[i].enemySprite.y;
            } 
            if(enemyList[i].enemy_id == 1){
                BOSSISALIVE = false;
            }
            enemyList[i].enemySprite.remove();
            enemyList.splice(i, 1);
            if (enemyList.length == 0) return;
        }
        
        //Detects if player and enemy overlaps and changes red if true, currently need debug mode off to see this
        if (enemyList[i].enemySprite.overlaps(player)) player.health -= 50;
    }
    
}
//Loads at start
//Enemy data is harded coded and then pushed onto the staticEnemyList
function setupStaticEnemyList(){ //Add new enemies here

    temp = new enemyData(0, 0, "Ghost", 100, 100, 50, 0, "assets/GlowingEyesEnemy.png");
    giantEye = new enemyData(1,0, "Giant Eye", 500, 256,256, 256,"assets/GiantEye.png");
    staticEnemyList.push(temp);
    staticEnemyList.push(giantEye);



    //Throws an error is enemy id's arent sequential
    for(let i = 0; i < staticEnemyList.length; ++i){
        if(i != staticEnemyList[i].enemy_id) {
            console.log("Enemy id issue at", i);
            throw new Error("Enemy id's not sequental or number is shared when they should not");
        }
    }

    loadEnemyAnimations();
}

async function disappear(enemySprite){
    await delay(3000);
    enemySprite.visible = false;
    enemySprite.collider = "none"
}


async function teleportCooldown(){
    await delay(3000);
    CANTELEPORT = true;
}

function damageEye(bullet, enemy){
    bullet.remove();
    enemyList.forEach(enemy => {
        if(enemy.enemy_id == 1){
            enemy.health -= 50;}
     });
}

function damageGhost(bullet, enemy){
    console.log("hello");
    bullet.remove();
    enemyList.forEach(enemy => {
        if(enemy.enemy_id == 0){
            enemy.health -= 50;}
     });
}