import io from 'socket.io-client';
//Home
const socket = io('http://192.168.1.69:3000');
//RJ-45
// const socket = io('http://172.16.1.66:3000');
//WIFI
// const socket = io('http://172.16.1.113:3000');
export default socket;
