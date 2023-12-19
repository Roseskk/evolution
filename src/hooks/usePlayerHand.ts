import React, {SetStateAction, useEffect} from 'react';
import {IPlayer} from "../types/gameType.ts";

const usePlayerHand = (players: IPlayer[] | null, setterFunc: SetStateAction<any>) => {
    const playerId = localStorage.getItem('name')
    useEffect(() => {
        if (players) {
            const currentPlayerHand = players.find(p => p.id === playerId)?.hand;
            if (currentPlayerHand) {
                setterFunc(currentPlayerHand);
            }
        }
    }, [players]);
};

export default usePlayerHand;