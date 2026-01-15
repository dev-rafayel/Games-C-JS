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

        if (pieceSquare !== null) {
          const anotherPiece = board[newRow][newCol];
          if (anotherPiece.type !== 'King' && anotherPiece.color !== this.color) {
            probobalDirections.push([newRow, newCol]);
            break;
          } 
        } else {
          probobalDirections.push([newRow, newCol]);
        }
        newRow += dx;
        newCol += dy;
      }
    }
    return finalDirections;
  }

  isChecked(row, col) { }
}
