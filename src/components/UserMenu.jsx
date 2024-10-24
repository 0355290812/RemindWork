import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { user, setIsAuthenticated, setUser } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex items-center ms-3" ref={menuRef}>
            <button
                type="button"
                className="flex text-sm bg-blue-400 rounded-full"
                aria-expanded={isOpen}
                onClick={toggleMenu}
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-8 h-8 rounded-full"
                    src={user?.avatar || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                    alt="user photo"
                />
            </button>
            {isOpen && (
                <div
                    className="absolute top-8 right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                >
                    <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                            {user?.email}
                        </p>
                    </div>
                    <ul className="py-1">
                        <li>
                            <a
                                href="/home"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={signOut}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
