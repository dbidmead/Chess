class Piece {
  constructor(row, col, color) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.firstMove = true;
    this.vision = [];
    this.isKing = false;
    this.imgSrc;
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
// need to draw piece vision if selected
}

class Pawn extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/pawn_' + this.color + '.png';
    this.vertDirection = this.color == 'w' ? -1 : 1;
  }

  getVision() {
    VisionRules.pawnCapture();
    if(this.firstMove == true) {
      VisionRules.pawnFirst();
    } else {
      VisionRules.pawnOther();
    }
  }

  drawVision() {

  }

}

class Knight extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/knight_' + this.color + '.png';
  }

  getVision() {
    VisionRules.knight();
  }

  drawVision() {

  }
}

class Bishop extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/bishop_' + this.color + '.png';
  }

  getVision() {
    VisionRules.diagBeam();
  }

  drawVision() {

  }
}

class Rook extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/rook_' + this.color + '.png';
  }

  getVision() {
    VisionRules.straightBeam();
  }

  drawVision() {

  }
}

class Queen extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/queen_' + this.color + '.png';
  }

  getVision() {
    VisionRules.straightBeam();
    VisionRules.diagBeam();
  }

  drawVision() {

  }
}

class King extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.isKing = true;
    this.imgSrc = './img/king_' + this.color + '.png'
  }

  getVision() {
    VisionRules.king();
  }

  drawVision() {

  }
}
