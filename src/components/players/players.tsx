import React from 'react';
import {IPlayer} from "../../types/gameType.ts";
import Card from "../cards/card.tsx";

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
                        <Card hand={player.hand} />
                    </li>
                ))
            }
        </ul>
    );
};

export default Players;