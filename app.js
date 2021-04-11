const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
const SQUARE_WIDTH = CANVAS.width / 8;
const PIECE_PADDING = 5;
const PIECE_WIDTH = SQUARE_WIDTH - 2 * PIECE_PADDING;
const BOARD = new Board();

let candX
let candY
let somethingSelected = false;

BOARD.init();

function select(e) {
  if(!somethingSelected) {
    BOARD.draw();
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(BOARD.array[i][j] != 0) {
          BOARD.array[i][j].selected = false;
          BOARD.array[i][j].vision = [];
        }
      }
    }
  }

  let rowIndex = Math.floor(e.layerY/SQUARE_WIDTH);
  let colIndex = Math.floor(e.layerX/SQUARE_WIDTH);
  let piece = BOARD.array[rowIndex][colIndex];

  if(piece != 0) {
    somethingSelected = true;
    let x = colIndex * SQUARE_WIDTH;
    let y = rowIndex * SQUARE_WIDTH;

    piece.selected = true;
    piece.getVision(rowIndex, colIndex, piece);
    piece.drawVision();

    CTX.strokeStyle = 'cyan';
    CTX.lineWidth = 5;
    CTX.strokeRect(x + CTX.lineWidth/2, y + CTX.lineWidth/2, SQUARE_WIDTH - CTX.lineWidth, SQUARE_WIDTH - CTX.lineWidth);

    //console.log(piece.vision)
    //console.log(BOARD.array)

    CANVAS.removeEventListener('click', select);
    CANVAS.addEventListener('click', move);
  }
}

CANVAS.addEventListener('click', select);

function checkCand(array, checkX, checkY) {
  for(let i = 0; i < array.length; i++) {
    if(array[i][0] == checkY && array[i][1] == checkX) {
      return true;
    }
  }
  return false;
}

function move(e) {
  candY = Math.floor(e.layerY/SQUARE_WIDTH);
  candX = Math.floor(e.layerX/SQUARE_WIDTH);

  if(somethingSelected) {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(BOARD.array[i][j] != 0) {
          if(BOARD.array[i][j].selected) {
            piece = BOARD.array[i][j];
          }
        }
      }
    }

    if(checkCand(piece.vision, candX, candY)) {
      //console.log('yay')
      BOARD.array[piece.row][piece.col] = 0;
      piece.row = candY;
      piece.col = candX;
      BOARD.array[piece.row][piece.col] = piece;
      if(piece.firstMove) { piece.firstMove = false };
    }
    piece.selected = false;
    piece.vision = [];
    BOARD.draw();
    somethingSelected = false;
    CANVAS.removeEventListener('click', move);
    CANVAS.addEventListener('click', select);
  }
  // console.log(CTX)
}

console.log(BOARD.array)
