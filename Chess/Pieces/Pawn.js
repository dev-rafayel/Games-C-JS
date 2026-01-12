import { Piece } from './Piece.js';

export class Pawn extends Piece {
  constructor(color, hasMoved) {
    super();
    this.color = color;
    this.imagePath = this.color === 'white' ? '../Images/wp.png' : '../Images/bp.png';
    this.hasMoved = hasMoved;
  }

  getMoves(piece) {
    const moves = [];

    if (!this.hasMoved) {
      moves.push([row + 2, col]);
    }


  }

  isChecked(row, col) { }
}
