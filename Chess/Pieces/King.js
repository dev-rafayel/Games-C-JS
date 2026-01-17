import { Piece } from './Piece.js';

export class King extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.imagePath = this.color === 'white' ? '../Images/wk.png' : '../Images/bk.png';
    this.hasMoved = false;
    this.type = 'king';
  }

  getMoves(board, row, col) {
    const finalDirections = [];
    const probobalDirections = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [1, -1],
      [1, 1],
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

  isChecked(row, col) { }
}
