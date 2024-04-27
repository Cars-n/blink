const { expect } = require("chai");
const fs = require('node:fs');

function fileCheck() {

    describe("#Game CSS Styling Files", function(){
        it(" is expected to have MainMenu.css", () => {
            expect(fs.readFile('./src/css/MainMenu.css', 'utf8', (err, data) => {
                if (err) {
                    throw("MainMenu.css NOT FOUND")
                } 
            }));
        });
        
        it(" is expected to have PauseMenu.css", () => {
            expect(fs.readFile('./src/css/PauseMenu.css', 'utf8', (err, data) => {
                if (err) {
                    throw("PauseMenu.css NOT FOUND")
                } 
            })); 
        });
        
        
        it(" is expected to have styles.css", () => {
            expect(fs.readFile('./src/css/styles.css', 'utf8', (err, data) => {
                if (err) {
                    throw("styles.css NOT FOUND")
                } 
            }));
        });


       

        
    });
};

fileCheck();