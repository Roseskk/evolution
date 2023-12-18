import styled from 'styled-components';

export const DefaultButton = styled.button`
  max-width: 300px;
  min-width: 200px;
  padding: 10px;
  border: 1px solid green;
  background: green;
  border-radius: 5px;
  
  color: wheat;
  text-transform: uppercase;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  
  cursor: pointer;
  
  box-shadow: 0 2px crimson;
  
  &:hover {
    color: black;
  }
`

export const PassButton = styled.button`
  position: absolute;
  top: 10px;
  right: 100px;
  width: 150px;
  height: 50px;
  padding: 10px;
  border: 1px solid green;
  background: green;
  border-radius: 5px;
  
  color: wheat;
  text-transform: uppercase;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  
  cursor: pointer;
  
  box-shadow: 0 2px blue;
  
  &:hover {
    color: saddlebrown;
  }
`


