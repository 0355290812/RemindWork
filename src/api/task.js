import axios from "axios";

const API_URL = 'http://localhost:3001';

const getTasks = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const getTask = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const addSubTask = async (taskId, assigneeId, data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/api/tasks/${taskId}/assignees/${assigneeId}/subtasks`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const completedSubTask = async (taskId, assigneeId, subTaskId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.patch(`${API_URL}/api/tasks/${taskId}/assignees/${assigneeId}/subtasks/${subTaskId}/toggle`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const getTasksFromProject = async (projectId, params) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/projects/${projectId}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const updateInfSubTask = async (taskId, assigneeId, subTaskId, data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.patch(`${API_URL}/api/tasks/${taskId}/assignees/${assigneeId}/subtasks/${subTaskId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _deleteSubTask = async (taskId, assigneeId, subTaskId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}/assignees/${assigneeId}/subtasks/${subTaskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _removeMemberFromTask = async (taskId, assigneeId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}/assignees/${assigneeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _addCommentToTask = async (taskId, data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/api/tasks/${taskId}/comments`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _deleteCommentFromTask = async (taskId, commentId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _addTask = async (data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/api/tasks`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _updateStatusTask = async (taskId, data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.patch(`${API_URL}/api/tasks/${taskId}/status`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _updateTask = async (taskId, data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _deleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _markIsImportant = async (taskId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.patch(`${API_URL}/api/tasks/${taskId}/important`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _addUserToTask = async (taskId, data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/api/tasks/${taskId}/assignees`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _uploadFiles = async (taskId, data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/api/tasks/${taskId}/files`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const _deleteFile = async (taskId, fileId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/api/tasks/${taskId}/files/${fileId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export {
    getTasks,
    getTask,
    addSubTask,
    completedSubTask,
    getTasksFromProject,
    updateInfSubTask,
    _deleteSubTask,
    _removeMemberFromTask,
    _addCommentToTask,
    _deleteCommentFromTask,
    _addTask,
    _updateStatusTask,
    _updateTask,
    _deleteTask,
    _markIsImportant,
    _addUserToTask,
    _uploadFiles,
    _deleteFile
};