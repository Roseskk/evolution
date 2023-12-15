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

    useEffect(() => {
        if (connect) {
            console.log(socket)
            socket.on('joinSuccess', (data) => {
                // Обработка данных о присоединении к игре
                // console.log('Присоединились к игре:', data);
                socket.emit('joinGame',{gameId: gameId, playerId: socket.id})

                socket.on('gameJoined',(game) => {
                    console.log(game)
                })
            });

            socket.on('startGame', (gameData) => {
                // Обработка начала игры
                setGame(gameData);
                console.log('Игра началась:', gameData);
            });

            socket.on('waitingForPlayers', () => {
                // Обработка ожидания других игроков
                console.log('Ожидаем остальных игроков...');
            });
        } else {
            socket.emit('lobbyConnect',{gameId, playerId: socket.id})

        }


        return () => {
            socket.off('joinGame');
            socket.off('startGame');
            socket.off('waitingForPlayers');
        };
    },[connect])
    useEffect(() => {

    }, []);


    return (
        <Container>
            <button onClick={() => {
                socket.emit('lobbyReady',{gameId, playerId: socket.id})
                setConnect(true)
            }}>ГОТОВ</button>
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
