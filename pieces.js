class Piece {
  constructor(row, col, color) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.firstMove = true;
    this.vision = [];
    this.isKing = false;
    this.isPawn = false;
    this.imgSrc;
    this.selected = false;
  }

  draw() {
    let img = new Image();
    let x = (this.col * SQUARE_WIDTH) + PIECE_PADDING;
    let y = (this.row * SQUARE_WIDTH) + PIECE_PADDING;
    img.src = this.imgSrc;
    img.onload = function() {
      CTX.drawImage(img, x, y, PIECE_WIDTH, PIECE_WIDTH);
    }
  };

  drawVision() {
    for(let i = 0; i < this.vision.length; i++) {
      let x = this.vision[i][1] * SQUARE_WIDTH;
      let y = this.vision[i][0] * SQUARE_WIDTH;

      CTX.fillStyle = '#83F089';
      CTX.strokeStyle = '#906DB3';
      CTX.fillRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
      CTX.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
    }
  }
}

class Pawn extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.isPawn = true;
    this.imgSrc = './img/pawn_' + this.color + '.svg';
    this.vertDirection = this.color == 'w' ? -1 : 1;
    this.jumpedTwo = false;
    this.advanced = 0;
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.pawnCapture(row, col, piece)];
    if(this.firstMove) {
      this.vision = [...this.vision, ...VisionRules.pawnFirst(row, col, piece)];
    } else {
      this.vision = [...this.vision, ...VisionRules.pawnOther(row, col, piece)];
    }
    // console.log(piece)
  }
}

class Knight extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/knight_' + this.color + '.svg';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.knight(row, col, piece)];
  }
}

class Bishop extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/bishop_' + this.color + '.svg';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.diagBeam(row, col, piece)];
  }
}

class Rook extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/rook_' + this.color + '.svg';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.straightBeam(row, col, piece)];
  }
}

class Queen extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/queen_' + this.color + '.svg';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.diagBeam(row, col, piece), ...VisionRules.straightBeam(row, col, piece)];
  }
}

class King extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.isKing = true;
    this.imgSrc = './img/king_' + this.color + '.svg'
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.king(row, col, piece)];
  }
}
