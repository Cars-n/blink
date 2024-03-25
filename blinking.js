let nowBlinking = false;
const detectionOptions = {
  withLandmarks: true,
  withDescriptors: true,
};
// Initialize the magicFeature
let irisC = [];

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
  faceapi.detect(calculateBlink)
}
  // Make some sparkles
    
    const calculateBlink = (err, results) => {
        if (err) {
            console.log(err);
            return;
          }

          var canvas_face = document.createElement("canvas");
          canvas_face.width = video.width;
          canvas_face.height = video.height;
          var ctx_face = canvas_face.getContext('2d');

        if (results[0]== undefined) return;
    var landmarkPositions = results[0].landmarks.positions;

    var frame = ctx_face.getImageData(0, 0, video.width, video.height);
    var x_ = landmarkPositions[44 - 1].x;
    console.log(x_);
    var y_ = landmarkPositions[44 - 1].y;
    console.log(y_);
    var w_ = landmarkPositions[45 - 1].x - landmarkPositions[44 - 1].x;
    var h_ = landmarkPositions[48 - 1].y - landmarkPositions[44 - 1].y;
    var p_ = Math.floor(x_ + w_ / 2) + Math.floor(y_ + h_ / 2) * video.width;
    var v_ = Math.floor(
      (frame.data[p_ * 4 + 0] +
        frame.data[p_ * 4 + 1] +
        frame.data[p_ * 4 + 2]) /
        3
    );

    irisC.push(v_);
    if (irisC.length > 100) {
      irisC.shift();
    } //

    let meanIrisC = irisC.reduce(function (sum, element) {
      return sum + element;
    }, 0);
    meanIrisC = meanIrisC / irisC.length;
    let vThreshold = 1.3;

    let currentIrisC = irisC[irisC.length - 1];
    if (irisC.length == 100) {
      if (nowBlinking == false) {
        if (currentIrisC >= meanIrisC * vThreshold) {
          nowBlinking = true;
        } //
      } //
      else {
        if (currentIrisC < meanIrisC * vThreshold) {
          nowBlinking = false;
          blinkCount += 1;
          mBlinkSound.pause();
          mBlinkSound.currentTime = 0;
          // mBlinkSound.play();
        } //
      } //
    } //
    };

