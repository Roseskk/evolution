import {useEffect} from 'react';
import socket from "../api/ws/socket.ts";
import {IGame} from "../types/gameType.ts";

const useCheckStatus = (setters: any) => {
    useEffect(() => {
        const handleCheckStatus = (data: {game: IGame}) => {
            setters.setDeck(data.game.deck);
            setters.setPlayers(data.game.players);
            setters.setCurrentPlayerTurn(data.game.players[data.game.currentPlayerIndex].id);
            setters.setCurrentPlayerIndex(data.game.currentPlayerIndex);
        };

        socket.on('checkStatus', handleCheckStatus);

        return () => {
            socket.off('checkStatus', handleCheckStatus);
        };
    }, [setters]);
};

export default useCheckStatus;