import React, {SetStateAction} from 'react';
import BoardPropertyCard from "./boardPropertyCard.tsx";
import styled from "styled-components";

export const StyledBoardPropertyCards = styled.div`
  position: absolute;

  min-width: 100px;
  min-height: 120px;

  background-color: wheat;
  border-radius: 5px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: -1;
`


const BoardPropertyCards = ({properties, position, actionTrigger, setterTrigger} : {properties: Array<{id: number, name: string}>, position: string,  setterTrigger: SetStateAction<any>, actionTrigger: null | any[]}) => {
    return (
        <StyledBoardPropertyCards>
            {
                properties.map((p, index) => (
                    <BoardPropertyCard actionTrigger={actionTrigger} setterTrigger={setterTrigger} key={index} idx={index} position={position} property={p}/>
                ))
            }
        </StyledBoardPropertyCards>
    );
};

export default BoardPropertyCards;