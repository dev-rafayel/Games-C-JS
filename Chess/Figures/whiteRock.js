import { Figure } from "./Figure.js";

export class WhiteRock extends Figure {
    constructor() {
        super();
        this.color = 'white';
        this.imagePath = '../Images/wr.png';
    }

    validMoves() {}
}