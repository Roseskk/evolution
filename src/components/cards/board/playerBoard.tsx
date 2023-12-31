import React, {SetStateAction} from 'react';
import { Board } from "../../../types/gameType.ts";
import styled from 'styled-components';
import BoardCard from "./boardCard.tsx";

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
// id={localStorage.getItem('name')!}
const PlayerBoard = ({ board, position, setterTrigger, actionTrigger }: { board: Board, position: string, setterTrigger: SetStateAction<any>, actionTrigger: null | any[] }) => {
    return (
        <div style={{display: "flex", gap: '25px', overflow: 'visible'}}>
            {board.cards.map((card, index) => (
                <BoardCard setterTrigger={setterTrigger} actionTrigger={actionTrigger} playerId={board.playerId} position={position} key={card.id} card={card} />
            ))}
        </div>
    );
};

export default PlayerBoard;
