import Card from './Card'

export default class Hand {
  private cards: Card[]

  constructor() {
    this.cards = []
  }

  public showCards(hideDealerCard?: boolean): { cards: Card[] } {
    if (hideDealerCard) {
      return { cards: [this.cards[0]] }
    } else {
      return { cards: this.cards }
    }
  }

  public addCard(card: Card): Card[] {
    this.cards.push(card)
    return this.cards
  }

  public value(hideDealerCard?: boolean): number[] {
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

    if (hideDealerCard && this.cards[0].face == 'Ace') {
      return [1, 11]
    }

    if (aces === 0) {
      return [total]
    } else {
      return [total - aces * 10, total]
    }
  }

  // debug methods

  public setAce(): void {
    this.cards[0] = new Card('Ace', 'Spades')
  }
}
