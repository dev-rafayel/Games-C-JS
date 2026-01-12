import { Piece } from './Piece.js';

export class Knight extends Piece {
  constructor(color, hasMoved) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wn.png' : '../Images/bn.png';
    this.hasMoved = hasMoved;
  }

  getMoves(piece, board, row, col) {
    const finalMoves = [];
    const probobalMoves = [
      [-1, 2],
      [-1, -2],
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];

    for (const i of probobalMoves) {
      const [dx, dy] = [i[0], i[1]];
      const newRow = row + dx;
      const newCol = col + dy;

      if (!this.isValidBorder(newRow, newCol)) continue;

      if (board[newRow][newCol] !== null) {
        const anotherPiece = board[newRow][newCol];
        if (anotherPiece.color !== this.color) {
          finalMoves.push([newRow, newCol]);
        }
      } else {
        finalMoves.push([newRow, newCol]);
      }
    }
    // console.log(finalMoves);
    return finalMoves;
  }

  applyMove(fromRow, fromCol, toRow, toCol) {
    
  }

  isChecked(row, col) {}
}
