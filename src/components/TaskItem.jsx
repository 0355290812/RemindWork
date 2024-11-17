import React from 'react';
import { PiWarningOctagonLight } from "react-icons/pi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { TbCheckbox } from "react-icons/tb";
import { Link } from 'react-router-dom';

import formatDate from '../utils/formatDate';

const TaskItem = ({ task, role }) => {

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return { color: 'bg-red-400', label: 'Đang chờ' };
            case 'in-progress':
                return { color: 'bg-blue-400', label: 'Đang thực hiện' };
            case 'completed':
                return { color: 'bg-green-400', label: 'Đã hoàn thành' };
            case 'paused':
                return { color: 'bg-yellow-400', label: 'Tạm dừng' };
            case 'waiting-for-approval':
                return { color: 'bg-purple-400', label: 'Chờ phê duyệt' };
            default:
                return { color: 'bg-gray-400', label: 'Không xác định' };
        }
    };

    const calculateCompletionPercentage = (task) => {
        if (!task.assigness || task.assigness.length === 0) {
            return 0;
        }

        let totalSubTasks = 0;
        let completedSubTasks = 0;

        task.assigness.forEach(assign => {
            const subTasks = assign.subTasks;

            if (subTasks) {
                totalSubTasks += subTasks.length;
                completedSubTasks += subTasks.filter(subTask => subTask.completed).length;
            }
        });

        return totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;
    };

    const getDelayMessage = (endDate) => {
        const now = new Date();
        const differenceInMilliseconds = new Date(endDate) - now;

        if (differenceInMilliseconds < 0) {
            const differenceInDays = Math.floor(Math.abs(differenceInMilliseconds) / (1000 * 60 * 60 * 24));
            const differenceInMonths = Math.floor(differenceInDays / 30);

            if (differenceInDays < 30) {
                return `Trễ ${differenceInDays} ngày`;
            } else if (differenceInMonths < 12) {
                return `Trễ ${differenceInMonths} tháng`;
            } else {
                return `Trễ hơn 1 năm`;
            }
        }
        return null;
    };

    const status = getStatusClass(task.status);
    const completionPercentage = calculateCompletionPercentage(task);

    return (
        <Link
            to={`/private-works/${task._id}`}
            state={{
                role: role
            }}
            key={task._id}
            className="flex flex-row w-full space-x-5 rounded-md bg-base-200 hover:bg-base-300 p-3 bg-stone-100"
        >
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="w-12 mask mask-squircle" title={task.user.name}>
                        <img
                            alt={`by-${'avatar'}`}
                            loading="lazy"
                            width="50"
                            height="50"
                            className="bg-base-200 rounded-full"
                            src={task.user.avatar.includes('http') ? task.user.avatar : `http://localhost:3001/${task.user.avatar}`}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>

            <div className="grow w-full">
                <div className="flex flex-row space-x-1 justify-between">
                    <h2 className="font-bold mb-1 break-words">{task.title}</h2>
                </div>
                <div className="hidden md:flex flex-row space-x-2 items-center">
                    <div className="flex items-center">
                        <span
                            className={`${status.color} opacity-70 mr-1 w-2 h-2 rounded-full`}
                        ></span>
                        <span className="label-text text-xs opacity-70">{status.label}</span>
                    </div>
                    <span className="label-text text-xs opacity-70">Tạo lúc: {formatDate(task.createdAt)}</span>
                    {task.endDate < new Date().toISOString() && (task.status === "in-progress" || task.status === "pending" || task.status === "waiting-for-approval") && (
                        <div className='flex flex-row ml-1'>
                            <PiWarningOctagonLight color='red' />
                            <span className="label-text text-xs opacity-70 ml-0.5 text-red-600">Trễ</span>
                        </div>
                    )}
                </div>

                {task.assigness && task.assigness.length > 0 && (
                    task.assigness.map((assign) => (
                        assign.subTasks && assign.subTasks.length > 0 && (
                            <div className="hidden md:flex flex-row space-x-1 mt-2" key={assign._id}>
                                <div className="w-6">
                                    {assign.subTasks[0].completed ? (
                                        <TbCheckbox
                                            size={24}
                                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-green-700 group-hover:text-green-900 dark:group-hover:text-white"
                                        />
                                    ) : (
                                        <MdOutlineCheckBoxOutlineBlank
                                            size={24}
                                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white"
                                        />
                                    )}
                                </div>
                                <div className="xl:max-w-xl max-w-sm">
                                    <p className="label-text text-sm font-semibold break-words">
                                        {assign.subTasks[0].title}
                                    </p>
                                    <small className="opacity-50">bởi {assign.subTasks[0].toggleBy.name}</small>
                                </div>
                            </div>
                        )
                    ))
                )}


            </div>

            <div className="hidden md:flex flex-col w-32 my-auto">
                <div className="hidden lg:block">
                    <label className="label py-0">
                        <span className="label-text">Đạt </span>
                        <span className="label-text">{Math.trunc(completionPercentage)}%</span>
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>
                {task.endDate < new Date().toISOString() && (
                    <p className="hidden lg:block text-sm mt-2">{getDelayMessage(task.endDate)}</p>
                )}
            </div>
        </Link >
    );
};

export default TaskItem;
