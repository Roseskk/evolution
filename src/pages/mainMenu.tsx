import React, {useEffect, useState} from 'react';
import {Container} from "../styles/container.ts";
import {useNavigate} from "react-router-dom";
import socket from "../api/ws/socket.ts";
import {DefaultButton} from "../styles/buttons.ts";
import {StyledInput} from "../styles/input.ts";

const MainMenu = () => {
    const navigate = useNavigate()
    const [lobbyName, setLobbyName] = useState('')

    useEffect(() => {
        socket.on('lobbyCreated', (data) => {
            console.log('Lobby Created with ID:', data.lobbyId);
            localStorage.setItem('lobby',data.lobbyId)
            navigate(`/lobby/${data.lobbyId}`)
        })

        return () => {
            socket.off('lobbyCreated')
        }
    }, []);

    // const handleName = (e: any) => {
    //     const {target} = e
    //     setName(target.value)
    // }
    // console.log(name)

    return(
        <Container>
            <h1>Main Menu</h1>
            {/*<label htmlFor={'name'}>Введите имя</label>*/}
            {/*<StyledInput id={'name'} onChange={handleName} value={name} />*/}
            <DefaultButton onClick={() => {
                socket.emit('createLobby')
                // socket.emit('createGame',{gameId: '1'})
                // localStorage.setItem('name',name)

            }}>
                Создать Лобби
            </DefaultButton>
            <StyledInput onChange={(e) => setLobbyName(e.target.value)} value={lobbyName} />
            <DefaultButton  onClick={() => {
                localStorage.setItem('lobby',lobbyName)
                navigate(`/lobby/${lobbyName}`)

            }}>
                Присоедениться к Лобби
            </DefaultButton>
        </Container>
    )
}

export default MainMenu;