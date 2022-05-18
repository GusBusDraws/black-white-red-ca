class Organism {
	constructor(row, col, val) {
		this.liveCellArray = []
		this.nextLiveCellArray = [[row, col]]
		this.val = val
		nextCellGrid[row][col] = this.val 
		this.action = null
	}
	updateLiveCells() {
		// Copy the array by creating new array that slices each item of the old array
		this.liveCellArray = this.nextLiveCellArray.slice(0)
		this.nextLiveCellArray = []
		// Copy the 2D array by slicing each item from each inner array
		cellGrid = nextCellGrid.map(inner => inner.slice(0))
		nextCellGrid = make2DArray(nRows, nCols, fillVal = 0)
	}
	performAction() {
    if (this.action == 'moving') {
      for (let coords of this.liveCellArray) {
        let [row, col] = coords
        // Move cell on nextCellGrid
        this.moveCell(row, col)
      }
    } else {
      // Copy next grid/cells to stay the same
      this.nextLiveCellArray = this.liveCellArray.slice(0)
      nextCellGrid = cellGrid.map(inner => inner.slice(0))
    }
	}
	moveCell(row, col) {
		let rowDir = floor(random(-1, 2))
		let colDir = floor(random(-1, 2))
		let newRow = row + rowDir
		let newCol = col + colDir
		// If cell is in bounds, move & track. Else, die & forget.
		if (newRow < nRows && newRow >= 0 && newCol < nCols && newCol >= 0) {
				this.nextLiveCellArray.push([newRow, newCol])
				nextCellGrid[newRow][newCol] = this.val
		}
	}
	drawCells() {
		for (let coords of o.liveCellArray) {
			let [row, col] = coords
			let cellVal = cellGrid[row][col]
			// Draw cell as it is on cellGrid
			drawCell(row, col, cellVal)
			// Move cell on nextCellGrid
			o.moveCell(row, col)
		}
	}
}
