import React from 'react';

interface IProps {
    changePage: (page: string) => void
}

const Chat: React.FC<IProps> = (props) => {
    const session = sessionStorage.getItem('session');
    if (session !== undefined && 
        session !== '') {
        console.log('Bem-vindo a sala de chat!');
    }
    else {
        console.log('OPS!')
    }

    return (
        <div>
            Teste
        </div>
    )
}

export default Chat;