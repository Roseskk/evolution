import styled from 'styled-components';

export const PlayerTurn = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 200px;
  min-height: 50px;
  overflow-y: scroll;
  background-color: green;
  border: 1px solid black;
  border-radius: 5px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    text-transform: uppercase;
    color: wheat;
  }
`
