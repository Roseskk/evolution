import React from 'react';
import { Board } from "../../../types/gameType.ts";
import PlayerBoard from "./playerBoard.tsx";
import styled from 'styled-components';
import {useDrop} from "react-dnd";
import socket from "../../../api/ws/socket.ts";

const StyledPlayerBoardWrapper = styled.div`
  position: absolute;
  background: rgba(173, 211, 181, .34);
  width: 100%;
  display: flex;
  justify-content: center;
  &.top { top: 0; left: 50%; transform: translateX(-50%); }
  &.bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
  &.left { left: 0; top: 50%; transform: translateY(-50%); }
  &.right { right: 0; top: 50%; transform: translateY(-50%); }
`;

const BoardLayout = ({ board, currentPlayerId }: { board: Board[], currentPlayerId: string }) => {
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
                <StyledPlayerBoardWrapper key={index} className={getPosition(b.playerId)}>
                    <PlayerBoard position={getPosition(b.playerId)} board={b} />
                </StyledPlayerBoardWrapper>
            ))}
        </>
    );
};

export default BoardLayout;
