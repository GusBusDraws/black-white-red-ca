let nPixelsRow = 600
let nPixelsCol = 600
let res = 10
let fps = 2
let nRows = nPixelsRow / res
let nCols = nPixelsCol / res
let cellGrid
let nextCellGrid
let liveCellArray = []
let nextLiveCellArray = []

function setup() {
  createCanvas(nPixelsCol, nPixelsRow)
  frameRate(fps)
  resetSketch()
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  // Move next grid & cells to current grid & cells
  updateLiveCells()
  background(colorFromVal(0))
  for (let coords of liveCellArray) {
    let [row, col] = coords
    let cellVal = cellGrid[row][col]
    // Draw cell as it is on cellGrid
    drawCell(row, col, cellVal)
    // Move cell on nextCellGrid
    moveCell(row, col, cellVal)
  }
}

function resetSketch() {
  background(colorFromVal(0))
  cellGrid = make2DArray(nRows, nCols, fillVal = 0)
  nextCellGrid = make2DArray(nRows, nCols, fillVal = 0)
  liveCellArray = []
  nextLiveCellArray = []
  addRandomCell(1)
}

function updateLiveCells() {
  // Copy the array by creating new array that slices each item of the old array
  liveCellArray = nextLiveCellArray.slice(0)
  nextLiveCellArray = []
  // Copy the 2D array by slicing each item from each inner array
  cellGrid = nextCellGrid.map(inner => inner.slice(0))
  nextCellGrid = make2DArray(nRows, nCols, fillVal = 0)
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
  fill(colorFromVal(val))
  square(x, y, res)
}

function colorFromVal(val) {
  let colors = {
    0 : '#000000',
    1 : '#FFFFFF',
    2 : '#FF0000',
  }
  return colors[val]
}
function moveCell(row, col, val) {
  rowDir = floor(random(-1, 2))
  colDir = floor(random(-1, 2))
  let newRow = row + rowDir
  let newCol = col + colDir
  // If cell is in bounds, move & track. Else, die & forget.
  if (newRow < nRows && newRow > 0 && newCol < nCols && newCol > 0) {
    nextLiveCellArray.push([newRow, newCol])
    nextCellGrid[newRow][newCol] = val
  }
}
