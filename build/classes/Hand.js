"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hand {
    cards;
    seat;
    value = this.calculateTotal;
    constructor(seat) {
        this.cards = [];
        this.seat = seat;
    }
    showCards() {
        if (this.seat == 'Player') {
            return { total: this.calculateTotal(this.cards), cards: this.cards };
        }
        else {
            return { total: this.calculateTotal([this.cards[0]]), cards: [this.cards[0]] };
        }
    }
    addCard(card) {
        this.cards.push(card);
        return this.cards;
    }
    calculateTotal(cards) {
        let total = 0;
        let aces = 0;
        cards.forEach(card => {
            if (card.face === 'Ace') {
                aces += 1;
                total += 11;
            }
            else {
                total += card.getValue();
            }
        });
        if (aces === 0) {
            return [total];
        }
        else {
            return [total - aces * 10, total];
        }
    }
}
exports.default = Hand;
