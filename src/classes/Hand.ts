import Card from './Card'

export default class Hand {
  private cards: Card[]
  public wager: number

  constructor() {
    this.cards = []
    this.wager = 0
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

  public getValue(hideDealerCard?: boolean): number[] {
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
    } else if (hideDealerCard) {
      return [this.cards[0].getValue()]
    }

    if (aces === 0) {
      return [total]
    } else if (aces > 0 && total > 21) {
      return [total - aces * 10]
    } else {
      return [total - aces * 10, total]
    }
  }

  // debug methods

  public setAce(): void {
    this.cards[0] = new Card('Ace', 'Spades')
  }

  public setSoft17(): void {
    this.cards[0] = new Card('Ace', 'Spades')
    this.cards[1] = new Card('Six', 'Spades')
  }

  public setBlackjack(): void {
    this.cards[0] = new Card('Ace', 'Spades')
    this.cards[1] = new Card('Jack', 'Spades')
  }
}
