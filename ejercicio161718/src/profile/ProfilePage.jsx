import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const ProfilePage = ({ user }) => {
    const history = useNavigate();

    const goBack = () => {
        history(-1);
    }

    return (
        <div>
            <h1>Tu perfil</h1>
            <button onClick={() => history('/tasks')}>
                Go to Tasks
            </button>
            <button onClick={goBack}>
                Go Back
            </button>
        </div>
    );
}

export default ProfilePage;
