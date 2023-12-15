import React from 'react';
import styled from "styled-components";

export const DeckCard = styled.div`
  width: 100px;
  height: 150px;
  border: 1px solid black;
  border-radius: 12px;
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  
  background: black;
  color: wheat;
  
  span {
    text-align: center;
  }
`


const Deck = ({cards}: {cards: {id: number, name: string}[]}) => {
    return (
        <div>
            <DeckCard>
                <span>Количество</span>
                <span>{cards.length}</span>
            </DeckCard>
        </div>
    );
};

export default Deck;