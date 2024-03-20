//Parent AI class, doesn't do much except prevents repetative code and some class methods, more can be added if wanted
class AI{
    constructor(){
        this.currentState = "spawn";
        this.ai_id = -1;
    }

    //Method if state needs to be changed outside of AI routine
    changeState(newState){
        this.currentState = newState;
    }    
}

//Runs the ai method
function runAI(targetAI, enemyObject){
    targetAI.aiMethod(enemyObject, targetAI);
}



//Functions to prevent repetative code, or any other use, can be added here

//Stops enemy sprite velocity
function stopSprite(target){
    target.enemySprite.velocity.x = 0;
    target.enemySprite.velocity.y = 0;
}


//General Template of how to create an AI for an enemy
class aiTemplate extends AI{
    constructor(){
        super();
        //this.currentState = "x"; Changes starting state, otherwise it will be "spawn"
        this.aiMethod = Object.assign(this.templateAIMethod); //Creates a shallow copy of the ai method
        this.ai_id = -1; //Set the id in the order the ai is loaded in, as this is not meant to be used it's -1
    }

    //Method for the AI, delcared async which used when with await it allows an action to finish before their state is changed
    //The p5play doccumentation provides a bit better insight into this.
   async templateAIMethod(targetEnemy, targetAI){
        let distance = targetEnemy.getDistFromPlayer(); //Calculates distance between called upon enemy and the player sprite

        //The AI routine can be implemented any way desired
        //However switch cases are the only one tested so far and seems to be the best method
        switch(targetAI.currentState){
            case "idle":
                //Some code...
                break;

            case "spawn":
                //Some code...
                break;
            
            case "chase":
                //Some code...
                break;
        }

   }

}

//Simple example of an AI routine
class testEnemyAI extends AI{
    constructor(){
        super();
        this.aiMethod = this.testAIOneType;
        this.ai_id = 0;
    }

    async testAIOneType(targetEnemy, targetAI){
        let distance = targetEnemy.getDistFromPlayer();

        switch(targetAI.currentState){
            case "spawn" :
                targetAI.currentState = "idle";
                break;

            case "idle" :
                if(distance > 100){
                    stopSprite(targetEnemy);
                } else {
                    //targetAI.currentState = "chase";
                    targetAI.changeState("chase");
                }
                break;

            case "chase" :
                if(distance > 100){
                    //targetAI.currentState = 'idle';
                    targetAI.changeState("idle");
                } else {
                    targetEnemy.enemySprite.moveTowards(player, .020);
                }
                break;

                //Example of using await, will chase the player regardless of distance untill delay is over
            case "asynctest":
                targetEnemy.enemySprite.moveTowards(player, .020);
                await delay(1000);
                targetAI.currentState = "idle";
                break;
        }
    }
}

//Another simple example, works the same but the enemy is a bit faster
class testEnemyTwoAI extends AI{
    constructor(){  
        super();
        this.aiMethod = this.testAITwoType;
        this.ai_id = 1;
    }


    async testAITwoType(targetEnemy, aiRoutine){
        let distance = targetEnemy.getDistFromPlayer();

        switch(aiRoutine.currentState){
            case "spawn" :
                aiRoutine.currentState = "idle";
                break;

            case "idle" :
                if(distance > 100){
                    stopSprite(targetEnemy);
                } else {
                    aiRoutine.currentState = "chase";
                }
                break;

            case "chase" :
                if(distance > 100){
                    aiRoutine.currentState = 'idle'
                } else {
                    targetEnemy.enemySprite.moveTowards(player, .035);
                }
                break;
            }
        }
}