var VisionRules = {
  checkCollide: function(array, piece) {
    let collision = false;
    let i = 1;
    while(i < array.length && !collision) {
      let square = BOARD.array[array[i][0]][array[i][1]];
      if(square != 0) {
        if(square.color == piece.color) {
          array.length = i;
          collision = true;
        } else {
          array.length = i + 1;
          collision = true;
        }
      } else { i++ }
    } 
  },

  checkStaticCollide: function(arr, piece) {
    function contains(array) {
      for(let i = 0; i < array.length; i++) {
        let square = BOARD.array[array[i][0]][array[i][1]];
        if(square != 0) {
          if(square.color == piece.color) {
            return true;
          }
        }
      }
      return false;
    }

    while(contains(arr)) {
      for(let i = 0; i < arr.length; i++) {
        let sq = BOARD.array[arr[i][0]][arr[i][1]];
        if(sq != 0) {
          if(sq.color == piece.color) {
            arr.splice(i, 1);
            break
          }
        }
      }
    }
  },

  pawnFirst: function(row, col, piece) {
    let visionIndexCoords = [];
    if(row + piece.vertDirection > -1 &&
      row + piece.vertDirection < 8 &&
      BOARD.array[row + piece.vertDirection][col] == 0) {
        visionIndexCoords.push([(row + piece.vertDirection), col]);
        if(row + (2 * piece.vertDirection) > -1 &&
          row + (2 * piece.vertDirection) < 8 &&
          BOARD.array[row + (2 * piece.vertDirection)][col] == 0) {
            visionIndexCoords.push([(row + (2 * piece.vertDirection)), col]);
        }
    }

    return visionIndexCoords;
  },

  pawnOther: function(row, col, piece) {
    let visionIndexCoords = [];
    if(row + piece.vertDirection > -1 &&
      row + piece.vertDirection < 8 &&
      BOARD.array[row + piece.vertDirection][col] == 0) {
        visionIndexCoords.push([(row + piece.vertDirection), col]);
    }

    return visionIndexCoords
  },

  pawnCapture: function(row, col, piece) {
    let visionIndexCoords = [];

    // capture left
    if(row + piece.vertDirection > -1 &&
      row + piece.vertDirection < 8 &&
      col - 1 > -1) {
        if(BOARD.array[row + piece.vertDirection][col - 1] != 0) {
          if(BOARD.array[row + piece.vertDirection][col - 1].color != piece.color) {
            visionIndexCoords.push([(row + piece.vertDirection), (col - 1)]);
          }
        }
    }

    // capture right
    if(row + piece.vertDirection > -1 &&
      row + piece.vertDirection < 8 &&
      col + 1 < 8) {
        if(BOARD.array[row + piece.vertDirection][col + 1] != 0) {
          if(BOARD.array[row + piece.vertDirection][col + 1].color != piece.color) {
            visionIndexCoords.push([(row + piece.vertDirection), (col + 1)]);
          }
        }
    }

    return visionIndexCoords;
  },

  straightBeam: function(row, col, piece) {
    let visionIndexCoords = [];
    let visionIndexCoordsU = [];
    let visionIndexCoordsD = [];
    let visionIndexCoordsL = [];
    let visionIndexCoordsR = [];

    // up
    for(let i = 0; i < 8; i++) {
      if(row - i > -1) {
        visionIndexCoordsU.push([(row - i), col]);
      }
    }
    this.checkCollide(visionIndexCoordsU, piece);

    // down
    for(let i = 0; i < 8; i++) {
      if(row + i < 8) {
        visionIndexCoordsD.push([(row + i), col]);
      }
    }
    this.checkCollide(visionIndexCoordsD, piece);

    // left
    for(let i = 0; i < 8; i++) {
      if(col - i > -1) {
        visionIndexCoordsL.push([row, (col - i)]);
      }
    }
    this.checkCollide(visionIndexCoordsL, piece);

    // right
    for(let i = 0; i < 8; i++) {
      if(col + i < 8) {
        visionIndexCoordsR.push([row, (col + i)]);
      }
    }
    this.checkCollide(visionIndexCoordsR, piece);

    //consider castles if rook
    visionIndexCoords = [...visionIndexCoordsU, ...visionIndexCoordsD, ...visionIndexCoordsL, ...visionIndexCoordsR];
    return visionIndexCoords;
  },

  diagBeam: function(row, col, piece) {
    let visionIndexCoords = [];
    let visionIndexCoordsUL = [];
    let visionIndexCoordsUR = [];
    let visionIndexCoordsDL = [];
    let visionIndexCoordsDR = [];

    // up and left
    for(let i = 0; i < 8; i++) {
      if(row - i > -1 && col - i > -1) {
        visionIndexCoordsUL.push([(row - i), (col - i)]);
      }
    }
    this.checkCollide(visionIndexCoordsUL, piece);

    // up and right
    for(let i = 0; i < 8; i++) {
      if(row - i > -1 && col + i < 8) {
        visionIndexCoordsUR.push([(row - i), (col + i)]);
      }
    }
    this.checkCollide(visionIndexCoordsUR, piece);

    // down and left
    for(let i = 0; i < 8; i++) {
      if(row + i < 8 && col - i > -1) {
        visionIndexCoordsDL.push([(row + i), (col - i)]);
      }
    }
    this.checkCollide(visionIndexCoordsDL, piece);

    // down and right
    for(let i = 0; i < 8; i++) {
      if(row + i < 8 && col + i < 8) {
        visionIndexCoordsDR.push([(row + i), (col + i)]);
      }
    }
    this.checkCollide(visionIndexCoordsDR, piece);

    visionIndexCoords = [...visionIndexCoordsUL, ...visionIndexCoordsUR, ...visionIndexCoordsDL, ...visionIndexCoordsDR]
    return visionIndexCoords;
  },

  knight: function(row, col, piece) {
    let visionIndexCoords = [];
    // up and left
    if(row - 1 > -1 && col - 2 > -1) {
      visionIndexCoords.push([(row - 1), (col - 2)]);
    }
    if(row - 2 > -1 && col - 1 > -1) {
      visionIndexCoords.push([(row - 2), (col - 1)]);
    }

    // up and right
    if(row - 1 > -1 && col + 2 < 8) {
      visionIndexCoords.push([(row - 1), (col + 2)]);
    }
    if(row - 2 > -1 && col + 1 < 8) {
      visionIndexCoords.push([(row - 2), (col + 1)]);
    }

    // down and left
    if(row + 1 < 8 && col - 2 > -1) {
      visionIndexCoords.push([(row + 1), (col - 2)]);
    }
    if(row + 2 < 8 && col - 1 > -1) {
      visionIndexCoords.push([(row + 2), (col - 1)]);
    }

    // down and right
    if(row + 1 < 8 && col + 2 < 8) {
      visionIndexCoords.push([(row + 1), (col + 2)]);
    }
    if(row + 2 < 8 && col + 1 < 8) {
      visionIndexCoords.push([(row + 2), (col + 1)]);
    }

    this.checkStaticCollide(visionIndexCoords, piece);

    return visionIndexCoords;
  },

  king: function(row, col, piece) {
    let visionIndexCoords = [];
    // up
    if(row - 1 > -1) {
      visionIndexCoords.push([(row - 1), col]);
      if(col - 1 > -1) {
        visionIndexCoords.push([(row - 1), (col - 1)]);
      }
      if(col + 1 < 8) {
        visionIndexCoords.push([(row - 1), (col + 1)]);
      }
    }

    // sides
    if(col - 1 > -1) {
      visionIndexCoords.push([row, (col - 1)]);
    }
    if(col + 1 < 8) {
      visionIndexCoords.push([row, (col + 1)]);
    }

    // down
    if(row + 1 < 8) {
      visionIndexCoords.push([(row + 1), col]);
      if(col - 1 > -1) {
        visionIndexCoords.push([(row + 1), (col - 1)]);
      }
      if(col + 1 < 8) {
        visionIndexCoords.push([(row + 1), (col + 1)]);
      }
    }

    this.checkStaticCollide(visionIndexCoords, piece);

    //consider castles
    return visionIndexCoords;
  }

}
