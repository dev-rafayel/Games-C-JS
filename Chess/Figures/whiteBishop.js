import { Figure } from "./Figure.js";

export class WhiteBishop extends Figure {
    constructor() {
        super();
        this.color = 'white';
        this.imagePath = '../Images/wb.png';
    }

    validMoves(figure) {}
}