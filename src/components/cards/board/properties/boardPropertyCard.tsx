import React from 'react';
import styled from "styled-components";

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

const BoardPropertyCard = ({ property, position, idx }: { property: string, position: string, idx: number }) => {
    // Рассчитываем вертикальное смещение
    const verticalOffset = idx * 20;
    const zIndex = position === 'top' ? 1000 - idx : 1000 - idx;

    // Определяем стиль для позиционирования карточки
    const cardStyle = {
        zIndex: zIndex,
        transform: `translateX(-50%) ${position === 'top' ? `translateY(${verticalOffset}px)` : `translateY(-${verticalOffset}px)`} ${position === 'top' ? 'rotate(180deg)' : ''}`,
        background: 'wheat',
        // Устанавливаем top или bottom в зависимости от позиции
        ...(position === 'top' ? { top: '50%' } : { bottom: '50%' }),
    };

    return (
        <StyledBoardPropertyCard style={cardStyle} className={position}>
            <div style={{transform:'translateY(10px)', width: '100%', height: '100%'}}>{property}</div>
        </StyledBoardPropertyCard>
    );
};

export default BoardPropertyCard;
