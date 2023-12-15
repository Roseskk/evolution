
export interface IGame {
    id: string,
    deck: ICard[]
    players: []
}

export interface ICard {
    id: number,
    name: string
}