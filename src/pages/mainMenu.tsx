import React, {useState} from 'react';
import {Container} from "../styles/container.ts";
import {useNavigate} from "react-router-dom";
import io from "socket.io-client";

const MainMenu: React.FC = (props) => {
    const navigate = useNavigate()
    const socket = io('http://192.168.1.69:3000');

    return(
        <Container>
            <h1>Main Menu</h1>
            <button onClick={() => {
                navigate("/game/1")
                socket.emit('createGame','1')

            }}>Test game create</button>
            <button onClick={() => {
                navigate("/game/1")

            }}>Test game join</button>
        </Container>
    )
}

export default MainMenu;