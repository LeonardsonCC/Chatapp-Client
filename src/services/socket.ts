import socketIoClient from 'socket.io-client';

const host = 'localhost:3001';

export default socketIoClient(host) as SocketIOClient.Socket;