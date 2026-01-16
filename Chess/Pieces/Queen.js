import { Piece } from "./Piece.js";

export class Queen extends Piece {
    constructor(color, hasMoved) {
        super();
        this.color = color;
        this.imagePath = this.color === 'white' ? '../Images/wq.png' : '../Images/bq.png';
        this.hasMoved = hasMoved;
    }

    getMoves(board, row, col) {}

    isChecked(row, col) {}
}