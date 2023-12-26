import React, {SetStateAction} from 'react';
import styled from "styled-components";
import socket from "../../../../api/ws/socket.ts";

const StyledBoardPropertyCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
  text-align: center;
  font-size: 10px;
  text-transform: uppercase;
  
  div {
    font-weight: bold;
  }
  
  
`;

const BoardPropertyCard = ({ property, position, idx, actionTrigger, setterTrigger, cardId }: { property: {id: number, name: string}, position: string, idx: number, setterTrigger: SetStateAction<any>, actionTrigger: any, cardId: number }) => {
    // Рассчитываем вертикальное смещение
    const verticalOffset = idx * 20;
    const zIndex = position === 'top' ? 1000 - idx : 1000 - idx;

    console.log(property, actionTrigger)
    // Определяем стиль для позиционирования карточки
    const cardStyle = {
        zIndex: zIndex,
        transform: `translateX(-50%) ${position === 'top' ? `translateY(${verticalOffset}px)` : `translateY(-${verticalOffset}px)`} ${position === 'top' ? 'rotate(180deg)' : ''}`,
        background: 'wheat',
        // Устанавливаем top или bottom в зависимости от позиции
        ...(position === 'top' ? { top: '50%' } : { bottom: '50%' }),
    };

    const attackedPropertyChoice = {
        zIndex: zIndex,
        transform: `translateX(-50%) scale(1.1) ${position === 'top' ? `translateY(${verticalOffset}px)` : `translateY(-${verticalOffset}px)`} ${position === 'top' ? 'rotate(180deg)' : ''}`,
        background: 'red',
        color: 'white',
        // Устанавливаем top или bottom в зависимости от позиции
        ...(position === 'top' ? { top: '50%' } : { bottom: '50%' }),
        // animation: 'bounce 1s infinite'
    };

    const isAttacked = actionTrigger && actionTrigger.some(p => p.propertyCardId === property.id);
    const currentStyle = isAttacked ? attackedPropertyChoice : cardStyle;

    const handleActionTrigger = () => {
        if (isAttacked) {
            socket.emit('actionResponse',{lobbyId: localStorage.getItem('lobby'),name:localStorage.getItem('name'),attackedCardId: cardId, actionType: actionTrigger.find( p => p.propertyCardId === property.id).type, cardId: property.id})
            setterTrigger(null)
        }
    }

    return (
        <StyledBoardPropertyCard onClick={handleActionTrigger} style={currentStyle} className={position}>
            <div style={{transform:'translateY(10px)', width: '100%', height: '100%'}}>{property.name}</div>
        </StyledBoardPropertyCard>
    );
};

export default BoardPropertyCard;
