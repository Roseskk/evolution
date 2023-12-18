import React from 'react';
import BoardPropertyCard from "./boardPropertyCard.tsx";
import styled from "styled-components";

export const StyledBoardPropertyCards = styled.div`
  position: absolute;

  min-width: 50px;
  min-height: 75px;

  background-color: wheat;
  border-radius: 5px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: -1;
`


const BoardPropertyCards = ({properties, position} : {properties: number[], position: string}) => {
    return (
        <StyledBoardPropertyCards>
            {
                properties.map((p, index) => (
                    <BoardPropertyCard key={p} idx={index} position={position} property={p}/>
                ))
            }
        </StyledBoardPropertyCards>
    );
};

export default BoardPropertyCards;