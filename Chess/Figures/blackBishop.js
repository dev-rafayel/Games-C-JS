import { Figure } from "./Figure.js";

export class BlackBishop extends Figure {
    constructor() {
        super();
        this.color = 'black';
        this.imagePath = '../Images/bb.png'
    }

    validMoves() {
        const moves = [];
    }
}