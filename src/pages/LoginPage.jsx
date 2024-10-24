import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import { useState, useEffect } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { getInformation } from '../api/user';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated]);


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                setIsAuthenticated(true);
                const information = await getInformation();

                setUser({
                    _id: information._id,
                    email: information.email,
                    name: information.name,
                    avatar: information.avatar,
                })
                return navigate('/home');
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Đăng nhập không thành công');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                error={error}
                loading={loading}
            />
        </div>
    );
}

export default LoginPage;