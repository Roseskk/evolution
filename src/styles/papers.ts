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


export const FoodWrapper = styled.div`
  margin-top: 5px;
  background-color: gainsboro;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
  span {
    color: crimson;
    font-weight: bold;
    font-size: 20px;
    
    letter-spacing: 4px;
    text-transform: uppercase;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
    
    li {
      width: 20px;
      height: 20px;

      background-color: red;
      cursor: pointer;
    }
  }
  
`
