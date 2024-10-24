import React, { useState } from 'react';

const DropdownStatus = ({ selectedStatus, setSelectedStatus }) => {
    const [isOpen, setIsOpen] = useState(false);

    const statuses = [
        { title: 'Tất cả', value: '' },
        { title: 'Đang chờ', value: 'pending' },
        { title: 'Đang thực hiện', value: 'in-progress' },
        { title: 'Hoàn thành', value: 'completed' },
        { title: 'Đang chờ duyệt', value: 'waiting-for-approval' },
        { title: 'Tạm dừng', value: 'paused' },
    ];

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-400 dark:hover:bg-blue-500"
            >
                {selectedStatus ? selectedStatus.title : 'Tất cả'}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-lg shadow-lg">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {statuses.map((status, index) => (
                            <li key={index}>
                                <div
                                    onClick={() => handleStatusChange(status)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {status.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownStatus;
