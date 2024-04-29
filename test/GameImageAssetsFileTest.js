const { expect } = require("chai");
const fs = require('node:fs');

function fileCheck() {

    describe("#Game Asset PNG & JPG Images", function(){

        it(" is expected to have bullet.png", () => {
            expect(fs.readFile('./assets/bullet.png', 'utf8', (err, data) => {
                if (err) {
                    throw("bullet.png NOT FOUND")
                } 
            }));
        });

        it(" is expected to have cellBars.jpg", () => {
            expect(fs.readFile('./assets/cellBars.jpg', 'utf8', (err, data) => {
                if (err) {
                    throw("cellBars.jpg NOT FOUND")
                } 
            }));
        });

        it(" is expected to have Door.png", () => {
            expect(fs.readFile('./assets/Door.png', 'utf8', (err, data) => {
                if (err) {
                    throw("Door.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have FlashLight.png", () => {
            expect(fs.readFile('./assets/FlashLight.png', 'utf8', (err, data) => {
                if (err) {
                    throw("FlashLight.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have floorboards.png", () => {
            expect(fs.readFile('./assets/floorboards.png', 'utf8', (err, data) => {
                if (err) {
                    throw("floorboards.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have floortiles.png", () => {
            expect(fs.readFile('./assets/floortiles.png', 'utf8', (err, data) => {
                if (err) {
                    throw("floortiles.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have GiantEye.png", () => {
            expect(fs.readFile('./assets/GiantEye.png', 'utf8', (err, data) => {
                if (err) {
                    throw("GiantEye.png NOT FOUND")
                } 
            }));
        });

        it(" is expected to have GlowingEyesEnemy.png", () => {
            expect(fs.readFile('./assets/GlowingEyesEnemy.png', 'utf8', (err, data) => {
                if (err) {
                    throw("GlowingEyesEnemy.png NOT FOUND")
                } 
            }));
        });

        it(" is expected to have GrimReaper.png", () => {
            expect(fs.readFile('./assets/GrimReaper.png', 'utf8', (err, data) => {
                if (err) {
                    throw("GrimReaper.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have InventoryBackground.png", () => {
            expect(fs.readFile('./assets/InventoryBackground.png', 'utf8', (err, data) => {
                if (err) {
                    throw("InventoryBackground.png NOT FOUND")
                } 
            }));
        });

        it(" is expected to have key.png", () => {
            expect(fs.readFile('./assets/key.png', 'utf8', (err, data) => {
                if (err) {
                    throw("key.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have Main-Menu-Background2.png", () => {
            expect(fs.readFile('./assets/Main-Menu-Background2.png', 'utf8', (err, data) => {
                if (err) {
                    throw("Main-Menu-Background2.png NOT FOUND")
                } 
            }));
        });
        

        it(" is expected to have Menu_Screen_for_a_pixelated_Horror_game_named_Blink_Set_in_a_Haunted_Mansion.png", () => {
            expect(fs.readFile('./assets/Menu_Screen_for_a_pixelated_Horror_game_named_Blink_Set_in_a_Haunted_Mansion.png', 'utf8', (err, data) => {
                if (err) {
                    throw("Menu_Screen_for_a_pixelated_Horror_game_named_Blink_Set_in_a_Haunted_Mansion.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have player.png", () => {
            expect(fs.readFile('./assets/player.png', 'utf8', (err, data) => {
                if (err) {
                    throw("player.png NOT FOUND")
                } 
            }));
        });

        it(" is expected to have sand-brick-tileset-texture.png", () => {
            expect(fs.readFile('./assets/sand-brick-tileset-texture.png', 'utf8', (err, data) => {
                if (err) {
                    throw("sand-brick-tileset-texture.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have shotgun.png", () =>{
            expect(fs.readFile('./assets/shotgun.png', 'utf8', (err, data) => {
                if (err) {
                    throw("shotgun.png NOT FOUND")
                } 
            }));
        });

        it(" is expected to have StartScreen.png", () => {
            expect(fs.readFile('./assets/StartScreen.png', 'utf8', (err, data) => {
                if (err) {
                    throw("StartScreen.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have trapdoor.png", () => {
            expect(fs.readFile('./assets/trapdoor.png', 'utf8', (err, data) => {
                if (err) {
                    throw("trapdoor.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have WallRoughDraft.png", () => {
            expect(fs.readFile('./assets/WallRoughDraft.png', 'utf8', (err, data) => {
                if (err) {
                    throw("WallRoughDraft.png NOT FOUND")
                } 
            }));
        });


        it(" is expected to have wallWithHeight.png", () => {
            expect(fs.readFile('./assets/wallWithHeight.png', 'utf8', (err, data) => {
                if (err) {
                    throw("wallWithHeight.png NOT FOUND")
                } 
            }));
        });
    });
};

fileCheck();