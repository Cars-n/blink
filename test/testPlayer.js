var playerTest = setupPlayer();

function playerCreation() {
    describe("Player", function() {
        describe("#Constructing a new player", function() {
            it('should be of type Sprite');
            expect(playerTest).to.be.a('Sprite');
        });

    });
}

playerCreation();