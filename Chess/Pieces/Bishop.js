import { Piece } from "./Piece.js";

export class Bishop extends Piece {
    constructor(color, hasMoved) {
        super();
        this.color = color;
        this.imagePath = this.color === 'white' ? '../Images/wb.png' : '../Images/bb.png';
        this.hasMoved = hasMoved;
    }

    getMoves(piece) {
        const moves = [];
    }

    isChecked(row, col) {}
}