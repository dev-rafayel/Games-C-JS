export class Piece {
  constructor() {
    if (new.target === Piece) {
      throw new Error('Cannot instantiate abstract class Piece directly.');
    }
    this.color = '';
    this.imagePath = '';
  }

  getMoves() {}

  isValidBorder(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  isChecked(row, col) {}
}
