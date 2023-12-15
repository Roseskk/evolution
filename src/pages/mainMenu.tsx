import React, {useState} from 'react';
import {Container} from "../styles/container.ts";
import {useNavigate} from "react-router-dom";
import socket from "../api/ws/socket.ts";

const MainMenu: React.FC = (props) => {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleName = (e: any) => {
        const {target} = e
        setName(target.value)
    }
    console.log(name)

    return(
        <Container>
            <h1>Main Menu</h1>
            <input onChange={handleName} value={name} />
            <button onClick={() => {
                navigate("/game/1")
                socket.emit('createGame',{gameId: '1'})
                localStorage.setItem('name',name)

            }}>Test game create</button>
            <button onClick={() => {
                navigate("/game/1")
                localStorage.setItem('name',name)

            }}>Test game join</button>
        </Container>
    )
}

export default MainMenu;