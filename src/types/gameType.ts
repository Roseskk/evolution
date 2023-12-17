
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
