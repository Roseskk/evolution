import React, {useEffect, useId, useState} from 'react';
import styled from 'styled-components';
import socket from "../../api/ws/socket.ts";
import {Container} from "../../styles/container.ts";
import Deck from "../cards/deck.tsx";
import {IGame} from "../../types/gameType.ts";
import Card from "../cards/card.tsx";

const Field = styled.div`
  position: relative;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: saddlebrown; // примерный цвет фона
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 80%; // Примерная ширина поля
  height: 600px; // Примерная высота поля
  
  p {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
`;

interface GameFieldProps {

}

const GameField: React.FC<GameFieldProps> = (props) => {
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState<number | null>(null)
    const [hand, setHand] = useState<number[] | null>(null)

    const playerId = localStorage.getItem('name')

    const [deck, setDeck] = useState(null)
    const [game, setGame] = useState<IGame | null>(null)
    useEffect(() => {
        socket.emit('gameStatus')

        socket.on('checkStatus',(data) => {
            console.log(data)
            setDeck(data.game.deck)

            const currentPlayerHand = data.game.players.find((p: { id: string | null; }) => p.id === localStorage.getItem('name'))?.hand;

            if (currentPlayerHand) {
                setHand(currentPlayerHand);
            }

            setCurrentPlayerTurn(data.game.players[data.currenPlayerIndex].id)
        })

        return () => {
            socket.off('checkStatus')
        }
    }, []);

    console.log(hand)

    return (
        <Container>
            <Field>
                <p>Игровое поле</p>
                {
                    !!deck
                    ? <Deck cards={deck} />
                    : null
                }
            </Field>
            {
                !!hand
                ? <Card hand={hand} />
                : null
            }
        </Container>
    );
};

export default GameField;
