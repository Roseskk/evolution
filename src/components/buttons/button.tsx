import React from 'react';
import {PassButton} from "../../styles/buttons.ts";
import socket from "../../api/ws/socket.ts";

const Button = ({playerId, action, lobbyId}: {playerId: string, action: any, lobbyId: string}) => {
    return (
        <>
            {
                action === 'pass'
                ?  <PassButton onClick={() => socket.emit('playerAction',{lobbyId:lobbyId,playerId: playerId,pass: true})}>
                        Пас
                    </PassButton>
                : null
            }
        </>
    );
};

export default Button;