import { Piece } from './Piece.js';

export class King extends Piece {
  constructor(color, hasMoved) {
    super();
    this.color = color;
    this.imagePath = this.color === 'white' ? '../Images/wk.png' : '../Images/bk.png';
    this.hasMoved = hasMoved;
    this.type = 'King';
  }

  getMoves(piece) {}

  isChecked(row, col) {}
}
