import { Piece } from './Piece.js';

export class King extends Piece {
  constructor(color, hasMoved) {
    super();
    this.color = color;
    this.imagePath = this.color === 'white' ? '../Images/wk.png' : '../Images/bk.png';
    this.hasMoved = hasMoved;
    this.type = 'king';
  }

  getMoves(board, row, col) {}

  isChecked(row, col) {}
}
