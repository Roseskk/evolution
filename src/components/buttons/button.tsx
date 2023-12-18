import React from 'react';
import {PassButton} from "../../styles/buttons.ts";
import socket from "../../api/ws/socket.ts";

const Button = ({playerId, action}: {playerId: string, action: any}) => {
    return (
        <>
            {
                action === 'pass'
                ?  <PassButton onClick={() => socket.emit('playerAction',{playerId: playerId,pass: true})}>
                        Пас
                    </PassButton>
                : null
            }
        </>
    );
};

export default Button;