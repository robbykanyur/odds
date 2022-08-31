import Shoe from '../classes/Shoe'
import Hand from '../classes/Hand'
import { Seat } from './types'

export function dealHand(shoe: Shoe, playerHand: Hand, dealerHand: Hand): void {
  for (let i = 0; i < 2; i++) {
    playerHand.addCard(shoe.cards.pop()!)
    dealerHand.addCard(shoe.cards.pop()!)
  }
}

export function displayHand(seat: Seat, hand: Hand, hideDealerCard?: boolean): void {
  if (seat === 'Player') {
    console.log('Your hand:')
  } else {
    console.log('Dealer\u2019s hand: ')
  }
  hand.showCards(hideDealerCard).cards.forEach(card => {
    console.log(card.displayName())
  })
  console.log('Value of hand:', hand.value(hideDealerCard), '\n')
}
