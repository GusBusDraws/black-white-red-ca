let nPixelsRow = 600
let nPixelsCol = 600
let res = 10
let fps = 2
let nRows = nPixelsRow / res
let nCols = nPixelsCol / res
let cellGrid
let nextCellGrid
// Organism variables
let organisms = []

function setup() {
  createCanvas(nPixelsCol, nPixelsRow)
  frameRate(fps)
  resetSketch()
  console.log('Press SPACE to stop looping or r to reset.')
}

function draw() {
  // Move next grid & cells to current grid & cells
  background(colorFromVal(0))
  for (let o of organisms) {
    o.updateLiveCells()
    for (let coords of o.liveCellArray) {
      let [row, col] = coords
      let cellVal = cellGrid[row][col]
      // Draw cell as it is on cellGrid
      drawCell(row, col, cellVal)
    }
  }
  // Allow organisms to move and grow
  for (let o of organisms) {
    for (let coords of o.liveCellArray) {
      let [row, col] = coords
      let cellVal = cellGrid[row][col]
      // Move cell on nextCellGrid
      o.moveCell(row, col)
    }
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
