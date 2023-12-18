import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from "../../api/ws/socket.ts";
import Cards from "../cards/cards.tsx";
import Deck from "../cards/deck.tsx";
import {Board, IPlayer} from "../../types/gameType.ts";
import {Container} from "../../styles/container.ts";
import { useDrop } from 'react-dnd';
import BoardLayout from "../cards/board/boardLayout.tsx";
import PlayerTurnInfo from "../players/playerTurnInfo.tsx";
import Button from "../buttons/button.tsx";

const Field = styled.div`
  // Ваши стили для Field
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: saddlebrown;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 80%;
  height: 600px;
`;



const GameField: React.FC = () => {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number | null>(null)
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState<string | null>(null);
    const [hand, setHand] = useState<number[] | null>(null);
    const [deck, setDeck] = useState(null);
    const [players, setPlayers] = useState<IPlayer[] | null>(null);
    const [board, setBoard] = useState<Board[] | null>(null)

    const playerId = localStorage.getItem('name') || '';

    useEffect(() => {
        socket.emit('gameStatus', {lobbyId: localStorage.getItem('lobby')});
        socket.on('checkStatus', (data) => {
            console.log(data)
            setDeck(data.game.deck);
            setPlayers(data.game.players);
            setCurrentPlayerTurn(data.game.players[data.game.currentPlayerIndex].id);
            setCurrentPlayerIndex(data.game.currentPlayerIndex)
        });
        socket.on('gameStateUpdate', (updatedGameStatus) => {
            console.log(updatedGameStatus)
            setPlayers(updatedGameStatus.players);
            setBoard(updatedGameStatus.board)
            setCurrentPlayerTurn(updatedGameStatus.players[updatedGameStatus.currentPlayerIndex].id);
            setCurrentPlayerIndex(updatedGameStatus.currentPlayerIndex)
        })

        return () => {
            socket.off('checkStatus');
            socket.off('gameStateUpdate');
        };
    }, []);

    useEffect(() => {
        if (players) {
            const currentPlayerHand = players.find(p => p.id === playerId)?.hand;
            if (currentPlayerHand) {
                setHand(currentPlayerHand);
            }
        }
    }, [players]);

    const [, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item, monitor) => {
            // логика обработки события бросания
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            // дропаем карточку тут
            socket.emit('playerAction',{lobbyId: localStorage.getItem('lobby'),playerId:socket.id ,cardId: item?.card!, pass: false })

            console.log('Dropped item', item);
        },
    }));


    return (
        <Container>
            {
                !!players
                ? <PlayerTurnInfo currentPlayerIndex={currentPlayerIndex!} currentPlayer={currentPlayerTurn!} playerId={playerId}/>
                : null
            }
            {
                <Button lobbyId={localStorage.getItem('lobby')!} action={'pass'} playerId={playerId} />
            }
            <Field ref={drop}>
                <p>Игровое поле</p>
                {deck && <Deck cards={deck} />}
                {board && <BoardLayout board={board}  currentPlayerId={playerId}/>}
            </Field>
            {hand && <Cards hand={hand} />}
        </Container>
    );
};

export default GameField;
