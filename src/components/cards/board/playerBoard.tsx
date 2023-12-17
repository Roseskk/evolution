import React from 'react';
import { Board } from "../../../types/gameType.ts";
import styled from 'styled-components';

// Стили для карточек
const CardWrapper = styled.div`
  width: 75px;
  height: 150px;
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

const PlayerBoard = ({ board }: { board: Board }) => {
    return (
        <div style={{display: "flex"}}>
            {board.cards.map((card, index) => (
                <CardWrapper key={index}>
                    Card: {card.card}, Food: {card.food}
                </CardWrapper>
            ))}
        </div>
    );
};

export default PlayerBoard;
