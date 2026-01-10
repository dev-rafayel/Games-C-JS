import { Piece } from "./Piece.js";

export class Knight extends Piece {
    constructor(color, hasMoved) {
        super();
        this.color = color;
        this.imagePath = this.color === 'white' ? '../Images/wn.png' : '../Images/bn.png';
        this.hasMoved = hasMoved;
    }

    getMoves(piece) {}

    isChecked(row, col) {}
}