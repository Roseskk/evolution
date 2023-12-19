
export interface IGame {
    deck: ICard[]
    players: IPlayer[]
    food: number,
    phase: number,
    currentPlayerIndex: number,
    board: Board[]
}

export interface ICard {
    id: number,
    name: string
}


export interface IPlayer {
    id: string,
    hand: number[]
}


export interface Board {
    playerId: string
    cards: Card[]
}

export interface Card {
    card: number
    food: number
    properties: number[]
}
