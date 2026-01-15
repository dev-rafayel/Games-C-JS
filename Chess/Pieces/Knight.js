import { Piece } from './Piece.js';

export class Knight extends Piece {
  constructor(color, hasMoved) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wn.png' : '../Images/bn.png';
    this.hasMoved = hasMoved;
  }

  getMoves(board, row, col) {
    const finalDirections = [];
    const probobalDirections = [
      [-1, 2],
      [-1, -2],
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];

    for (const i of probobalDirections) {
      const [dx, dy] = [i[0], i[1]];
      const newRow = row + dx;
      const newCol = col + dy;

      if (!this.isValidBorder(newRow, newCol)) continue;

      if (board[newRow][newCol] !== null) {
        const anotherPiece = board[newRow][newCol];
        if (anotherPiece.type !== 'King' && anotherPiece.color !== this.color) {
          finalDirections.push([newRow, newCol]);
        }
      } else {
        finalDirections.push([newRow, newCol]);
      }
    }
    // console.log(finalDirections);
    return finalDirections;
  }

  isChecked(row, col) {}
}
