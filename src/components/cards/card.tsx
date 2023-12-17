import React from 'react';
import styled from 'styled-components';

export interface IPropsHand {
    hand: number[]
}

export const CardsWrapper = styled.ul`
    margin: 0;
  padding: 0;
  display: flex;
  gap: 2px;
  
  list-style: none;
`

export const CardWrapper = styled.li`
  min-width: 100px;
  min-height: 150px;
  
  background-color: wheat;
  border-radius: 5px;
  border: 1px solid black;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card: React.FC<IPropsHand> = ({hand}) => {
    return (
        <CardsWrapper>
            {
                hand.map(card => (
                    <CardWrapper>
                        <span>{card}</span>
                    </CardWrapper>
                ))
            }
        </CardsWrapper>
    );
};

export default Card;