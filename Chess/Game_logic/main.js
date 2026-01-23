import { Rook } from '/Pieces/Rook.js';
import { Knight } from '/Pieces/Knight.js';
import { Bishop } from '/Pieces/Bishop.js';
import { Queen } from '/Pieces/Queen.js';
import { King } from '/Pieces/King.js';
import { Pawn } from '/Pieces/Pawn.js';

export class gridBoard {
  constructor() {
    this.boardState = new Map();
    this.stepCount = 0;
    this.player = 'white';
    this.gridBoard = new Array(8).fill(null).map(() => new Array(8).fill(null));
    this.startPositions = [
      [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
      [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn],
      [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
    ];
  }

  initGame() {
    for (let row = 0; row < 8; ++row) {
      for (let col = 0; col < 8; ++col) {
        const pieceClass = this.startPositions[row][col];
        if (pieceClass && row < 2) {
          this.gridBoard[row][col] = new pieceClass('black');
        } else if (pieceClass && row > 5) {
          this.gridBoard[row][col] = new pieceClass('white');
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

    const pieceMoves = piece.getMoves(this.gridBoard, row, col);

    // If it's a king, add castling moves
    if (piece.type === 'king') {
      const castlingMoves = this.getCastlingMoves(piece, row, col);
      return [...pieceMoves, ...castlingMoves];
    }

    return pieceMoves;
  }

  applyMove(fromClickedPosition, toClickedPosition) {
    const [fromRow, fromCol] = [fromClickedPosition[0], fromClickedPosition[1]];
    const [toRow, toCol] = [toClickedPosition[0], toClickedPosition[1]];

    this.gridBoard[toRow][toCol] = this.gridBoard[fromRow][fromCol];
    if (!this.gridBoard[toRow][toCol].hasMoved) {
      this.gridBoard[toRow][toCol].hasMoved = true;
      console.log(this.gridBoard[toRow][toCol])
    }
    this.gridBoard[fromRow][fromCol] = null;

    ++this.stepCount;
    this.saveboardState();
    // this.changePlayerTurn();
    return [toRow, toCol];
  }

  getCastlingMoves(king, row, col) {
    // If the king has already moved, castling is not allowed
    if (!king || king.type !== 'king') return [];
    if (king.hasMoved) return [];

    const queenSideRook = this.gridBoard[row][0];
    const kingSideRook = this.gridBoard[row][7];
    const kingCol = col;
    const castlingCoords = [];

    // Check queenside castling
    if (queenSideRook && queenSideRook.type === 'rook' && !queenSideRook.hasMoved) {
      const areSquaresEmpty = this.#areSquaresEmpty(row, kingCol, 0);
      if (areSquaresEmpty) {
        castlingCoords.push([row, col - 2]); // King moves to c1/c8
      }
    }

    // Check kingside castling
    if (kingSideRook && kingSideRook.type === 'rook' && !kingSideRook.hasMoved) {
      const areSquaresEmpty = this.#areSquaresEmpty(row, kingCol, 7);
      if (areSquaresEmpty) {
        castlingCoords.push([row, col + 2]); // King moves to g1/g8
      }
    }

    return castlingCoords;
  }

  saveboardState() {
    const deepCopy = this.gridBoard.map((row) => [...row]);
    this.boardState.set(this.stepCount, deepCopy);
    // console.log(this.gridBoard);
  }

  changePlayerTurn() {
    return (this.player = this.player === 'white' ? 'black' : 'white');
  }

  // Helpers

  #areSquaresEmpty(row, kingCol, rookCol) {
    const step = rookCol > kingCol ? 1 : -1;
    let col = kingCol + step;

    while (col !== rookCol) {
      if (this.gridBoard[row][col] !== null) {
        return false;
      }
      col += step;
    }

    return true;
  }
}
