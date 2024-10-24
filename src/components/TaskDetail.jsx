import React, { useEffect } from 'react';
import formatDate from '../utils/formatDate';
import Assigne from './Assigne';
import { _removeMemberFromTask } from '../api/task';
import { IoFlashOutline, IoFlashSharp } from "react-icons/io5";
import { _markIsImportant } from '../api/task';
import { IoPersonAddOutline } from "react-icons/io5";

const TaskDetail = ({ task, onTaskChange, onOpenAddMemberToTaskModal }) => {
    console.log("🚀 ~ TaskDetail ~ task:", task)

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
                return { color: 'bg-gray-500', label: 'Không xác định' };
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

    const onSubTaskChange = (subTask, assigneId) => {
        const assigneIndex = task.assigness.findIndex(assigne => assigne.user._id === assigneId);

        if (assigneIndex !== -1) {
            const subTaskIndex = task.assigness[assigneIndex].subTasks.findIndex(st => st._id === subTask._id);

            if (subTaskIndex !== -1) {
                task.assigness[assigneIndex].subTasks[subTaskIndex] = subTask;
                onTaskChange(task);
            } else {
                task.assigness[assigneIndex].subTasks.push(subTask);
                onTaskChange(task);
            }
        }
    };

    const onDeleteSubTask = (subTasks, assigneId) => {
        const assigneIndex = task.assigness.findIndex(assigne => assigne.user._id === assigneId);

        if (assigneIndex !== -1) {
            task.assigness[assigneIndex].subTasks = subTasks;
            onTaskChange(task);
        }
    };

    const onDeleteAssignee = async (assigneId) => {
        await _removeMemberFromTask(task._id, assigneId);
        const assigneIndex = task.assigness.findIndex(assigne => assigne.user._id === assigneId);

        if (assigneIndex !== -1) {
            task.assigness.splice(assigneIndex, 1);
            onTaskChange(task);
        }
    };

    const onChangeImportance = (importance) => {
        const newTask = { ...task, isImportant: importance };
        _markIsImportant(task._id);
        onTaskChange(newTask);
    };

    const status = getStatusClass(task.status);
    const completionPercentage = calculateCompletionPercentage(task);

    return (
        <div className="flex flex-col bg-base p-3 space-y-3 ml-2 w-full xl:w-8/12 xxl:w-9/12">
            <div className="flex flex-row justify-between pr-3">
                <div className="flex items-center">
                    <span
                        className={`${status.color} opacity-70 mr-1 w-2 h-2 rounded-full`}
                    ></span>
                    <span className="label-text text-xs opacity-70">{status.label}</span>
                </div>
            </div>

            <div className="overflow-y-scroll h-full pr-3">
                <div className="flex flex-col space-y-3 bg-base-100 rounded-md">
                    <h1 className="font-black col-span-11 text-2xl xl:max-w-6xl break-words">{task.title}</h1>

                    <div className="flex justify-between ml-0">
                        <div className="flex items-start space-x-3">
                            <div className="avatar m-0">
                                <div className="w-8 rounded-full">
                                    <img alt="image-admin" className="bg-base-200 rounded-full" src={task.user.avatar} style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-bold">{task.user.name}</div>
                                <div
                                    className='flex flex-row mt-1 cursor-pointer'
                                    onClick={() => onChangeImportance(!task.isImportant)}
                                >
                                    {task.isImportant
                                        ?
                                        (<IoFlashSharp className="text-blue-400" />)
                                        :
                                        (<IoFlashOutline className="text-blue-400" />)
                                    }
                                    <p className="text-xs">Việc quan trọng</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs">{formatDate(task.createdAt)}</p>
                        </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-400 h-2.5 rounded-full progress-bar transition-all" style={{ width: `${completionPercentage}%` }}></div>
                    </div>

                    <div className="flex flex-col space-y-3 text-sm">
                        {'Mô tả: '}
                        {task.description}
                    </div>

                    <div className='flex flex-row justify-between items-center mt-5'>
                        <label className="text-xs font-bold">Checklist thực hiện</label>
                        <div
                            className='flex flex-row rounded-lg bg-blue-400 text-white p-2 items-center cursor-pointer mr-2'
                            onClick={() => onOpenAddMemberToTaskModal()}
                        >
                            <IoPersonAddOutline className='text-white text-lg ml-2 mr-2' />
                            <span className='text-xs'>Thêm người thực hiện</span>
                        </div>
                    </div>

                    {
                        task.assigness && task.assigness.length > 0 && task.assigness.map((assigne) => (
                            <Assigne
                                assigne={assigne}
                                taskId={task._id}
                                onSubTaskChange={(subTask) => onSubTaskChange(subTask, assigne.user._id)}
                                onDeleteSubTask={(subTasks) => onDeleteSubTask(subTasks, assigne.user._id)}
                                onDeleteAssignee={() => onDeleteAssignee(assigne.user._id)}
                            />
                        ))
                    }
                </div>
            </div>
        </div >
    );
};

export default TaskDetail;
