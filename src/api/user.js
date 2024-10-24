import axios from "axios";

const API_URL = "https://remindworkcloneapi.onrender.com";

export const getInformation = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/users/information`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const changePassword = async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/api/users/change-password`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const changeInformation = async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/api/users/change-information`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getUsers = async (email) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            email
        }
    });
    return response.data;
}

