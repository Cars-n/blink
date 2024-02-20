function movementSounds(sprite,sound){
    if(sprite.velocity.x!=0||sprite.velocity.y!=0){
        console.log("starting sound");
        if(!sound.isPlaying()){
            sound.play();
        }
    }
    else{
        console.log("stopping sound");
       sound.pause();
    }
}