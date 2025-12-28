export class Figure {
  constructor() {
    if (new.target === Figure) {
      throw new Error('Cannot instantiate abstract class Figure directly.');
    }
  }

  validMoves() {}
}
