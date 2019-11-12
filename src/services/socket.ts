import socketIoClient from 'socket.io-client';

const host = 'localhost:3001';

const socket = socketIoClient(host);

interface Messages {
    user_id: number
    message_id: number,
    message: string,
    username: string
}

export const subscribeToUserSignIn = (cb: Function) => {
    socket.on('register username result', (session: string) => {
        if (session) {
            cb(session);
        }
    });
}

export const subscribeToNewMessage = (cb: Function) => {
    socket.on('new message', (message_obj:Messages) => {
        cb(message_obj);
    });
}

export const sendMySession = (session:string) => {
    socket.emit('register by token', session);
}

export const sendUserSignIn = (username: string) => {
    socket.emit('register username', username);
}

export const sendNewMessage = (message: string) => {
    socket.emit('send new message', message);
}

export default socket as SocketIOClient.Socket;