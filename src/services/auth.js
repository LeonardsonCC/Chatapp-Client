import { sendUserSignIn } from './socket';
export const SESSION_KEY = 'session';
export const USERNAME_KEY = 'username';

export let userSession = sessionStorage.getItem(SESSION_KEY);
export let usernameSession = sessionStorage.getItem(USERNAME_KEY);

export const isAuthenticated = () => {
  userSession = sessionStorage.getItem(SESSION_KEY);

  if (userSession) {
    return true;
  }
  return false;
};

export const newAuthentication = username => {
  if (username.trim() === '') {
    throw Error('username inválido');
  }
  sendUserSignIn(username);
};


export const getUsername = () => {
  const username = usernameSession;

  if (username) {
    return username;
  }
  return "";
};

export const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
}
