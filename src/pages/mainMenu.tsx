import React from 'react';
import {Container} from "../styles/container.ts";
import {useNavigate} from "react-router-dom";
import socket from "../api/ws/socket.ts";

const MainMenu: React.FC = (props) => {
    const navigate = useNavigate()

    return(
        <Container>
            <h1>Main Menu</h1>
            <button onClick={() => {
                navigate("/game/1")
                socket.emit('createGame',{gameId: '1'})

            }}>Test game create</button>
            <button onClick={() => {
                navigate("/game/1")

            }}>Test game join</button>
        </Container>
    )
}

export default MainMenu;