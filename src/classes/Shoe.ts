import { SUITS, FACES } from '../lib/types'
import Card from './Card'

export default class Shoe {
  public decks: number
  public cards: Card[]
  public warning?: number

  constructor(decks: number) {
    this.cards = []
    this.decks = decks

    for (let i = 0; i < decks; i++) {
      SUITS.forEach(suit => {
        FACES.forEach(face => {
          this.cards.push(new Card(face, suit))
        })
      })
    }
  }

  public shuffle(): void {
    let shoe = this.cards
    let m = shoe.length
    let i

    while (m) {
      i = Math.floor(Math.random() * m--)
      ;[shoe[m], shoe[i]] = [shoe[i], shoe[m]]
    }

    this.cards = shoe
    this.warning = this.generateWarning()
  }

  private generateWarning(): number {
    const positive = Math.random() < 0.5
    const min = 0
    const max = 10
    const flutter = Math.floor(Math.random() * (max - min + 1)) + min
    if (positive) {
      return 52 + flutter
    } else {
      return 52 - flutter
    }
  }
}
