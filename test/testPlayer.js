const assert = require('assert');


function playerCreation() {
   

    describe("Player", function() {
        describe("#Constructing a new player", function() {
            it('should be of type Sprite');
            expect(testPlayer).to.be.type('Sprite');

            it('should have a colider of dynamic to interact with the world');
            expect(testPlayer.collide()).to.equal('dynamic');

            it ('should have 101 health');
            expect(testPlayer.health).to.equal(101);
        });

        describe("#Setting up bullets for gun to attack", function () {
            setUpBullets();

            it("should look like a bullet");
            expect(bullets.image).to.equal("assets/bullet.png");

            
        });

    });
}

playerCreation();