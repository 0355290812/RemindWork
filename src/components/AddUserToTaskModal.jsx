import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/user';
import { MdClose } from 'react-icons/md';
import { _addUserToTask } from '../api/task';

const AddUserToTaskModal = ({ isOpen, onClose, project, task, onTaskChange }) => {
    const [email, setEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);

    useEffect(() => {
        const existingUserIds = task.assigness.map(user => user.user._id);
        const availableUsers = project.members.filter(user => !existingUserIds.includes(user.user._id));
        setSearchResults(availableUsers);
    }, [project, task]);

    const handleSearch = async (e) => {
        setEmail(e.target.value);

        if (e.target.value.length > 2) {
            try {
                const existingUserIds = task.assigness.map(user => user.user._id);
                const users = project.members.filter(user => !existingUserIds.includes(user.user._id));
                const filteredUsers = users.filter(user => {
                    return user.user.email.includes(e.target.value)
                });
                setSearchResults(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } else {
            const existingUserIds = task.assigness.map(user => user.user._id);
            const availableUsers = project.members.filter(user => !existingUserIds.includes(user.user._id));
            setSearchResults(availableUsers);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user.user);
    };


    const handleSubmit = () => {
        _addUserToTask(task._id, { userId: selectedUser._id })
            .then((updatedProject) => {
                onClose();
            })
            .catch((error) => {
                console.error('Error adding user to project:', error);
            }
            );

        task.assigness.push({
            user: selectedUser,
            subTasks: []
        })

        onTaskChange(task);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Thêm người thực hiện công việc</h2>

                <div className="flex flex-wrap space-x-2 mb-4 border border-gray-300 rounded-lg p-2 bg-white focus-within:border-blue-400 focus-within:shadow-outline">

                    <input
                        type="text"
                        value={email}
                        onChange={handleSearch}
                        className="!ml-0 border-none shadow-none outline-none focus:ring-0 focus:!border-none focus:!shadow-none focus:!outline-none p-2 rounded w-full"
                    // placeholder="Nhập email của người dùng"
                    />
                </div>

                {searchResults?.length > 0 ? (
                    <ul className="border border-gray-300 rounded mb-4">
                        {searchResults.map((user) => (
                            <li
                                key={user.user._id}
                                onClick={() => handleSelectUser(user)}
                                className={`p-2 cursor-pointer hover:bg-gray-100 flex flex-row ${selectedUser._id === user.user._id ? 'bg-blue-200' : ''}`}
                            >
                                <img src={user.user.avatar.includes('http') ? user.user.avatar : `http://localhost:3001/${user.user.avatar}`} alt={user.user.name} className='w-6 h-6 mr-4 rounded-full' />
                                {user.user.email} {console.log(user)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        {email.length > 2 && (
                            <div className="text-gray-500 text-sm mb-4">
                                Không tìm thấy người dùng nào
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-red-300 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-400">
                        Đóng
                    </button>
                    <button onClick={handleSubmit} disabled={selectedUser.length <= 0} className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                        Thêm người dùng
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default AddUserToTaskModal;
