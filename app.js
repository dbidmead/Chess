const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const SQUARE_WIDTH = CANVAS.width / 8;

class Board {
  constructor() {
    this.array = [];
  }

  drawSquare(i, j) {
    CTX.beginPath();
    CTX.fillStyle = 'white';
    CTX.rect(j * SQUARE_WIDTH, i * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
    CTX.fill();
    CTX.closePath();
  }

  draw() {
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
  }
}

const BOARD = new Board();
BOARD.draw();
