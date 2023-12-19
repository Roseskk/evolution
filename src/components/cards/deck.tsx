import React from 'react';
import styled from "styled-components";

export const DeckCard = styled.div`
  width: 50px;
  height: 75px;
  border: 1px solid black;
  border-radius: 12px;
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  
  background: green;
  color: wheat;
  
  span {
    text-align: center;
  }
`


const Deck = ({cards}: {cards: []}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <span style={{color: 'wheat', fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase'}}>Колода</span>
            <DeckCard>
                <span>{cards.length}</span>
            </DeckCard>
        </div>
    );
};

export default Deck;