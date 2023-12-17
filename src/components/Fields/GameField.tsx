import React, {useEffect, useId, useState} from 'react';
import styled from 'styled-components';
import socket from "../../api/ws/socket.ts";
import {Container} from "../../styles/container.ts";
import Deck from "../cards/deck.tsx";
import {IGame} from "../../types/gameType.ts";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea; // примерный цвет фона
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 80%; // Примерная ширина поля
  height: 600px; // Примерная высота поля
`;

interface GameFieldProps {

}

const GameField: React.FC<GameFieldProps> = (props) => {
    const [connect, setConnect] = useState(false)

    const gameId = '1'
    const playerId = localStorage.getItem('name')

    const [game, setGame] = useState<IGame | null>(null)



    return (
        <Container>
            <Field>
                <p>Игровое поле</p>
                {
                    !!game
                    ? <Deck cards={game!.deck} />
                    : null
                }
            </Field>
        </Container>
    );
};

export default GameField;
