import axios from "axios";

const API_URL = 'https://remindworkcloneapi.onrender.com';

const getProjects = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/projects`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getProject = async (projectId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/projects/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const createProject = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/api/projects`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const addUsersToProject = async (projectId, data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`${API_URL}/api/projects/${projectId}/members`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const updateRoleMember = async (projectId, memberId, data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`${API_URL}/api/projects/${projectId}/members/${memberId}/role`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const removeUserFromProject = async (projectId, memberId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/api/projects/${projectId}/members/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
}


export { getProjects, getProject, createProject, addUsersToProject, updateRoleMember, removeUserFromProject };