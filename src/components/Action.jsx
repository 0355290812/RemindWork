import React, { useState } from "react";

const Action = ({ onChangeRole, onDelete }) => {

    const handleDelete = () => {
        onDelete();
    }

    const handleChangeRole = () => {
        onChangeRole();
    }

    return (
        <div id="dropdown" className="">
            <ul className="flex flex-row text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li onClick={handleChangeRole} className="cursor-pointer">
                    <div className="block mr-4 px-2 py-2 hover:bg-blue-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white rounded-lg">Phân quyền</div>
                </li>
                <li onClick={handleDelete} className="cursor-pointer">
                    <div className="block py-2 px-2 hover:bg-red-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white rounded-lg">Xoá</div>
                </li>
            </ul>
        </div>
    );

}

export default Action;