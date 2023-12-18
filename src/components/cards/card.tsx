import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

export const CardWrapper = styled.li`
  min-width: 100px;
  min-height: 150px;

  background-color: wheat;
  border-radius: 5px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
`

const Card = ({card}: {card: number}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: { card },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <CardWrapper ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <span>{card}</span>
        </CardWrapper>
    );
};

export default Card;