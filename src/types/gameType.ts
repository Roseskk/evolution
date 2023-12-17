
export interface IGame {
    id: string,
    deck: ICard[]
    players: []
}

export interface ICard {
    id: number,
    name: string
}


export interface IPlayer {
    food: number,
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
}
