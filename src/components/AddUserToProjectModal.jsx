import React, { useState } from 'react';
import { getUsers } from '../api/user';
import { MdClose } from 'react-icons/md';
import { addUsersToProject } from '../api/project';

const AddUserToTaskModal = ({ isOpen, onClose, project }) => {
    const [email, setEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const handleSearch = async (e) => {
        setEmail(e.target.value);

        if (e.target.value.length > 2) {
            try {
                const users = await getUsers(e.target.value);

                const filteredUsers = users.filter(user =>
                    !selectedUsers.some(selectedUser => selectedUser._id === user._id) &&
                    !project.members.some(member => member.user._id === user._id) // Lọc thành viên hiện tại của dự án
                );

                setSearchResults(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectUser = (user) => {
        if (!selectedUsers.some(selected => selected._id === user._id)) {
            setSelectedUsers([...selectedUsers, user]);
            setEmail('');
            setSearchResults([]);
        }
    };

    const removeSelectedUser = (userId) => {
        const updatedSelectedUsers = selectedUsers.filter(user => user._id !== userId);
        setSelectedUsers(updatedSelectedUsers);

        const fetchUsers = async () => {
            if (email.length > 2) {
                try {
                    const users = await getUsers(email);

                    const filteredUsers = users.filter(user =>
                        !updatedSelectedUsers.some(selectedUser => selectedUser._id === user._id) &&
                        !project.members.some(member => member._id === user._id)
                    );

                    setSearchResults(filteredUsers);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            } else {
                setSearchResults([]);
            }
        };

        fetchUsers();
    };

    const handleSubmit = () => {
        if (selectedUsers.length === 0) return;

        const userIds = selectedUsers.map(user => user._id);

        addUsersToProject(project._id, { userIds: userIds })
            .then(() => {
                onClose();
            })
            .catch(error => {
                console.error('Error adding users to project:', error);
            });
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Thêm người vào dự án</h2>

                <div className="flex flex-wrap space-x-2 mb-4 border border-gray-300 rounded-lg p-2 bg-white focus-within:border-blue-400 focus-within:shadow-outline">
                    {selectedUsers.length > 0 && selectedUsers.map(user => (
                        <div key={user._id} className="flex items-center bg-gray-200 rounded-md px-2 py-1 w-fit">
                            <span>{user.name}</span>
                            <MdClose
                                size={16}
                                className="ml-1 cursor-pointer"
                                onClick={() => removeSelectedUser(user._id)}
                            />
                        </div>
                    ))}

                    <input
                        type="text"
                        value={email}
                        onChange={handleSearch}
                        className="!ml-0 border-none shadow-none outline-none focus:ring-0 focus:!border-none focus:!shadow-none focus:!outline-none p-2 rounded w-full"
                    // placeholder="Nhập email của người dùng"
                    />
                </div>

                {searchResults.length > 0 ? (
                    <ul className="border border-gray-300 rounded mb-4">
                        {searchResults.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => handleSelectUser(user)}
                                className="p-2 cursor-pointer hover:bg-gray-100 flex flex-row"
                            >
                                <img src={user.avatar.includes('http') ? user.avatar : `http://localhost:3001/${user.avatar}`} alt={user.name} className='w-6 h-6 mr-4 rounded-full' />
                                {user.email}
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
                    <button onClick={handleSubmit} disabled={selectedUsers.length <= 0} className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                        Thêm người dùng
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default AddUserToTaskModal;
