import React, {useEffect, useState} from 'react';
import {PlayerTurn} from "../../styles/papers.ts";

const PlayerTurnInfo = ({playerId, currentPlayer, currentPlayerIndex}: {playerId: string, currentPlayer:string, currentPlayerIndex: number}) => {
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    useEffect(() => {
        if (currentPlayer === playerId) {
            setIsPlayerTurn(true)
        } else {
            setIsPlayerTurn(false)
        }
        console.log('RERENDASDASDKLJASLDK',currentPlayerIndex)
    }, [currentPlayerIndex]);
    return (
        <PlayerTurn>
            {
                isPlayerTurn
                ? <span style={{color: "blue"}}>Ваш ход</span>
                : <span>Ходит игрок: {currentPlayer.slice(0,4)}...</span>
            }
        </PlayerTurn>
    );
};

export default PlayerTurnInfo;