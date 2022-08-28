const FACES = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King',
] as const
const SUITS = ['Clubs', 'Spades', 'Hearts', 'Diamonds'] as const

type Face = typeof FACES[number]
type Suit = typeof SUITS[number]
class Card {
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

type Seat = 'Player' | 'Dealer'
class Hand {
  private cards: Card[]
  public seat: Seat

  constructor(seat: Seat) {
    this.cards = []
    this.seat = seat
  }

  public showCards(): { total: number[]; cards: Card[] } {
    if (this.seat == 'Player') {
      return { total: this.calculateTotal(this.cards), cards: this.cards }
    } else {
      return { total: this.calculateTotal([this.cards[0]]), cards: [this.cards[0]] }
    }
  }

  public addCard(card: Card): Card[] {
    this.cards.push(card)
    return this.cards
  }

  private calculateTotal(cards: Card[]): number[] {
    let total = 0
    let aces = 0
    cards.forEach(card => {
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

class Shoe {
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

function dealHand(shoe: Shoe, playerHand: Hand, dealerHand: Hand): void {
  for (let i = 0; i < 2; i++) {
    playerHand.addCard(shoe.cards.pop()!)
    dealerHand.addCard(shoe.cards.pop()!)
  }
}

function startGame(decks: number): { shoe: Shoe; hands: Hand[] } {
  const shoe = new Shoe(decks)
  const playerHand = new Hand('Player')
  const dealerHand = new Hand('Dealer')
  shoe.shuffle()
  dealHand(shoe, playerHand, dealerHand)
  return { shoe: shoe, hands: [playerHand, dealerHand] }
}

const game = startGame(4)
console.log(JSON.stringify(game.hands))
