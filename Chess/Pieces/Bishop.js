import { Piece } from './Piece.js';

export class Bishop extends Piece {
  constructor(color, hasMoved) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wb.png' : '../Images/bb.png';
    this.hasMoved = hasMoved;
  }

  getMoves(board, row, col) {
    const finalDirections = [];
    const probobalDirections = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [dx, dy] of probobalDirections) {
      let newRow = row + dx;
      let newCol = col + dy;

      while (this.isValidBorder(newRow, newCol)) {
        const pieceSquare = board[newRow][newCol];

        if (pieceSquare !== null && pieceSquare.color === this.color) {
          break;
        } else if (pieceSquare !== null) {
          const anotherPiece = board[newRow][newCol];
          if (anotherPiece.type !== 'king' && anotherPiece !== this.color) {
            finalDirections.push([newRow, newCol]);
            break;
          }
        } else {
          finalDirections.push([newRow, newCol]);
        }
        newRow += dx;
        newCol += dy;
      }
    }
    return finalDirections;
  }

  isChecked(row, col) {}
}
