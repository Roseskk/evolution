import {useEffect} from 'react';
import socket from "../api/ws/socket.ts";
import {IGame} from "../types/gameType.ts";

const useUpdateStatus = (setters: any) => {
    useEffect(() => {
        const handleUpdateData = (data: IGame) => {
            console.log(data)
            setters.setPlayers(data.players);
            setters.setBoard(data.board)
            setters.setCurrentPlayerTurn(data.players[data.currentPlayerIndex].id);
            setters.setCurrentPlayerIndex(data.currentPlayerIndex)
        }

        socket.on('gameStateUpdate', handleUpdateData)

        return () => {
            socket.off('gameStateUpdate')
        }
    }, [setters]);
};

export default useUpdateStatus;