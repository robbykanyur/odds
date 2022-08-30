import { Face, Suit } from '../lib/types'

export default class Card {
  public face: Face
  public suit: Suit

  constructor(face: Face, suit: Suit) {
    this.face = face
    this.suit = suit
  }

  public displayName(): string {
    return `${this.face} of ${this.suit}`
  }

  public getValue(): number {
    const cards = {
      Ace: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
      Six: 6,
      Seven: 7,
      Eight: 8,
      Nine: 9,
      Ten: 10,
      Jack: 10,
      Queen: 10,
      King: 10,
    }
    return cards[this.face]
  }
}
