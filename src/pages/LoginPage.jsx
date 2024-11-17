import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import { useState, useEffect } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { getInformation } from '../api/user';
import { updateDeviceToken } from '../api/user';
import { getToken } from "firebase/messaging";
import { messaging } from '../services/firebase';

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
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        getToken(messaging, {
                            vapidKey: "BOXJkAGA464w2OBoYtO-7JIyN9m1GmT_weNzUKkeTVGTxn-vyUESTh-wG_2wRkO8i6zs7J1qAXjm_dqBIyn3Dk8"
                        }).then((currentToken) => {
                            if (currentToken) {
                                console.log('Token:', currentToken);
                                if (localStorage.getItem('token')) {
                                    updateDeviceToken(currentToken);
                                }
                            } else {
                                console.log('No registration token available. Request permission to generate one.');
                            }
                        }).catch((err) => {
                            console.log('An error occurred while retrieving token. ', err);
                        });
                    } else {
                        console.log('Unable to get permission to notify.');
                    }
                });
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