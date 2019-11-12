import { sendUserSignIn } from './socket';
export const SESSION_KEY = 'session';

export let userSession = sessionStorage.getItem(SESSION_KEY);

export const isAuthenticated = () => {
    userSession = sessionStorage.getItem(SESSION_KEY);

    if (userSession) {
        return true;
    }
    return false;
}

export const newAuthentication = (username: string): void => {
    if (username.trim() === '') {
        throw Error('username inválido');
    }
    sendUserSignIn(username);
}