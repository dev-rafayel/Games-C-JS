import { Figure } from "./Figure.js";

export class BlackKnight extends Figure {
    constructor() {
        super();
        this.color = 'black';
        this.imagePath = '../Images/bn.png';
    }

    validMoves(figure) {}
}