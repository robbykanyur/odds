import Card from './Card'
import { Seat } from '../lib/types'

export default class Hand {
  private cards: Card[]
  public seat: Seat

  constructor(seat: Seat) {
    this.cards = []
    this.seat = seat
  }

  public showCards(): { total: number[]; cards: Card[] } {
    if (this.seat == 'Player') {
      return { total: this.value(), cards: this.cards }
    } else {
      return { total: [this.cards[0].getValue()], cards: [this.cards[0]] }
    }
  }

  public addCard(card: Card): Card[] {
    this.cards.push(card)
    return this.cards
  }

  public value(): number[] {
    let total = 0
    let aces = 0
    this.cards.forEach(card => {
      if (card.face === 'Ace') {
        aces += 1
        total += 11
      } else {
        total += card.getValue()
      }
    })
    if (aces === 0) {
      return [total]
    } else {
      return [total - aces * 10, total]
    }
  }
}
