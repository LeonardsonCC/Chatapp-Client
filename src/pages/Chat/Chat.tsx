import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

interface IProps {
    changePage: (page: string) => void
}

const Chat: React.FC<IProps> = (props) => {
    const [session, setSession] = useState<string | null>();
    let element: JSX.Element = <div />;

    useEffect(() => {
        if (session === '') {
            setSession(sessionStorage.getItem('session'));
        }
    });

    if (session !== null &&
        session !== '') {
            console.log('rendered')
            element = (
                <h1>
                    Logado!
                </h1>
            );
        }
    else {
        element = (
            <Redirect to="/login" />
        )
    }

    return (
        <div>
            {element}
        </div>
    )
}

export default Chat;