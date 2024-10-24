import axios from 'axios';

const API_URL = 'https://remindworkcloneapi.onrender.com';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export { login, register };
