"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const Card_1 = __importDefault(require("./Card"));
class Shoe {
    decks;
    cards;
    warning;
    constructor(decks) {
        this.cards = [];
        this.decks = decks;
        for (let i = 0; i < decks; i++) {
            types_1.SUITS.forEach(suit => {
                types_1.FACES.forEach(face => {
                    this.cards.push(new Card_1.default(face, suit));
                });
            });
        }
    }
    shuffle() {
        let shoe = this.cards;
        let m = shoe.length;
        let i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [shoe[m], shoe[i]] = [shoe[i], shoe[m]];
        }
        this.cards = shoe;
        this.warning = this.generateWarning();
    }
    generateWarning() {
        const positive = Math.random() < 0.5;
        const min = 0;
        const max = 10;
        const flutter = Math.floor(Math.random() * (max - min + 1)) + min;
        if (positive) {
            return 52 + flutter;
        }
        else {
            return 52 - flutter;
        }
    }
}
exports.default = Shoe;
