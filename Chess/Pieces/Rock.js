import { Piece } from "./Piece.js";

export class Rock extends Piece {
    constructor(color, hasMoved) {
        super();
        this.color = color;
        this.imagePath = this.color === 'white' ? '../Images/wr.png' : '../Images/br.png';
        this.hasMoved = hasMoved;
    }

    getMoves(board, row, col) {}

    isChecked(row, col) {}
}