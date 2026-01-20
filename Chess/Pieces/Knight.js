import { Piece } from './Piece.js';

export class Knight extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wn.png' : '../Images/bn.png';
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

    for (const move of probobalDirections) {
      const [dx, dy] = [move[0], move[1]];
      const [newRow, newCol] = [row + dx, col + dy];

      if (!this.isValidBorder(newRow, newCol)) continue;

      if (board[newRow][newCol] !== null) {
        const anotherPiece = board[newRow][newCol];
        if (anotherPiece.type !== 'king' && anotherPiece.color !== this.color) {
          finalDirections.push([newRow, newCol]);
        }
      } else {
        finalDirections.push([newRow, newCol]);
      }
    }
    return finalDirections;
  }

  isChecked(row, col) {}
}
