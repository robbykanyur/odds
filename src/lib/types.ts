import Shoe from 'src/classes/Shoe'
import Hand from 'src/classes/Hand'
import Bank from 'src/classes/Bank'

export const FACES = [
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

export const SUITS = ['Clubs', 'Spades', 'Hearts', 'Diamonds'] as const

export type Face = typeof FACES[number]
export type Suit = typeof SUITS[number]
export type Seat = 'Player' | 'Dealer'
export type Game = { shoe: Shoe; playerHand: Hand; dealerHand: Hand; bank: Bank }
export type Result = 'Win' | 'Loss' | 'Push'
