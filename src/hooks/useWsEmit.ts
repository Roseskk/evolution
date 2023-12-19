import { useEffect } from 'react';
import socket from "../api/ws/socket.ts";

export interface IWsEmit {
    action: string;
    args: IWsArgs;
}

export interface IWsArgs {
    [key: string]: string | number | null;
}

const useWsEmit = ({ action, args }: IWsEmit) => {
    useEffect(() => {
        if (args) {
            socket.emit(action, args);
        }
    }, [action, args]);
};

export default useWsEmit;
