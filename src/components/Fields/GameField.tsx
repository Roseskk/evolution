import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import socket from "../../api/ws/socket.ts";
import Cards from "../cards/cards.tsx";
import Deck from "../cards/deck.tsx";
import {Board, ICard, IPlayer} from "../../types/gameType.ts";
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
import FoodList from "../food/foodList.tsx";
import {toast} from "react-toastify";

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
    const [hand, setHand] = useState<ICard[] | null>(null);
    const [deck, setDeck] = useState(null);
    const [players, setPlayers] = useState<IPlayer[] | null>(null);
    const [board, setBoard] = useState<Board[] | []>([])
    const [food, setFood] = useState(0)
    const [actionTrigger, setActionTrigger] = useState(null)

    const playerId = localStorage.getItem('name') || '';

    // useWsEmit({action: 'gameStatus', args: {lobbyId: localStorage.getItem('lobby')}})
    // useCheckStatus({setDeck, setPlayers, setCurrentPlayerIndex, setCurrentPlayerTurn, setFood})
    // useUpdateStatus({setPlayers, setBoard, setCurrentPlayerTurn, setCurrentPlayerIndex, setFood})
    useEffect(() => {
        socket.emit('gameStatus', {lobbyId: localStorage.getItem('lobby')});
        socket.on('checkStatus', (data) => {
            console.log(data)
            setDeck(data.game.deck);
            setPlayers(data.game.players);
            setCurrentPlayerTurn(data.game.players[data.game.currentPlayerIndex].id);
            setCurrentPlayerIndex(data.game.currentPlayerIndex)
            setFood(data.game.food)
        });
        socket.on('gameStateUpdate', (updatedGameStatus) => {
            console.log(updatedGameStatus)
            setPlayers(updatedGameStatus.players);
            setBoard(updatedGameStatus.board)
            setCurrentPlayerTurn(updatedGameStatus.players[updatedGameStatus.currentPlayerIndex].id);
            setCurrentPlayerIndex(updatedGameStatus.currentPlayerIndex)
            setFood(updatedGameStatus.food)
        })

        socket.on('gameError', (message) => {
            toast.error(message.message)
        })

        socket.on('chooseAction',(message) => {
            setActionTrigger(message.data.options)
            console.log(message)
        })

        return () => {
            socket.off('checkStatus');
            socket.off('gameStateUpdate');
            socket.off('gameError');
            socket.off('chooseAction');
        };
    }, []);

    usePlayerHand(players, setHand)

    const [, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item: {card: any}, monitor) => {
            // логика обработки события бросания
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            console.log(item.card)

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
                {deck && <Deck cards={deck} />}
                {!!food && <FoodList food={food} />}
                {board && <BoardLayout setterTrigger={setActionTrigger} actionTrigger={actionTrigger} board={board}  currentPlayerId={playerId}/>}
            </Field>
            {hand && <Cards hand={hand} />}
        </Container>
    );
};

export default GameField;
