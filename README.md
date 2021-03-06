# Chess
The purpose of this project is to code the visuals and logic of chess.

### Plan
* Create a board
* Create pieces
* Establish rules
  * Rules for piece motion
  * Rules for legal moves / check / mate
* Give turns

### Ideas
- [X] Board will consist of a 2D array for game logic, and have a draw method
- [X] Draw the board using the canvas feature using some pixel math
- [X] Create Piece class and have the pieces extend it
- [X] Potential Rules class? - Rules object.
- [X] Piece motion rules: re-use diagonal and straight beaming moves
- [X] Pawn moves (up two on first move, only move forward, capture diagonal, en passant if on 5th rank, promotion)
- [X] Castles
- [ ] inCheck boolean: is king's position in the vision of an enemy piece
- [ ] Checkmate: every move leads to check and inCheck = true
- [ ] Stalemate: every move leads to check and inCheck = false
- [ ] Above two will be dealt with by legal moves: cannot move into check
