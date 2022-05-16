let nPixelsRow = 400
let nPixelsCol = 400
let res = 10
let nRows = nPixelsRow / res
let nCols = nPixelsCol / res
let cellGrid
let nextCellGrid
let liveCellArray = []
let nextLiveCellArray = []

function setup() {
  createCanvas(nPixelsCol, nPixelsRow)
  resetSketch()
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  updateLiveCells()
  drawLiveCells()
}

function addRandomCell(val) {
  let row = floor(random(nRows))
  let col = floor(random(nCols))
  nextLiveCellArray.push([row, col])
  nextCellGrid[row][col] = val
}

function drawCell(row, col, val) {
  let x = col * res
  let y = row * res
  noStroke()
  fill(valToColor(val))
  square(x, y, res)
}

function drawLiveCells() {
  for (let coords of liveCellArray) {
    let [row, col] = coords
    let cellVal = cellGrid[row][col]
    drawCell(row, col, cellVal)
    // let [newX, newY] = moveCell()
  }
}

function resetSketch() {
  background(0)
  cellGrid = make2DArray(nRows, nCols, fillVal = 0)
  nextCellGrid = make2DArray(nRows, nCols, fillVal = 0)
  liveCellArray = []
  nextLiveCellArray = []
  addRandomCell(1)
}

function updateLiveCells() {
  liveCellArray = nextLiveCellArray
  nextLiveCellArray = []
  cellGrid = nextCellGrid
  nextCellGrid = make2DArray(nRows, nCols, fillVal = 0)
}

function valToColor(val) {
  let colors = {
    0 : '#000000',
    1 : '#FFFFFF',
    2 : '#FF0000',
  }
  return colors[val]
}
