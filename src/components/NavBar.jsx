import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import Designer from '../assets/images/Designer.jpg';
import NotificationsDropdown from './NotificationsDropDown';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

const NavBar = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?._id) return;

        try {

            const notificationsRef = collection(db, "notifications");
            const q = query(notificationsRef, where("to", "==", user._id));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const notificationsData = [];
                querySnapshot.forEach((doc) => {
                    notificationsData.push({ id: doc.id, ...doc.data() });
                });

                setNotifications(notificationsData.sort((a, b) => b.timestamp - a.timestamp));
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Error getting notifications:", error);
        }
    }, [user]);

    return (
        <nav className="fixed top-0 z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <div className="flex ms-2 md:me-24 cursor-pointer" onClick={() => { navigate('/home') }}>
                            <img
                                src={Designer}
                                className="h-8 me-3 rounded-full"
                                alt="RemindWork Logo"
                            />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                RemindWork
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <NotificationsDropdown notifications={notifications} />
                        <UserMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
