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

    // CASTLES: adds castling squares to King's vision array when appropriate
    if(piece.isKing && piece.firstMove) {
      let rookL;
      let rookR;
      if(BOARD.array[rowIndex][0] != 0) {
        if(BOARD.array[rowIndex][0].firstMove) {
          rookL = BOARD.array[rowIndex][0];
        }
      }
      if(BOARD.array[rowIndex][7] != 0) {
        if(BOARD.array[rowIndex][7].firstMove) {
          rookR = BOARD.array[rowIndex][7];
        }
      }
      VisionRules.castles(piece, rookL, rookR);
    }
    piece.drawVision();

    CTX.fillStyle = '#83B3F0'
    CTX.strokeStyle = '#6A9CDB';
    CTX.fillRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    CTX.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
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
      BOARD.array[piece.row][piece.col] = 0;

      // CASTLES: move correct rook if king goes to castles vision option
      // !!!!!!!!! will have to edit "if" statements when checks are implemented
      if(piece.isKing) {
        if(candX == piece.col - 2) {
          let rookL = BOARD.array[piece.row][0];
          rookL.col = candX + 1;
          BOARD.array[piece.row][rookL.col] = rookL;
          BOARD.array[piece.row][0] = 0;
          rookL.firstMove = false;
        }
        if(candX == piece.col + 2) {
          let rookR = BOARD.array[piece.row][7];
          rookR.col = candX - 1;
          BOARD.array[piece.row][rookR.col] = rookR;
          BOARD.array[piece.row][7] = 0;
          rookR.firstMove = false;
        }
      }


      if(piece.isPawn) {
        // EN PASSANT
        if(candY == piece.row + (2 * piece.vertDirection)) {
          piece.advanced += 2;
          piece.jumpedTwo = true; // !!!!!!!!! when you implement turns, this will turn false each turn / every second switch
        } else {
          piece.advanced++;
        }
        if(candX != piece.col && BOARD.array[candY][candX] == 0) {
          BOARD.array[piece.row][candX] = 0;
        }
        // console.log(piece.advanced, piece.jumpedTwo);
      }

      // move actual selected piece
      piece.row = candY;
      piece.col = candX;
      BOARD.array[piece.row][piece.col] = piece;

      if(piece.isPawn) {
        // PROMOTION (eventually aim to give options with a pop-up menu)
        if(piece.advanced == 6) {
          BOARD.array[piece.row][piece.col] = new Queen(piece.row, piece.col, piece.color);
        }
      }

      if(piece.firstMove) { piece.firstMove = false };
    }
    piece.selected = false;
    piece.vision = [];
    BOARD.draw();
    somethingSelected = false;
    CANVAS.removeEventListener('click', move);
    CANVAS.addEventListener('click', select);
  }
  //console.log(CTX)
}

//console.log(BOARD.array)
