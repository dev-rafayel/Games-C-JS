import { Rock } from '/Pieces/Rock.js';
import { Knight } from '/Pieces/Knight.js';
import { Bishop } from '/Pieces/Bishop.js';
import { Queen } from '/Pieces/Queen.js';
import { King } from '/Pieces/King.js';
import { Pawn } from '/Pieces/Pawn.js';

export class gridBoard {
  constructor() {
    this.boardState = new Map();
    this.stepCount = 0; 
    this.gridBoard = new Array(8)
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
          this.gridBoard[row][col] = new pieceClass('black', false);
        } else if (pieceClass && row > 5) {
          this.gridBoard[row][col] = new pieceClass('white', false);
        } else {
          this.gridBoard[row][col] = null;
        }
      }
    }
  }

  getPossibleMoves(row, col) {
    const piece = this.gridBoard[row][col];
    if (piece === null) {
      return;
    }
    return piece.getMoves(this.gridBoard, row, col);
  }

  applyMove(fromClickedPosition, toClickedPosition) {
    const [fromRow, fromCol] = [fromClickedPosition[0], fromClickedPosition[1]];
    const [toRow, toCol] = [toClickedPosition[0], toClickedPosition[1]];

    this.gridBoard[toRow][toCol] = this.gridBoard[fromRow][fromCol];
    if (this.gridBoard[toRow][toCol].type === 'pawn') {
      this.gridBoard[toRow][toCol].hasMoved = true;
    }
    this.gridBoard[fromRow][fromCol] = null;
    
    ++this.stepCount;
    this.saveboardState();
    return [toRow, toCol];
  }

  saveboardState() {
    const deepCopy = this.gridBoard.map(row => [...row]);
    this.boardState.set(this.stepCount, deepCopy);
    // console.log(this.gridBoard);
  }
}
