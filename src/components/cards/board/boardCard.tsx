import React from 'react';
import styled from 'styled-components';
import {Card} from "../../../types/gameType.ts";
import {useDrop} from "react-dnd";
import socket from "../../../api/ws/socket.ts";
import BoardPropertyCards from "./properties/boardPropertyCards.tsx";

// Стили для карточек
const CardWrapper = styled.div`
  width: 50px;
  height: 75px;
  background-color: green;
  color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const BoardCard = ({card, position}: {card: Card, position: string}) => {
    const [, drop] = useDrop({
        accept: 'card',
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            // Обработка действия бросания карточки
            // console.log('Dropped card:', item, 'on card:', card);
            socket.emit('playerAction',
                {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: card.card, pass: false,
                    propertyCardId: item.card }
            )
        }
    });
    return (
        <CardWrapper ref={drop}>
            {card.card}
            {
                card.properties.length > 0
                ? <BoardPropertyCards position={position} properties={card.properties} />
                : null
            }
        </CardWrapper>
    );
};

export default BoardCard;