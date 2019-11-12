import socketIoClient from 'socket.io-client';

const host = 'localhost:3001';

const socket = socketIoClient(host);

export const subscribeToUserSignIn = (cb) => {
    socket.on('register username result', (session) => {
        if (session) {
            cb(session);
        }
    });
}

export const subscribeToNewMessage = (cb) => {
    socket.on('new message', (message_obj) => {
        cb(message_obj);
    });
}

export const sendMySession = (session) => {
    socket.emit('register by token', session);
}

export const sendUserSignIn = (username) => {
    socket.emit('register username', username);
}

export const sendNewMessage = (message) => {
    socket.emit('send new message', message);
}

export default socket;