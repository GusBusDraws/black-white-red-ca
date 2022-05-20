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
	drawCells() {
		for (let coords of this.liveCellArray) {
			let [row, col] = coords
			// Draw cell as it is on cellGrid
			this.drawCell(row, col)
		}
	}
	drawCell(row, col) {
		let x = col * res
		let y = row * res
		noStroke()
		fill(colorFromVal(this.val))
		square(x, y, res)
	}
	chooseAction() {
		this.action = random([this.move, this.grow, this.shrink])
	}
	performAction(action) {
		this.action()
	}
	move() {
		let rowDir = floor(random(-1, 2))
		let colDir = floor(random(-1, 2))
		for (let coords of this.liveCellArray) {
			let [row, col] = coords
			let newRow = row + rowDir
			let newCol = col + colDir
			// If cell is in bounds, move & track. Else, die & forget.
			if (newRow < nRows && newRow >= 0 && newCol < nCols && newCol >= 0) {
				this.nextLiveCellArray.push([newRow, newCol])
				nextCellGrid[newRow][newCol] = this.val
			}
		}
	}
	noChange() {
		// Copy next grid/cells to stay the same
		this.nextLiveCellArray = this.liveCellArray.slice(0)
		nextCellGrid = cellGrid.map(inner => inner.slice(0))
	}
	grow() {
		// Growing is staying the same (carry on current grid/cells to next frame) followed by moving
		this.noChange()
		for (let coords of this.liveCellArray) {
			if (random() < prob['grow']) {
				let [row, col] = coords
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
		}
		this.liveCellArray = [... new Set(this.liveCellArray)]
	}
	shrink() {
		// Shrinking is 
		this.noChange()
		for (let i = this.liveCellArray.length - 1; i >= 0; i --) {
			let coords = this.liveCellArray[i]
			let [row, col] = coords
			if (random() < prob['shrink'] * this.liveCellArray.length) {
				this.nextLiveCellArray.splice(i, 1)
				nextCellGrid[row][col] = 0
			}
		}
	}
}
