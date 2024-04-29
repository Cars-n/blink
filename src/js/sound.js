//revert
function movementSounds(sprite, sound) {
    if (sprite.velocity.x != 0 || sprite.velocity.y != 0) {
        if (!sound.isPlaying()) {
            sound.play();
        }
    } else {
        sound.pause();
    }
}


function randomBackgroundSounds(){
    i = Math.floor(Math.random() * 5000);
    if(i == 20) CreepyPiano1.play();
    if(i == 21) CreepyPiano2.play();

}
