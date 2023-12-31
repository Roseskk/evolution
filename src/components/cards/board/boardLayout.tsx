import React, {SetStateAction} from 'react';
import { Board } from "../../../types/gameType.ts";
import PlayerBoard from "./playerBoard.tsx";
import styled from 'styled-components';

const StyledPlayerBoardWrapper = styled.div`
  position: absolute;
  background: rgba(173, 211, 181, .34);
  //overflow-x: scroll;
  width: 100vw;
  display: flex;
  justify-content: center;
  &.top {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    
  }
  &.bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
  &.left { left: 0; top: 50%; transform: translateY(-50%); }
  &.right { right: 0; top: 50%; transform: translateY(-50%); }
`;

const StyledArrows = styled.div`
  position: absolute;
  width: 75%;
  font-size: 30px;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    border: solid white; // Цвет стрелок
    border-width: 0 3px 3px 0; // Форма стрелки
    padding: 10px; // Размер стрелки
    transform: translateY(-50%);
    animation: pulse 1s infinite alternate !important; // Анимация "пульсирования"
    
  }

  &:before {
    left: 0;
    transform:translateX(-20px)rotate(135deg) !important; // Стрелка влево
    
  }

  &:after {
    right: 0;
    transform: translateX(20px) rotate(-45deg) !important; // Стрелка вправо
    
  }

  &.top {
    top: 30px;
  }

  &.bottom {
    bottom: 55px;
  }

  &.left { left: 0; top: 50%; transform: translateY(-50%); }
  &.right { right: 0; top: 50%; transform: translateY(-50%); }

  @keyframes pulse {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
`;

// export const WrapperContainer = styled.div`
//   width: 100%;
//   padding: 0 20px;
//   overflow-x: scroll ;
//   height: 30%;
//   //background-color: red;
//   position: absolute;
//   &.top {
//     top: 0;
//     left: 50%;
//     transform: translateX(-50%);
//
//   }
//   &.bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
// `


const BoardLayout = ({ board, currentPlayerId, setterTrigger, actionTrigger  }: { board: Board[], currentPlayerId: string, setterTrigger: SetStateAction<any>, actionTrigger: null | any[] }) => {
    const getPosition = (playerId) => {
        if (playerId === currentPlayerId) return "bottom";

        const otherPlayers = board.filter(b => b.playerId !== currentPlayerId);
        const otherIndex = otherPlayers.findIndex(b => b.playerId === playerId);

        switch (otherIndex % 4) {
            case 0: return "top";
            case 1: return "left";
            case 2: return "right";
            case 3: return "bottom";
            default: return "undefined";
        }
    };


    return (
        <>
            {board.map((b, index) => (
                    // <StyledArrows key={index}  className={getPosition(b.playerId)}></StyledArrows>
                    <StyledPlayerBoardWrapper key={index} className={getPosition(b.playerId)}>
                        <PlayerBoard setterTrigger={setterTrigger} actionTrigger={actionTrigger} position={getPosition(b.playerId)} board={b} />
                    </StyledPlayerBoardWrapper>
            ))}
        </>
    );
};

export default BoardLayout;
