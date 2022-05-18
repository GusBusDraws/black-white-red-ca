let nPixelsRow = 200
let nPixelsCol = 200
let res = 10
let fps = 2
let nRows = nPixelsRow / res
let nCols = nPixelsCol / res
let cellGrid
let nextCellGrid
// Organism variables
let organisms = []
// Save frames
let saveFrames = false
let nSaveFrames = 20

function setup() {
  createCanvas(nPixelsCol, nPixelsRow)
  frameRate(fps)
  resetSketch()
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  if (saveFrames) saveFrame()
  // Move next grid & cells to current grid & cells
  background(colorFromVal(0))
  for (let o of organisms) {
    o.updateLiveCells()
    o.drawCells()
  }
  // Allow organisms to move and grow
  for (let o of organisms) {
    o.chooseAction()
    o.performAction()
  }
}

function resetSketch() {
  background(colorFromVal(0))
  cellGrid = make2DArray(nRows, nCols, fillVal = 0)
  nextCellGrid = make2DArray(nRows, nCols, fillVal = 0)
  organisms.push(
    new Organism(floor(random(nRows)), floor(random(nCols)), 1)
  )
}

function colorFromVal(val) {
  let colors = {
    0 : '#000000',
    1 : '#FFFFFF',
    2 : '#FF0000',
  }
  return colors[val]
}
