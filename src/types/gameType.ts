
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
    name: string,
    description: string,
    needFood: number,
    needFoodAsProperty: number,
    food: number,
    isAnimal: boolean
    properties: string[]
}


export interface IPlayer {
    id: string,
    hand: number[]
}


export interface Board {
    playerId: string
    cards: ICard[]
}

export interface Card {
    card: number
    food: number
    properties: number[]
}
