import React, { useState, useRef, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const SpeedDial = ({ role, onEdit, onRemove, onLeft, onAdd }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="fixed bottom-6 end-12 group" ref={dropdownRef}>
            <div
                id="speed-dial-menu-text-inside-button"
                className={`flex flex-col items-center ${isMenuOpen ? "flex" : "hidden"
                    } mb-4 space-y-2`}
            >
                <button
                    type="button"
                    onClick={onLeft}
                    className="w-12 h-12 text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    <IoIosLogOut className="w-4 h-4 mx-auto mb-1" />
                    <span className="block mb-px text-xs font-normal">Rời</span>
                </button>
                {role && role === 'admin' && <button
                    type="button"
                    onClick={onRemove}
                    className="w-12 h-12 text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    <MdOutlineDelete className="w-4 h-4 mx-auto mb-1" />
                    <span className="block mb-px text-xs font-normal">Xoá</span>
                </button>}
                {role && role === 'admin' && <button
                    type="button"
                    onClick={onEdit}
                    className="w-12 h-12 text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    <MdOutlineEdit className="w-4 h-4 mx-auto mb-1" />
                    <span className="block mb-px text-xs font-medium">Sửa</span>
                </button>}
                {role && role === 'admin' && <button
                    type="button"
                    onClick={onAdd}
                    className="w-12 h-12 text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    <IoPersonAddOutline className="w-4 h-4 mx-auto mb-1" />
                    <span className="block mb-px text-xs font-medium">Thêm</span>
                </button>}
            </div>
            <button
                type="button"
                onClick={toggleMenu}
                aria-controls="speed-dial-menu-text-inside-button"
                aria-expanded={isMenuOpen}
                className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full shadow-lg transition duration-300 hover:bg-blue-700"
            >
                <BsPlus
                    className={`w-8 h-8 transition-transform ${isMenuOpen ? "rotate-45" : ""
                        }`}
                />
                <span className="sr-only">Toggle Menu</span>
            </button>
        </div>
    );
};

export default SpeedDial;
