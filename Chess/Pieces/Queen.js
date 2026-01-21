import { Piece } from './Piece.js';

export class Queen extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wq.png' : '../Images/bq.png';
  }

  getMoves(board, row, col) {
    const finalDirections = [];
    const probobalDirections = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const move of probobalDirections) {
      let [dx, dy] = [move[0], move[1]];
      let [newRow, newCol] = [row + dx, col + dy];

      while (this.isValidBorder(newRow, newCol)) {
        const anotherPiece = board[newRow][newCol];

        if (anotherPiece !== null && anotherPiece.color === this.color) {
          break;
        } else if (anotherPiece !== null) {
          if (anotherPiece.type !== 'king' && anotherPiece !== this.color) {
            finalDirections.push([newRow, newCol]);
            break;
          } else {
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
