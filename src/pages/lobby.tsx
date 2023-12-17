import React, {useEffect, useLayoutEffect, useState} from 'react';
import socket from "../api/ws/socket.ts";
import {Container} from "../styles/container.ts";
import {Subtitle} from "../styles/text.ts";

import styled from 'styled-components';
import {DefaultButton} from "../styles/buttons.ts";
import {useNavigate} from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  max-width: 600px;
  padding: 10px;
  border: 1px solid darkgray;
  border-radius: 5px;
  
  background-color: gainsboro;
  
  div {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 18px;
      color: white;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      span {
        color:blue;
        text-transform: uppercase;
      }
      
      .circle {
        width: 10px;
        background-color: green;
        height: 10px;
        border-radius: 50%;
      }
    }
  }
`

const Lobby = () => {
    const navigate = useNavigate()

    const [lobbyHost, setLobbyHost] = useState(false)
    const [readyUsers, setReadyUsers] = useState<string[] | null>(null)
    const [error, setError] = useState('')

    useLayoutEffect(() => {
        socket.emit('joinLobby',{lobbyId: localStorage.getItem('lobby')})
        localStorage.setItem('name',socket.id)
        socket.on('playerJoined', (args) => {
            if (args.host === args.joinedPlayerId) {
                setLobbyHost(true)
            }
            setReadyUsers(args.players)
        })

        socket.on('lobbyError', (err) => {
            setError(err)
        })

        socket.on('gameStarted', (game) => {
            navigate(`game`)
        })

        socket.on('startGameError', (err) => {
            console.log(err)
        })

        return () => {
            socket.off('playerJoined')
            socket.off('lobbyError')
            socket.off('startGameError')
        }
    }, []);

    const handleStartLobby = () => {
        socket.emit('startGameFromLobby',{lobbyId: localStorage.getItem('lobby')})
    }

    return (
        <Container>
            <Subtitle><span>ID Лобби:</span> <strong>{localStorage.getItem('lobby')}</strong></Subtitle>
            {
                lobbyHost
                ? <DefaultButton onClick={handleStartLobby}>Начать игру</DefaultButton>
                : null
            }
            <Wrapper>
                {
                    !!error
                    ? <Subtitle style={{background: 'red'}}>Лобби не существует!</Subtitle>
                    : <>
                            <div>
                                <span>Игроки</span>
                                <span>Статус</span>
                            </div>
                            <ul>
                                {
                                    !!readyUsers
                                        ? readyUsers.map(user => (
                                            <li>
                                                <span>{user.slice(0,5)}...</span>
                                                <span className={'circle'}></span>
                                            </li>
                                        ))
                                        : null
                                }
                                <li></li>
                            </ul>
                        </>
                }
            </Wrapper>
        </Container>
    );
};

export default Lobby;