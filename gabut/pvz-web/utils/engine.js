class Grid {
  constructor(rows, cols, cellWidth, cellHeight) {
    this.rows = rows;
    this.cols = cols;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
  }

  draw(ctx) {
    ctx.strokeStyle = "#555";
    for (let r = 0; r <= this.rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * this.cellHeight);
      ctx.lineTo(this.cols * this.cellWidth, r * this.cellHeight);
      ctx.stroke();
    }
    for (let c = 0; c <= this.cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * this.cellWidth, 0);
      ctx.lineTo(c * this.cellWidth, this.rows * this.cellHeight);
      ctx.stroke();
    }
  }

  getCell(x, y) {
    const col = Math.floor(x / this.cellWidth);
    const row = Math.floor(y / this.cellHeight);
    return { row, col };
  }

  getCellCoords(row, col) {
    return {
      x: col * this.cellWidth,
      y: row * this.cellHeight,
    };
  }
}
