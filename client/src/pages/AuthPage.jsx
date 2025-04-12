import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authform from '../components/AuthForm';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = ({ setIsLoggedIn }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20">
            <Authform setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
};

export default AuthPage;
