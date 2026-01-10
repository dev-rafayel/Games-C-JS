import { Rock } from '/Pieces/Rock.js';
import { Knight } from '/Pieces/Knight.js';
import { Bishop } from '/Pieces/Bishop.js';
import { Queen } from '/Pieces/Queen.js';
import { King } from '/Pieces/King.js';
import { Pawn } from '/Pieces/Pawn.js';

export class BoardState {
  constructor() {
    this.boardState = new Array(8)
      .fill(null)
      .map(() => new Array(8).fill(null));
    this.startPositions = [
      [
        Rock,
        Knight,
        Bishop,
        Queen,
        King,
        Bishop,
        Knight,
        Rock,
      ],
      [
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
        Pawn,
      ],
      [
        Rock,
        Knight,
        Bishop,
        Queen,
        King,
        Bishop,
        Knight,
        Rock,
      ],
    ];
  }

  initGame() {
    for (let row = 0; row < 8; ++row) {
      for (let col = 0; col < 8; ++col) {
        const pieceClass = this.startPositions[row][col];
        if (pieceClass && row < 2) {
          this.boardState[row][col] = new pieceClass('black', false);
        } else if (pieceClass && row > 5) {
          this.boardState[row][col] = new pieceClass('white', false);
        } else {
          this.boardState[row][col] = null;
        }
      }
    }
  }

  getPossibleMoves(row, col) {
    const piece = this.boardState[row][col];
    if (piece === null) {
      return;
    }
    console.log(piece);
    piece.getMoves(piece);
  }
}
