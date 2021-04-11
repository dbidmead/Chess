const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const SQUARE_WIDTH = CANVAS.width / 8;
const PIECE_PADDING = 5;
const PIECE_WIDTH = SQUARE_WIDTH - 2 * PIECE_PADDING;
const BOARD = new Board();


BOARD.init();

function select(e) {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  BOARD.draw();
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if(BOARD.array[i][j] != 0) {
        BOARD.array[i][j].selected = false;
      }
    }
  }

  let rowIndex = Math.floor(e.layerY/SQUARE_WIDTH);
  let colIndex = Math.floor(e.layerX/SQUARE_WIDTH);
  let piece = BOARD.array[rowIndex][colIndex]

  if(piece != 0) {
    let x = colIndex * SQUARE_WIDTH;
    let y = rowIndex * SQUARE_WIDTH;

    piece.selected = true;
    piece.getVision(rowIndex, colIndex, piece);
    piece.drawVision()

    CTX.strokeStyle = 'cyan';
    CTX.lineWidth = 5;
    CTX.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);

    // console.log(piece.vision);
  }
  // console.log(CTX)
}

CANVAS.addEventListener('click', select)
