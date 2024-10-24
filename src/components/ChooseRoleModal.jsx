import React, { useState, useEffect } from 'react';

const ChooseRoleModal = ({ isModalOpen, onClose, user, onSubmit, defaultRole }) => {
    const [selectedRole, setSelectedRole] = useState(defaultRole);

    useEffect(() => {
        setSelectedRole(defaultRole);
    }, [defaultRole]);

    const handleRoleSelect = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <div>
            {isModalOpen && (
                <div id="select-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50 flex">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phân quyền</h3>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Body của modal */}
                            <div className="p-4">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Hãy chọn quyền cho {user.name}</p>
                                <ul className="space-y-4 mb-4">
                                    <li>
                                        <input
                                            type="radio"
                                            id="role-1"
                                            name="role"
                                            value="admin"
                                            className="hidden peer"
                                            checked={selectedRole === 'admin'}
                                            onChange={handleRoleSelect}
                                        />
                                        <label
                                            htmlFor="role-1"
                                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                                        >
                                            <div className="block">
                                                <div className="text-lg font-semibold">Trưởng dự án</div>
                                                <div className="text-gray-500 dark:text-gray-400">Admin</div>
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="role-2"
                                            name="role"
                                            value="teamlead"
                                            className="hidden peer"
                                            checked={selectedRole === 'teamlead'}
                                            onChange={handleRoleSelect}
                                        />
                                        <label
                                            htmlFor="role-2"
                                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                                        >
                                            <div className="block">
                                                <div className="text-lg font-semibold">Trưởng nhóm</div>
                                                <div className="text-gray-500 dark:text-gray-400">Team Lead</div>
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="role-3"
                                            name="role"
                                            value="employee"
                                            className="hidden peer"
                                            checked={selectedRole === 'employee'}
                                            onChange={handleRoleSelect}
                                        />
                                        <label
                                            htmlFor="role-3"
                                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                                        >
                                            <div className="block">
                                                <div className="text-lg font-semibold">Nhân viên</div>
                                                <div className="text-gray-500 dark:text-gray-400">Employee</div>
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                                <button
                                    className="text-white w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {
                                        onSubmit(selectedRole);
                                        onClose();
                                    }}
                                >
                                    Phân quyền
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChooseRoleModal;
