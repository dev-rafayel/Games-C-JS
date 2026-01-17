import { Piece } from './Piece.js';

export class Pawn extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.imagePath =
      this.color === 'white' ? '../Images/wp.png' : '../Images/bp.png';
    this.type = 'pawn';
    this.hasMoved = false;
  }

  getMoves(board, row, col) {
    const finalDirections = [];
    const probobalDirections = [
      [2, 0],
      [1, 0],
    ];

    for (const move of probobalDirections) {
      const [dx, dy] = [move[0], move[1]];
      const [newRow, newCol] =
        this.color === 'white' ? [row - dx, col - dy] : [row + dx, col + dy];
      if (!this.isValidBorder(newRow, newCol)) continue;

      if (this.hasMoved && dx === 2) {
        continue;
      }

      if (board[newRow][newCol] === null) {
        finalDirections.push([newRow, newCol]);
      }

      // Check left diagonal
      const [leftDiogRow, leftDiogCol] =
        this.color === 'white' ? [row - 1, col - 1] : [row + 1, col - 1];

      if (this.isValidBorder(leftDiogRow, leftDiogCol) && board[leftDiogRow][leftDiogCol] !== null) {
        const anotherPiece = board[leftDiogRow][leftDiogCol];
        if (anotherPiece.type !== 'king' && anotherPiece.color !== this.color) {
          finalDirections.push([leftDiogRow, leftDiogCol]);
        }
      }

      // Check right diagonal
      const [rightDiogRow, rightDiogCol] =
        this.color === 'black' ? [row + 1, col + 1] : [row - 1, col + 1];

      if (this.isValidBorder(rightDiogRow, rightDiogCol) && board[rightDiogRow][rightDiogCol] !== null) {
        const anotherPiece = board[rightDiogRow][rightDiogCol];
        if (anotherPiece.type !== 'king' && anotherPiece.color !== this.color) {
          finalDirections.push([rightDiogRow, rightDiogCol]);
        }
      }
    }
    return finalDirections;
  }

  isChecked(row, col) { }
}
