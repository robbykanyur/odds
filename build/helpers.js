"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayHand = exports.dealHand = void 0;
function dealHand(shoe, playerHand, dealerHand) {
    for (let i = 0; i < 2; i++) {
        playerHand.addCard(shoe.cards.pop());
        dealerHand.addCard(shoe.cards.pop());
    }
}
exports.dealHand = dealHand;
function displayHand(seat, hand) {
    if (seat === 'Player') {
        console.log('Your hand:');
        hand.showCards().cards.forEach(card => {
            console.log(card.displayName());
        });
        console.log('Value of hand: ', hand.value(hand.showCards().cards));
        console.log('');
    }
    else {
        console.log('Dealer\u2019s hand: ');
        console.log(hand.showCards().cards[0].displayName());
        console.log('Value of hand: ', hand.value(hand.showCards().cards));
        console.log('');
    }
}
exports.displayHand = displayHand;
