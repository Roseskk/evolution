import React, {useEffect} from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

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
    const socket = io('http://192.168.1.69:3000');
    socket.emit('joinGame','1')
    useEffect(() => {
        socket.on('gameJoined', (gameData) => {
            console.log(gameData)
        });

        socket.on('gameJoinError', (error) => {
            console.log(error)
        });

        return () => {
            socket.off('gameJoined');
            socket.off('gameJoinError');
        };
    }, []);


    return (
        <Field>
            <p>Игровое поле</p>
        </Field>
    );
};

export default GameField;
