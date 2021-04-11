var VisionRules = {
// for all: consider collisions with walls, friendly pieces, and/or opposing pieces!
  pawnFirst: function(row, col, piece) {
    let visionIndexCoords = [];
    visionIndexCoords.push([(row + piece.vertDirection), col]);
    visionIndexCoords.push([(row + (2 * piece.vertDirection)), col]);

    return visionIndexCoords;
  },

  pawnOther: function(row, col, piece) {
    let visionIndexCoords = [];
    visionIndexCoords.push([(row + piece.vertDirection), col]);

    return visionIndexCoords
  },

  pawnCapture: function(row, col, piece) {
    let visionIndexCoords = [];

    return visionIndexCoords;
  },

  straightBeam: function(row, col, piece) {
    let visionIndexCoords = [];
    // up
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([(row - i), col]);
    }
    // down
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([(row + i), col]);
    }
    // left
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([row, (col - i)]);
    }
    // right
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([row, (col + i)]);
    }

    //consider castles if rook
    return visionIndexCoords;
  },

  diagBeam: function(row, col, piece) {
    let visionIndexCoords = [];
    // up and left
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([(row - i), (col - i)]);
    }
    // up and right
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([(row - i), (col + i)]);
    }
    // down and left
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([(row + i), (col - i)]);
    }
    // down and right
    for(let i = 0; i < 8; i++) {
      visionIndexCoords.push([(row + i), (col + i)]);
    }

    return visionIndexCoords;
  },

  knight: function(row, col, piece) {
    let visionIndexCoords = [];
    // up and left
    visionIndexCoords.push([(row - 1), (col - 2)], [(row - 2), (col - 1)]);
    // up and right
    visionIndexCoords.push([(row - 1), (col + 2)], [(row - 2), (col + 1)]);
    // down and left
    visionIndexCoords.push([(row + 1), (col - 2)], [(row + 2), (col - 1)]);
    // down and right
    visionIndexCoords.push([(row + 1), (col + 2)], [(row + 2), (col + 1)]);

    return visionIndexCoords;
  },

  king: function(row, col, piece) {
    let visionIndexCoords = [];
    // up
    visionIndexCoords.push([(row - 1), (col - 1)], [(row - 1), col], [(row - 1), (col + 1)]);
    // sides
    visionIndexCoords.push([row, (col - 1)], [row, (col + 1)]);
    // down
    visionIndexCoords.push([(row + 1), (col - 1)], [(row + 1), col], [(row + 1), (col + 1)]);

    //consider castles
    return visionIndexCoords;
  }

}
