import styled from 'styled-components';

export const ModalWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  width: 80%;
  height: 400px;
  
  overflow-x: scroll;
  
  color: black;
  
  background-color: aqua;
  border: 1px solid saddlebrown;
`