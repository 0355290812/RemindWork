import axios from 'axios';

const API_URL = 'http://localhost:3001';

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


const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

const validateResetToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auth/validate-reset-token?token=${token}`);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

const resetPassword = async (password, token) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password`, { password, token });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export { login, register, forgotPassword, validateResetToken, resetPassword };
