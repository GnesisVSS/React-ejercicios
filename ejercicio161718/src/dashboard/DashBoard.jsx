import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';



const DashboardPage = () => {
    const history = useNavigate();

    const logout = () => {
        history('/tasks');
    }
    return (
        <div>
            <Button variant="contained" onClick={logout}>Revisa tus tareas</Button>
        </div>
    );
}

export default DashboardPage;
