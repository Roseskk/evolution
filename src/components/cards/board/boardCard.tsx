import React, {useRef} from 'react';
import styled from 'styled-components';
import {Card, ICard} from "../../../types/gameType.ts";
import {useDrag, useDrop} from "react-dnd";
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
  overflow: visible;
  
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    
    width: 5px;
    height: 5px;
    
    background-color: red;
    border-radius: 50%;
  }
`;

const BoardCard = ({card, position, playerId}: {card: Card, position: string, playerId: string}) => {
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: 'boardCard',
        item: { cardAttack: card.card, type: 'boardCard' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: ['card', 'food', 'boardCard'], // Принимаем элементы типа 'card' и 'food'
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) return;

            // Определение типа элемента и выполнение соответствующего действия
            if (item.type === 'card') {
                console.log(item)
                // Логика обработки для карточек
                socket.emit('playerAction', {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: card.card, pass: false,
                    propertyCardId: item.card
                });
            } else if (item.type === 'food') {
                console.log('еда')
                // Логика обработки для еды
                socket.emit('playerAction', {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: card.card,
                    pass: false,
                    foodTakes: 1
                });
            } else  if (item.type === 'boardCard') {
                console.log('card',item.cardAttack, 'attackedCard', card.card)
                if (item.cardAttack === card.card) {
                    return;
                }
                socket.emit('playerAction', {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: item.cardAttack,
                    cardAttack: card.card,
                    pass: false
                })
            }
        }
    });


    drag(drop(ref));

    return (
        <CardWrapper ref={ref}>
            <span className={`${playerId === localStorage.getItem('name')! ? playerId : ''}`} >{card.card}</span>
            {
                card.food !== 0
                ?  <ul>
                        {[...Array(card.food).keys()].map(f => (
                            <li key={f}></li>
                        ))}
                    </ul>
                : null
            }
            {
                card.properties.length > 0
                ? <BoardPropertyCards position={position} properties={card.properties} />
                : null
            }
        </CardWrapper>
    );
};

export default BoardCard;