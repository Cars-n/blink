const { expect } = require("chai");
const fs = require('node:fs');

function fileCheck() {

    describe("#Game Dependency JavaScript Files", function(){
        it(" is expected to have p5.sound.js", () => {
            expect(fs.readFile('./src/js/p5.sound.js', 'utf8', (err, data) => {
                if (err) {
                    throw("p5.sound.js NOT FOUND")
                } 
            }));
        });


        it(" is expected to have p5play.js", () => {
            expect(fs.readFile('./p5play/p5play.js', 'utf8', (err, data) => {
                if (err) {
                    throw("p5play.js NOT FOUND")
                } 
            })); 
        });


        it(" is expected to have planck.min.js", () => {
            expect(fs.readFile('./p5play/planck.min.js', 'utf8', (err, data) => {
                if (err) {
                    throw("planck.min.js NOT FOUND")
                } 
            }));
        });

        
    });
};

fileCheck();