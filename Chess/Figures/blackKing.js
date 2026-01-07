import { Figure } from './Figure.js';

export class BlackKing extends Figure {
  constructor() {
    super();
    this.color = 'black';
    this.imagePath = '../Images/bk.png';
  }

  validMoves(figure) {}
}
