class Piece {
  constructor(row, col, color) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.firstMove = true;
    this.vision = [];
    this.isKing = false;
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

      CTX.strokeStyle = 'red';
      CTX.lineWidth = 5;
      CTX.strokeRect(x + CTX.lineWidth/2, y + CTX.lineWidth/2, SQUARE_WIDTH - CTX.lineWidth, SQUARE_WIDTH - CTX.lineWidth);
    }
  }
}

class Pawn extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/pawn_' + this.color + '.png';
    this.vertDirection = this.color == 'w' ? -1 : 1;
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
    this.imgSrc = './img/knight_' + this.color + '.png';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.knight(row, col, piece)];
  }
}

class Bishop extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/bishop_' + this.color + '.png';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.diagBeam(row, col, piece)];
  }
}

class Rook extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/rook_' + this.color + '.png';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.straightBeam(row, col, piece)];
  }
}

class Queen extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.imgSrc = './img/queen_' + this.color + '.png';
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.diagBeam(row, col, piece), ...VisionRules.straightBeam(row, col, piece)];
  }
}

class King extends Piece {
  constructor(row, col, color) {
    super(row, col, color);
    this.isKing = true;
    this.imgSrc = './img/king_' + this.color + '.png'
  }

  getVision(row, col, piece) {
    this.vision = [...this.vision, ...VisionRules.king(row, col, piece)];
  }
}
