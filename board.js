class Board {
  constructor() {
    this.array; //push piece objects or 0's
    this.whitePerspective = true; //will toggle to false from a button; in function also make sure to change each pawn's vertdirection
  }

  fillArray() {
    this.array = [];
    if(this.whitePerspective) {

      for(let i = 0; i < 8; i++) { this.array.push([]) };

      this.array[0].push(new Rook(0, 0, 'b'));
      this.array[0].push(new Knight(0, 1, 'b'));
      this.array[0].push(new Bishop(0, 2, 'b'));
      this.array[0].push(new Queen(0, 3, 'b'));
      this.array[0].push(new King(0, 4, 'b'));
      this.array[0].push(new Bishop(0, 5, 'b'));
      this.array[0].push(new Knight(0, 6, 'b'));
      this.array[0].push(new Rook(0, 7, 'b'));
      for(let i = 0; i < 8; i++) { this.array[1].push(new Pawn(1, i, 'b')) };

      for(let i = 2; i < 6; i++) {
        for(let j = 0; j < 8; j++) {
          this.array[i].push(0);
        }
      }

      for(let i = 0; i < 8; i++) { this.array[6].push(new Pawn(6, i, 'w')) };
      this.array[7].push(new Rook(7, 0, 'w'));
      this.array[7].push(new Knight(7, 1, 'w'));
      this.array[7].push(new Bishop(7, 2, 'w'));
      this.array[7].push(new Queen(7, 3, 'w'));
      this.array[7].push(new King(7, 4, 'w'));
      this.array[7].push(new Bishop(7, 5, 'w'));
      this.array[7].push(new Knight(7, 6, 'w'));
      this.array[7].push(new Rook(7, 7, 'w'));

    } else {

      for(let i = 0; i < 8; i++) { this.array.push([]) };

      this.array[0].push(new Rook(0, 0, 'w'));
      this.array[0].push(new Knight(0, 1, 'w'));
      this.array[0].push(new Bishop(0, 2, 'w'));
      this.array[0].push(new King(0, 3, 'w'));
      this.array[0].push(new Queen(0, 4, 'w'));
      this.array[0].push(new Bishop(0, 5, 'w'));
      this.array[0].push(new Knight(0, 6, 'w'));
      this.array[0].push(new Rook(0, 7, 'w'));
      for(let i = 0; i < 8; i++) { this.array[1].push(new Pawn(1, i, 'w')) };

      for(let i = 2; i < 6; i++) {
        for(let j = 0; j < 8; j++) {
          this.array[i].push(0);
        }
      }

      for(let i = 0; i < 8; i++) { this.array[6].push(new Pawn(6, i, 'b')) };
      this.array[7].push(new Rook(7, 0, 'b'));
      this.array[7].push(new Knight(7, 1, 'b'));
      this.array[7].push(new Bishop(7, 2, 'b'));
      this.array[7].push(new King(7, 3, 'b'));
      this.array[7].push(new Queen(7, 4, 'b'));
      this.array[7].push(new Bishop(7, 5, 'b'));
      this.array[7].push(new Knight(7, 6, 'b'));
      this.array[7].push(new Rook(7, 7, 'b'));
    }

  }

  drawSquare(i, j) {
    CTX.beginPath();
    CTX.fillStyle = '#EBD8FF';
    CTX.rect(j * SQUARE_WIDTH, i * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
    CTX.fill();
    CTX.closePath();
  }

  draw() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(i % 2 == 0 && j % 2 == 0) {
          this.drawSquare(i, j);
        }
        if(i % 2 != 0 && j % 2 != 0) {
          this.drawSquare(i, j);
        }
      }
    }

    //draw pieces of this.array[i][j] != 0
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(this.array[i][j] != 0) {
          this.array[i][j].draw();
        }
      }
    }
  }

  init() {
    this.fillArray()
    this.draw()
  }
}
