import { Figure } from './Figure.js';

export class WhitePawn extends Figure {
  constructor() {
    super();
    this.color = 'white';
    this.imagePath = '../Images/wp.png';
    this.hasMoved = false;
  }

  validMoves(figure) {
    const moves = [
      [row - 2, col],
      [row - 1, col],
      [row - 1, col + 1],
      [row - 1, col - 1],
    ];

    if (this.hasMoved) {
      moves.shift();
    }
  }
}
