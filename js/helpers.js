function keyPressed() {
    // Set spacebar to toggle play/pause of drawing loop
    if (key === ' ') {
      if (isLooping()) {
        noLoop();
        console.log('STOPPED. Press SPACE to resume.')
      } else {
        loop();
        console.log('RESUMED. Press SPACE to stop.')
      }
    }
    if (key === 'r') {
      resetSketch();
    }
  }

function saveFrame() {
  if (frameCount - 1 < nSaveFrames) {
    saveCanvas(`frame_${('000' + frameCount).slice(-3)}`);
  }
}

function make2DArray(nRows, nCols, fillVal = undefined) {
  let arr = new Array(nRows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(nCols).fill(fill);
  }
  return arr;
}
  