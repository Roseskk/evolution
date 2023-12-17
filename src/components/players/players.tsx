import React from 'react';
import {IPlayer} from "../../types/gameType.ts";
import Cards from "../cards/cards.tsx";

export interface IPlayerProps {
    players: IPlayer[]
}



const Players: React.FC<IPlayerProps> = ({players}) => {
    return (
        <ul>
            {
                players.map(player => (
                    <li>
                        <span>{player.id}</span>
                        <Cards hand={player.hand} />
                    </li>
                ))
            }
        </ul>
    );
};

export default Players;