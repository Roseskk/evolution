import React from 'react';
import styled from 'styled-components';
import Card from "./card.tsx";
import {CardsWrapper} from "../../styles/cards.ts";
import {ICard} from "../../types/gameType.ts";

export interface IPropsHand {
    hand: ICard[]
}



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

const Cards: React.FC<IPropsHand> = ({ hand }) => {
    return (
        <CardsWrapper>
            {hand.map((card) => {
                return (
                    <Card card={card} key={card.id} />
                );
            })}
        </CardsWrapper>
    );
};

export default Cards;