const { expect } = require("chai");
const fs = require('node:fs');

function fileCheck() {
    describe("#Game JavaScript Files", function() {
        it(" is expected to have mainPlayer.js", () => {
            expect(fs.readFile('./src/js/mainplayer.js', 'utf8', (err, data) => {
                if (err) {
                    throw("mainPlayer.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have bossFight.js", () => {
            expect(fs.readFile('./src/js/bossFight.js', 'utf8', (err, data) => {
                if (err) {
                    throw("bossFight.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Camera.js", () => {
            expect(fs.readFile('./src/js/Camera.js', 'utf8', (err, data) => {
                if (err) {
                    throw("Cameras.js NOT FOUND")
                } 
            }));
        });


        it(" is expected to have CollisionTools.js", () => {
            expect(fs.readFile('./src/js/CollisionTools.js', 'utf8', (err, data) => {
                if (err) {
                    throw("CollisionTools.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have DebugMode.js", () => {
            expect(fs.readFile('./src/js/DebugMode.js', 'utf8', (err, data) => {
                if (err) {
                    throw("DebugMode.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have enemy.js", () => {
            expect(fs.readFile('./src/js/enemy.js', 'utf8', (err, data) => {
                if (err) {
                    throw("enemy.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Flashlight.js", () => {
            expect(fs.readFile('./src/js/Flashlight.js', 'utf8', (err, data) => {
                if (err) {
                    throw("Flashlight.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Furnishings.js", () => {
            expect(fs.readFile('./src/js/Furnishings.js', 'utf8', (err, data) => {
                if (err) {
                    throw("Furnishings.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have GameMap.js", () => {
            expect(fs.readFile('./src/js/GameMap.js', 'utf8', (err, data) => {
                if (err) {
                    throw("GameMap.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have inventory.js", () => {
            expect(fs.readFile('./src/js/inventory.js', 'utf8', (err, data) => {
                if (err) {
                    throw("inventory.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Layers.js", () => {
            expect(fs.readFile('./src/js/Layers.js', 'utf8', (err, data) => {
                if (err) {
                    throw("Layers.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have main.js", () => {
            expect(fs.readFile('./src/js/main.js', 'utf8', (err, data) => {
                if (err) {
                    throw("main.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have MovementController.js", () => {
            expect(fs.readFile('./src/js/MovementController.js', 'utf8', (err, data) => {
                if (err) {
                    throw("MovementController.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Rooms.js", () => {
            expect(fs.readFile('./src/js/Rooms.js', 'utf8', (err, data) => {
                if (err) {
                    throw("Rooms.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have RoomTiles.js", () => {
            expect(fs.readFile('./src/js/RoomTiles.js', 'utf8', (err, data) => {
                if (err) {
                    throw("RoomTiles.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Screens.js", () => {
            expect(fs.readFile('./src/js/Screens.js', 'utf8', (err, data) => {
                if (err) {
                    throw("Screens.js NOT FOUND")
                } 
            }));
        });

        it(" is expected to have sound.js", () => {
            expect(fs.readFile('./src/js/sound.js', 'utf8', (err, data) => {
                if (err) {
                    throw("sound.js NOT FOUND")
                } 
            }));
        });
    });
}







fileCheck();
