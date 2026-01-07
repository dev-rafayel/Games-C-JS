import { Figure } from './Figure.js';

export class BlackPawn extends Figure {
  constructor() {
    super();
    this.color = 'black';
    this.imagePath = '../Images/bp.png';
    this.hasMoved = false;
  }

  validMoves(figure) {
    const moves = [];

    if (!this.hasMoved) {
        moves.push([row + 2, col]);
    }

    
  }
}
