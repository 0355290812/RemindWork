import React, { useEffect } from 'react';

const ToastNotification = ({ title, message, userName, userImage, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div id="toast-notification" className="fixed bottom-5 left-5 z-50 w-full max-w-xs p-4 text-gray-900 bg-gray-100 rounded-lg shadow-xl border-blue-200 dark:bg-gray-800 dark:text-gray-300" role="alert">
            <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-semibold text-black dark:text-white">Thông báo mới</span>
                <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-gray-100 justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center">
                <div className="relative inline-block shrink-0">
                    <img className="w-12 h-12 rounded-full" src={userImage.includes('http') ? userImage : `http://localhost:3001/${userImage}`} alt={`${title} image`} />
                </div>
                <div className="ms-3 text-sm font-normal">
                    <div className="text-sm font-semibold text-black dark:text-white">{title}</div>
                    <div className="text-sm font-normal text-black">{message}</div>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-500">vài giây trước</span>
                </div>
            </div>
        </div>
    );
};

export default ToastNotification;
