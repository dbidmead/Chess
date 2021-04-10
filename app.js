const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const SQUARE_WIDTH = CANVAS.width / 8;
const PIECE_PADDING = 5;
const PIECE_WIDTH = SQUARE_WIDTH - 2 * PIECE_PADDING;
let img = new Image();
img.src = './img/queen_b.png';
img.onload = function() {
  CTX.drawImage(img, (3 * SQUARE_WIDTH) + PIECE_PADDING, PIECE_PADDING, PIECE_WIDTH, PIECE_WIDTH);
}

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
