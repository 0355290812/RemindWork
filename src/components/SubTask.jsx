import React, { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { TbCheckbox } from "react-icons/tb";
import { MdOutlineCheckBox } from "react-icons/md";
import formatDate from "../utils/formatDate";

const SubTask = ({ subTask, onCompleted, onEdit, user, onDelete }) => {

    const [isCompleted, setIsCompleted] = useState(subTask.completed);
    const [expanded, setExpanded] = useState(false);

    const toggleCompletion = async () => {
        setIsCompleted(!isCompleted);
        await onCompleted(subTask._id);
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="flex flex-col items-start w-full mt-3">
            <div className="flex flex-row w-full">
                <div className="flex-none flex items-center ml-4 mr-2">
                    {isCompleted ? (
                        <MdOutlineCheckBox
                            className="text-blue-400 w-6 h-6 hover:scale-125"
                            onClick={toggleCompletion}
                        />
                    ) : (
                        <MdOutlineCheckBoxOutlineBlank
                            className="text-blue-400 w-6 h-6 hover:scale-125"
                            onClick={toggleCompletion}
                        />
                    )}
                </div>
                <div className="grow ">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center">
                            <span className="text-base font-bold">{subTask.title}</span>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className="flex flex-row">
                                <TbCheckbox className="text-gray-400 mr-1" />
                                <span className="text-xs">bởi {subTask.toggleBy.name}</span>
                            </div>
                            <span className="text-xs text-gray-300">Tạo lúc {formatDate(subTask.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-none items-center justify-center flex relative ml-2">
                    <PiDotsThreeOutlineVerticalLight
                        className="text-gray-500 cursor-pointer"
                        onClick={toggleExpanded}
                    />
                    {expanded && (
                        <div id="dropdownDots" className="absolute right-5 top-1 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                <li>
                                    <div
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => {
                                            toggleExpanded();
                                            onEdit(subTask)
                                        }}
                                    >Sửa</div>
                                </li>
                                <li>
                                    <div href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Đặt thời hạn</div>
                                </li>
                                <li>
                                    <div
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => {
                                            toggleExpanded();
                                            onDelete(subTask._id);
                                        }}
                                    >Xoá</div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubTask;
