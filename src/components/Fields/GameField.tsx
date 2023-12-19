import React, { useState } from 'react';
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
import {findInsertBeforeCard} from "../../utils/cards.ts";
import useWsEmit from "../../hooks/useWsEmit.ts";
import useCheckStatus from "../../hooks/useCheckStatus.ts";
import useUpdateStatus from "../../hooks/useUpdateStatus.ts";
import usePlayerHand from "../../hooks/usePlayerHand.ts";

const Field = styled.div`
  // Ваши стили для Field
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: saddlebrown;
  border: 1px solid #ccc;
  padding: 0 20px;
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
    const [board, setBoard] = useState<Board[] | []>([])

    const playerId = localStorage.getItem('name') || '';

    useWsEmit({action: 'gameStatus', args: {lobbyId: localStorage.getItem('lobby')}})
    useCheckStatus({setDeck, setPlayers, setCurrentPlayerIndex, setCurrentPlayerTurn})
    useUpdateStatus({setPlayers, setBoard, setCurrentPlayerTurn, setCurrentPlayerIndex})
    usePlayerHand(players, setHand)

    const [, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item: {card: any}, monitor) => {
            // логика обработки события бросания
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            const clientOffset = monitor.getClientOffset()

            if (!clientOffset)return;

            const arrayOfBoard = document.querySelectorAll(`.${playerId}`)
            if (arrayOfBoard.length > 0) {
                const clientOffset = monitor.getClientOffset();

                const cardsInfo = Array.from(arrayOfBoard).map(card => {
                    const rect = card.getBoundingClientRect();
                    return {
                        element: card.textContent,
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY,
                    };
                });
                const cardInsertBefore = findInsertBeforeCard(clientOffset,cardsInfo)
                 if (!!cardInsertBefore) {
                     socket.emit('playerAction',{lobbyId: localStorage.getItem('lobby'),playerId:socket.id ,cardId: item?.card!, prevToCard: Number(cardInsertBefore), pass: false })
                 } else {
                     socket.emit('playerAction',{lobbyId: localStorage.getItem('lobby'),playerId:socket.id ,cardId: item?.card!, pass: false })
                 }

            } else {
                socket.emit('playerAction',{lobbyId: localStorage.getItem('lobby'),playerId:socket.id ,cardId: item?.card!, pass: false })
            }
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
