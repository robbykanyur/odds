import Shoe from '../classes/Shoe'
import Hand from '../classes/Hand'
import { Seat } from './types'

export function dealHand(shoe: Shoe, playerHand: Hand, dealerHand: Hand): void {
  for (let i = 0; i < 2; i++) {
    playerHand.addCard(shoe.cards.pop()!)
    dealerHand.addCard(shoe.cards.pop()!)
  }
}

export function displayHand(seat: Seat, hand: Hand): void {
  if (seat === 'Player') {
    console.log('Your hand:')
    hand.showCards().cards.forEach(card => {
      console.log(card.displayName())
    })
    console.log('Value of hand: ', hand.value)
    console.log('')
  } else {
    console.log('Dealer\u2019s hand: ')
    console.log(hand.showCards().cards[0].displayName())
    console.log('Value of hand: ', hand.value)
    console.log('')
  }
}
