function movementSounds(sprite, sound) {
    if (sprite.velocity.x != 0 || sprite.velocity.y != 0) {
        if (!sound.isPlaying()) {
            sound.play();
        }
    } else {
        sound.pause();
    }
}
