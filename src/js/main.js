function createMenuScreen() {
  var object = new Sprite(1920/2, 1080/2, 1920,1080);
  object.image = mainMenuImage;
  object.layer = 3;
  object.collider = 'none';
  return object;
}