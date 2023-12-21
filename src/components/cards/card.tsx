import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import {ICard} from "../../types/gameType.ts";

export const CardWrapper = styled.li`
  width: 150px;
  
  min-height: 200px;

  background-color: wheat;
  border-radius: 5px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  
  overflow: hidden;
  
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  
`

const Card = ({card}: {card: ICard}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: {type: 'card', card:card.id},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <CardWrapper ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <span>{card.name}</span>
        </CardWrapper>
    );
};

export default Card;